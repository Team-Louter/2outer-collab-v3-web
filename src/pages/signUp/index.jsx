// Link import
import styles from './signUp.module.css';
import Header from '../../components/Header';

// Const
const signUp = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.title}>회원가입</div>
                <div className={styles.formContainer}>
                    <form>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>아이디</label>
                            <input className={styles.input} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호</label>
                            <input className={styles.input} type="password" id="password" name="password" placeholder="8자 이상 입력해주세요." required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호 확인</label>
                            <input className={styles.input} type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요." required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>이메일</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="email" id="email" name="email" placeholder="example@example.com" required />
                                <button className={`${styles.button} ${styles.emailButton}`} type="button">인증번호 발송</button>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>인증번호</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="text" id="auth" name="auth" placeholder="******" required />
                                <button className={`${styles.button} ${styles.authButton}`} type="button">인증번호 확인</button>
                            </div>
                        </div>
                        <button className={styles.submit} type="submit">회원 가입</button>
                        <h5 className={styles.signInPrompt}>이미 계정이 있으신가요? <a className={styles.signInLink} href="/signin">로그인</a></h5>
                    </form>
                </div>
            </div>
        </>
    );
}


// Export
export default signUp;