// Import thư viện React;
import React, { useState } from 'react';
import './Login.css';

// Header;
<div className="login-header">
    <img
        src={`${process.env.PUBLIC_URL}/Logopage.png`}
        alt="Company Logo"
        className="logo"
    />
</div>

// Khai báo Login component;
const Login = ({ onLogin }) => {

    // Các state dùng cho username, password, error, loading, show/hide password;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    // Hàm xử lý submit;
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Giả lập gọi API call để kiểm tra thông tin đăng nhập;
            // Thay thế bằng API của nhóm, ví dụ như fetch('http://localhost:7151/auth/login');
            if(username === 'admin' && password === 'humpay@@33') {
                onLogin(); // Gọi hàm onLogin để cập nhật trạng thái đăng nhập;
                setIsLoading(false);
            } else {
                throw new Error('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } catch (loi) {
            setError(loi.message); // Cập nhật thông báo lỗi nếu có;
            setIsLoading(false);
        }
    }

    // Hàm xử lý toggle password;
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Hàm xử lý focus và blur của password;
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };

    // Giao diện form;
    return (
        // Video nền;
        <div className="login-overlay">
            <video autoPlay loop muted className="login-video">
                <source src="/images/BackgroundVideo.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            {/* Form login có username + password + nút login + hiện lỗi */}
            <div className="login-container">
                <h1 className="login-title">Login to HumPay</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    
                    {/*Username*/}
                    <div className="form-group">
                        <label htmlFor="username">
                            <img src="/icons/IconUsername.png" alt="Username icon" className="input-icon"/>
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>

                    {/*Password*/}
                    <div className="form-group">
                        <label htmlFor="password">
                            <img
                                src={!isPasswordFocused
                                        ? "/icons/IconPassword.png"
                                    : showPassword
                                        ? "/icons/OpenEye.png"
                                    : "/icons/CloseEye.png"
                                }
                                alt="Password Icon"
                                className="input-icon password-icon"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={togglePasswordVisibility}
                            />
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    )
};

// Export component;
export default Login;