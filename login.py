from flask import Flask, request, jsonify
import mysql.connector
import bcrypt
import jwt
import random
import string
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from functools import wraps
from flask import send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Cấu hình
SECRET_KEY = "e7f29f4a62a3b3b09b4d7dcf3f814f5b98d34e5a17d7fc4e4fbd9bdfcb12e8b1"  # Thay bằng khóa bí mật mạnh
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456123456',
    'database': 'user_accounts'
}

# Kết nối MySQL
def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

# Gửi mã 2FA qua email
def send_2fa_code(email, user_id, code):
    expires_at = datetime.now() + timedelta(minutes=10)
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO two_factor_codes (user_id, code, expires_at) VALUES (%s, %s, %s)",
        (user_id, code, expires_at)
    )
    db.commit()
    cursor.close()
    db.close()
    
    msg = MIMEText(f"Your 2FA code is: {code}\nThis code expires in 10 minutes.")
    msg['Subject'] = 'Your Two-Factor Authentication Code'
    msg['From'] = 'anh.ty.dn111@gmail.com'
    msg['To'] = email
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login('anh.ty.dn111@gmail.com', '0707155003A')  # Sử dụng App Password của Gmail
        server.send_message(msg)

# API đăng nhập
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    
    # Kết nối database
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    # Tìm người dùng
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    
    if not user:
        cursor.close()
        db.close()
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Kiểm tra mật khẩu
    if not bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        cursor.close()
        db.close()
        return jsonify({'error': 'Invalid username or password'}), 401
    
    # Cập nhật thời gian đăng nhập
    cursor.execute(
        "UPDATE users SET last_login = %s WHERE user_id = %s",
        (datetime.now(), user['user_id'])
    )
    
    # Ghi lịch sử đăng nhập
    ip_address = request.remote_addr
    device_info = request.headers.get('User-Agent')
    cursor.execute(
        "INSERT INTO login_history (user_id, ip_address, device_info) VALUES (%s, %s, %s)",
        (user['user_id'], ip_address, device_info)
    )
    db.commit()
    
    # Kiểm tra 2FA
    if user['two_factor_enabled']:
        # Tạo mã 2FA 6 chữ số
        code = ''.join(random.choices(string.digits, k=6))
        send_2fa_code(user['email'], user['user_id'], code)
        cursor.close()
        db.close()
        return jsonify({
            'message': '2FA code sent to email',
            'user_id': user['user_id'],
            'requires_2fa': True
        }), 200
    
    # Tạo JWT token
    token = jwt.encode({
        'user_id': user['user_id'],
        'username': user['username'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, SECRET_KEY, algorithm='HS256')
    
    cursor.close()
    db.close()
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'requires_2fa': False
    }), 200

# API xác minh mã 2FA
@app.route('/api/verify-2fa', methods=['POST'])
def verify_2fa():
    data = request.get_json()
    user_id = data.get('user_id')
    code = data.get('code')
    
    if not user_id or not code:
        return jsonify({'error': 'Missing user_id or code'}), 400
    
    # Kết nối database
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    # Kiểm tra mã 2FA
    cursor.execute(
        """SELECT * FROM two_factor_codes 
           WHERE user_id = %s AND code = %s AND expires_at > %s AND used = FALSE""",
        (user_id, code, datetime.now())
    )
    valid_code = cursor.fetchone()
    
    if not valid_code:
        cursor.close()
        db.close()
        return jsonify({'error': 'Invalid or expired 2FA code'}), 401
    
    # Đánh dấu mã đã sử dụng
    cursor.execute(
        "UPDATE two_factor_codes SET used = TRUE WHERE code_id = %s",
        (valid_code['code_id'],)
    )
    
    # Tạo JWT token
    cursor.execute("SELECT * FROM users WHERE user_id = %s", (user_id,))
    user = cursor.fetchone()
    token = jwt.encode({
        'user_id': user['user_id'],
        'username': user['username'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, SECRET_KEY, algorithm='HS256')
    
    db.commit()
    cursor.close()
    db.close()
    return jsonify({
        'message': '2FA verification successful',
        'token': token
    }), 200

@app.route('/')
def serve_html():
    return send_from_directory('.', 'index.html')
if __name__ == '__main__':
    app.run(debug=True)