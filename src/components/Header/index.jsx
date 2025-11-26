// Module.css import
import styles from './Header.module.css';

// React import
import { useState, useEffect } from 'react';

// Link import
import { Link, useNavigate } from 'react-router-dom';

// Img import
import logoImg from '../../assets/header/logo.svg';
import logoDarkImg from '../../assets/header/logo-dark.svg';
import searchImg from '../../assets/header/search.svg';
import chattingImg from '../../assets/header/chatting.svg';
import bellImg from '../../assets/header/bell.svg';
import profileImg from '../../assets/header/profile.svg';
import menuImg from '../../assets/header/menu.svg';

// Theme Context
import { useTheme } from '../../context/ThemeContext';

// Sidebar Context
import { useSidebar } from '../../context/SidebarContext';

// Const
const Header = () => {
    const { isDarkMode } = useTheme();
    const { toggleSidebar } = useSidebar();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        
        setIsLoggedIn(loggedIn);
        if (storedUserName) setUserName(storedUserName);
        if (storedUserId) setUserId(Number(storedUserId));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserName('');
        setUserId(null);
        navigate('/auth/login');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleLogin = () => {
        navigate('/auth/login');
    };
    
    return (
        <header className={`${styles.mainHeader} ${isDarkMode ? styles.dark : ''}`}>
            <div className={styles.leftSection}>
                <button className={styles.menuButton} onClick={toggleSidebar} aria-label="Toggle menu">
                    <img src={menuImg} alt="메뉴 열기" />
                </button>
                <Link className={styles.logoButton} to={`/`}>
                    <img className={styles.logoImg} src={isDarkMode ? logoDarkImg : logoImg} alt="로고" />
                </Link>
            </div>
            
            <div className={styles.headerSearch}>
                <img className={styles.searchImg} src={searchImg} alt="검색 아이콘" />
                <input className={styles.headerSearchInput} type="search"/>
            </div>

            <ul className={styles.headerMenu}>
                {isLoggedIn ? (
                    <>
                        <li className={styles.chattingButton}>
                            <img className={styles.chattingImg} src={chattingImg} alt="채팅 열기" />
                        </li>

                        <li className={styles.bellButton} onClick={toggleNotifications}>
                            <img className={styles.bellImg} src={bellImg} alt="알림 확인" />
                        </li>

                        <li className={styles.userName}>
                            <span className={styles.textSetting}>{userName ? `${userName}님` : '사용자님'}</span>
                        </li>

                        <li className={styles.logoutButton} onClick={handleLogout}>
                            <span className={styles.textSetting}>로그아웃</span>
                        </li>

                        <li className={styles.profileButton}>
                            {userId ? (
                                <Link className={styles.profileImg} to={`/profile/${userId}`}>
                                    <img src={profileImg} alt="내 프로필" />
                                </Link>
                            ) : (
                                <span className={styles.profileImg} aria-disabled="true" title="프로필 정보를 불러올 수 없습니다.">
                                    <img src={profileImg} alt="내 프로필" style={{ opacity: 0.5, pointerEvents: 'none' }} />
                                </span>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li className={styles.chattingButton} onClick={toggleLogin}>
                            <img className={styles.chattingImg} src={chattingImg} alt="채팅 열기" />
                        </li>

                        <li className={styles.bellButton} onClick={toggleLogin}>
                            <img className={styles.bellImg} src={bellImg} alt="알림 확인" />
                        </li>
                        
                        <li className={styles.signupButton}>
                            <Link className={styles.textSetting} to={`/auth/signup`}>회원가입</Link>
                        </li>

                        <li className={styles.loginButton}>
                            <Link className={styles.textSetting} to={`/auth/login`}>로그인</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

// Export
export default Header;