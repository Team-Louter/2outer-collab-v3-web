// Module.css import
import styles from './Header.module.css';

// Link import
import { Link } from 'react-router-dom';

// Img import
import logoImg from '../../assets/header/logo.svg';
import searchImg from '../../assets/header/search.svg';
import chattingImg from '../../assets/header/chatting.svg';
import bellImg from '../../assets/header/bell.svg';
import profileImg from '../../assets/header/profile.svg';

// Userid
const userid = 1;

// Const
const Header = () => {
    return (
        <>
            <header className={styles.mainHeader}>
                <Link className={styles.logoButton} to={`/`}>
                    <img className={styles.logoImg} src={logoImg} alt="logo" />
                </Link>
                
                <div className={styles.headerSearch}>
                    <img className={styles.searchImg} src={searchImg} alt="search" />
                    <input className={styles.headerSearchInput} type="search"/>
                </div>

                <ul className={styles.headerMenu}>
                    <li className={styles.chattingButton}>
                        <img className={styles.chattingImg} src={chattingImg} alt="chatting" />
                    </li>

                    <li className={styles.bellButton}>
                        <img className={styles.bellImg} src={bellImg} alt="bell" />
                    </li>

                    <li className={styles.signupButton}>
                        <Link className={styles.textSetting} to={`/signup`}>회원가입</Link>
                    </li>

                    <li className={styles.loginButton}>
                        <Link className={styles.textSetting} to={`/login`}>로그인</Link>
                    </li>

                    <li className={styles.profileButton}>
                        <Link className={styles.profileImg} to={`/profile/${userid}`}>
                            <img src={profileImg} alt="profile" />
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    );
};

// Export
export default Header;