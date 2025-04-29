// Import thư viện React;
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loaders/Loader';
import './Login.css';

// Khai báo Login component;
const Login = ({ onLogin }) => {

    // Các state dùng cho username, password, error, success, loading, show/hide password;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showLoader, setShowLoader] = useState(false);


    // Hàm xử lý submit;
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Giả lập gọi API call để kiểm tra thông tin đăng nhập;
            // Thay thế bằng API của nhóm, ví dụ như fetch('http://localhost:7151/auth/login');
            if(username === 'admin' && password === 'humpay@@33') {
                setSuccess('Đăng nhập thành công!');
                // onLogin(); // Gọi hàm onLogin để cập nhật trạng thái đăng nhập;
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }
                setIsLoading(false);
                setTimeout(() => {
                    setSuccess(null);
                    setShowLoader(true);
                    setTimeout(() => {
                        setShowLoader(false);
                        onLogin();
                    }, 2000);
                }, 5000); 
            } else {
                throw new Error('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        } catch (loi) {
            setError(loi.message); // Cập nhật thông báo lỗi nếu có;

            // Sau 5 giây thì xóa error để ẩn popup
            setTimeout(() => {
                setError(null);
                setIsLoading(false);
            }, 5000);
        } 
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true);
        }
    }, []);

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

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    // Giao diện form;
    return (
        <>
            {showLoader ? (
                <div>
                    <Loader />
                </div>
            ) : (
                // Video nền;
                <div className="login-overlay">
                    <video autoPlay loop muted className="login-video">
                        <source src="/images/BackVid.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>

                    {/* Thong bao Error */}
                    {error && (
                        <div className="error-popup">
                            {error}
                        </div>
                    )}

                    {/* Thong bao Error */}
                    {success && (
                        <div className="success-popup">
                            {success}
                        </div>
                    )}

                    {/* Header với link Contact */}
                    <header className="login-header">
                        <img
                            src={`${process.env.PUBLIC_URL}/Logopage.png`}
                            alt="Company Logo"
                            className="login-logo"
                        />
                        <a
                            href="https://github.com/DTU-DevTeam/HR-PRD-445?tab=readme-ov-file#contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-link"
                        >
                            CONTACT
                        </a>
                    </header>

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

                            {/* Remember Me switch */}
                            <div className="remember-me">
                            <label className="switch">
                                <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={toggleRememberMe}
                                />
                                <span className="slider"></span>
                            </label>
                            <span className="remember-text">Remember me.</span>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                className="login-button"
                                disabled={isLoading || error || success}
                            >
                                {isLoading ? (
                                    <div className="button-content">
                                        <div className="loader"></div>
                                        Logging in...
                                    </div>
                                ) : success ? (
                                    <div className="button-content">
                                        <div className="loader"></div>
                                        Checking information...
                                    </div>
                                ) : (
                                    'Access My Account'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

// Export component;
export default Login;