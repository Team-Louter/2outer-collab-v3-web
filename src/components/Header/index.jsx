// Module.css import
import styles from './Header.module.css';

// Link import
import { Link } from 'react-router-dom';

// Img import
import logoImg from '../../assets/header/logo.svg';
import logoDarkImg from '../../assets/header/logo-dark.svg';
import searchImg from '../../assets/header/search.svg';
import chattingImg from '../../assets/header/chatting.svg';
import bellImg from '../../assets/header/bell.svg';
import profileImg from '../../assets/header/profile.svg';

// Theme Context
import { useTheme } from '../../context/ThemeContext';

// Sidebar Context
import { useSidebar } from '../../context/SidebarContext';

// Userid
const userid = 1;

// Const
const Header = () => {
    const { isDarkMode } = useTheme();
    const { toggleSidebar } = useSidebar();
    
    return (
        <header className={styles.mainHeader}>
            <div className={styles.leftSection}>
                <button className={styles.menuButton} onClick={toggleSidebar} aria-label="Toggle menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                <li className={styles.chattingButton}>
                    <img className={styles.chattingImg} src={chattingImg} alt="채팅 열기" />
                </li>

                <li className={styles.bellButton}>
                    <img className={styles.bellImg} src={bellImg} alt="알림 확인" />
                </li>

                <li className={styles.signupButton}>
                    <Link className={styles.textSetting} to={`/signup`}>회원가입</Link>
                </li>

                <li className={styles.loginButton}>
                    <Link className={styles.textSetting} to={`/login`}>로그인</Link>
                </li>

                <li className={styles.profileButton}>
                    <Link className={styles.profileImg} to={`/profile/${userid}`}>
                        <img src={profileImg} alt="내 프로필" />
                    </Link>
                </li>
            </ul>
        </header>
    );
};

// Export
export default Header;