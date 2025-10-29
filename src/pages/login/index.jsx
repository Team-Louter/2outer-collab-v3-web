// Link import
import styles from './login.module.css';
import Header from '../../components/Header';

// Const
const login = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.title}>로그인</div>
                <div className={styles.formContainer}>
                    <form className={styles.formMain}>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.usernameInput}`} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." required />
                        </div>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.passwordInput}`} type="password" id="password" name="password" placeholder="8자 이상 입력해주세요." required />
                        </div>
                        <div className={styles.options}>
                            <div className={styles.forgotPassword}><div className={styles.checkbox}></div>로그인 유지</div>
                            <a className={styles.forgotPasswordLink} href="/forgot-password">비밀번호를 잊어버리셨나요?</a>
                        </div>
                        <button className={styles.submit} type="submit">로그인</button>
                        <h5 className={styles.signUpPrompt}>계정이 없으신가요? <a className={styles.signUpLink} href="/signup">회원가입</a></h5>
                    </form>
                </div>
            </div>
        </>
    );
}


// Export
export default login;