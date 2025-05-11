// Import thư viện React;
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loaders/Loader';
import '../components/Loaders/Loader.css'
import './Login.css';

// Khai báo tỷ giá;
const currencyChange = [
    { code: 'USD', name: 'US Dollar:', flag: '/icons/Currency/usa.svg', buy_cash: 25790.00, sell: 26180.00 },
    { code: 'EUR', name: 'Euro:', flag: '/icons/Currency/eur.svg', buy_cash: 28797.25, sell: 30445.31 },
    { code: 'GBP', name: 'UK Pound Sterling:', flag: '/icons/Currency/gbp.svg', buy_cash: 33891.18, sell: 35412.10 },
    { code: 'JPY', name: 'Japanese Yen:', flag: '/icons/Currency/jpy.svg', buy_cash: 175.59, sell: 187.18 },
    { code: 'AUD', name: 'Australian Dollar:', flag: '/icons/Currency/aud.svg', buy_cash: 16220.60, sell: 16948.52 },
    { code: 'SGD', name: 'Singapore Dollar:', flag: '/icons/Currency/sgd.svg', buy_cash: 19316.98, sell: 20224.28 },
    { code: 'THB', name: 'Thai Baht:', flag: '/icons/Currency/thb.svg', buy_cash: 685.34, sell: 795.62 },
    { code: 'CAD', name: 'Canadian Dollar:', flag: '/icons/Currency/cad.svg', buy_cash: 18280.25, sell: 19100.61 },
    { code: 'CHF', name: 'Swiss Franc:', flag: '/icons/Currency/chf.svg', buy_cash: 30657.51, sell: 32033.31 },
    { code: 'HKD', name: 'Hong Kong Dollar:', flag: '/icons/Currency/hkd.svg', buy_cash: 3252.93, sell: 3419.37 },
    { code: 'CNY', name: 'Chinese Yuan:', flag: '/icons/Currency/cny.svg', buy_cash: 3480.97, sell: 3637.19 },
    { code: 'DKK', name: 'Danish Krone:', flag: '/icons/Currency/dkk.svg', buy_cash: 'N/A', sell: 4044.81 },
    { code: 'INR', name: 'Indian Rupee:', flag: '/icons/Currency/inr.svg', buy_cash: 'N/A', sell: 316.61 },
    { code: 'KRW', name: 'Korean Won:', flag: '/icons/Currency/krw.svg', buy_cash: 15.65, sell: 18.91 },
    { code: 'KWD', name: 'Kuwaiti Dinar:', flag: '/icons/Currency/kwd.svg', buy_cash: 'N/A', sell: 88131.96 },
    { code: 'MYR', name: 'Malaysian Ringgit:', flag: '/icons/Currency/myr.svg', buy_cash: 'N/A', sell: 6083.96 },
    { code: 'NOK', name: 'Norwegian Krone:', flag: '/icons/Currency/nok.svg', buy_cash: 'N/A', sell: 2563.54 },
    { code: 'RUB', name: 'Russian Ruble:', flag: '/icons/Currency/rub.svg', buy_cash: 'N/A', sell: 335.63 },
    { code: 'SAR', name: 'Saudi Arabian Riyal:', flag: '/icons/Currency/sar.svg', buy_cash: 'N/A', sell: 7196.32 },
    { code: 'SEK', name: 'Swedish Krona:', flag: '/icons/Currency/sek.svg', buy_cash: 'N/A', sell: 2757.77 },
];

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
                    localStorage.setItem('rememberedPassword', password);
                } else {
                    localStorage.removeItem('rememberedUsername');
                    localStorage.removeItem('rememberedPassword');
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
        const savedPassword = localStorage.getItem('rememberedPassword');
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
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
                <div className="loader-main-overlay">
                    <div className="loader-main">
                        <Loader />
                    </div>
                </div>
            ) : (
                // Video nền;
                <div className="login-overlay">
                    <video autoPlay loop muted preload="auto" className="login-video">
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
                        <p className="support">
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/support.png`}
                                alt="Support Logo"
                                className="support-logo"
                            />
                            Support: +84 XXXX 285 09
                        </p>
                        {/* <p className="location">
                            <img
                                src={`${process.env.PUBLIC_URL}/icons/location.png`}
                                alt="Location Logo"
                                className="location-logo"
                            />
                            259 Tran Cao Van, Xuan Ha, Thanh Khe, Da Nang
                        </p> */}
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
                    {/* <div className="login-phone login-choice-container">Phone</div>
                    <div className="login-qr login-choice-container">QR Code</div> */}
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
                                        Checking information...
                                    </div>
                                ) : success ? (
                                    <div className="button-content">
                                        <div className="loader"></div>
                                        Logging in...
                                    </div>
                                ) : (
                                    'Access My Account'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <footer className="login-footer">
                        <div className="sliding-text">
                            {currencyChange.map((rate, index) => (
                                <span key={index} className="currency-item">
                                    <img
                                        src={rate.flag}
                                        alt={`${rate.code} icon`}
                                        className="currency-flag"
                                        onError={(e) => (e.target.src = '/icons/Currency/fallback.svg')}
                                    />
                                    <span className="currency-code">{rate.code}</span>
                                    <span className="currency-name">{rate.name}</span>
                                    <span className="currency-buy">
                                        Buy: {rate.buy_cash === 'N/A' ? 'N/A' : rate.buy_cash.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} VND
                                    </span>
                                    <span className="currency-separator"> - </span>
                                    <span className="currency-sell">
                                        Sell: {rate.sell.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} VND
                                    </span>
                                </span>
                            ))}
                            <span className="login-footer-text">
                                <img
                                src="/icons/Currency/vietnam.png"
                                alt="VietNam Icon"
                                className="login-footer-text"
                                />
                                Hoàng Sa, Trường Sa là của Việt Nam ! - Chủ tịch Hồ Chí Minh muôn năm ! - Đảng Cộng sản Việt Nam muôn năm !
                            </span>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

// Export component;
export default Login;