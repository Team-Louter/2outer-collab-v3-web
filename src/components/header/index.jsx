// Module.css import
import styles from './header.module.css'

// Img import
import logo_img from '../../assets/header/Collab_Logo.svg'
import search_img from '../../assets/header/search.svg'
import chatting_img from '../../assets/header/chatting.svg'
import bell_img from '../../assets/header/bell.svg'
import profile_img from '../../assets/header/profile.svg'

const Header = () => {
    return (
        <>
            <header className={styles.main_header}>
                <a className={styles.logo_button} href="../main">
                    <img className={styles.logo_img} src={logo_img} alt="logo" />
                </a>
                
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

                    <li className={styles.signup_button}>회원가입</li>

                    <li className={styles.login_button}>로그인</li>

                    <li className={styles.profile_button}>
                        <img className={styles.profile_img} src={profile_img} alt="profile" />
                    </li>
                </ul>
            </header>
        </>
    )
}

export default Header;