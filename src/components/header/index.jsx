// Module.css import
import styles from './header.module.css';

// Link import
import { Link } from 'react-router-dom';

// Img import
import logo_img from '../../assets/header/Collab_Logo.svg';
import search_img from '../../assets/header/search.svg';
import chatting_img from '../../assets/header/chatting.svg';
import bell_img from '../../assets/header/bell.svg';
import profile_img from '../../assets/header/profile.svg';

// Userid
const userid = 1;

// Const
const Header = () => {
    return (
        <>
            <header className={styles.main_header}>
                <Link className={styles.logo_button} to={`/`}>
                    <img className={styles.logo_img} src={logo_img} alt="logo" />
                </Link>
                
                <div className={styles.header_search}>
                    <img className={styles.search_img} src={search_img} alt="search" />
                    <input className={styles.header_search_input} type="search"/>
                </div>

                <ul className={styles.header_menu}>
                    <li className={styles.chatting_button}>
                        <img className={styles.chatting_img} src={chatting_img} alt="chatting" />
                    </li>

                    <li className={styles.bell_button}>
                        <img className={styles.bell_img} src={bell_img} alt="bell" />
                    </li>

                    <li className={styles.signup_button}>
                        <Link className={styles.text_setting} to={`/signup`}>회원가입</Link>
                    </li>

                    <li className={styles.login_button}>
                        <Link className={styles.text_setting} to={`/login`}>로그인</Link>
                    </li>

                    <li className={styles.profile_button}>
                        <Link className={styles.profile_img} to={`/profile/${userid}`}>
                            <img src={profile_img} alt="profile" />
                        </Link>
                    </li>
                </ul>
            </header>
        </>
    );
};

// Export
export default Header;