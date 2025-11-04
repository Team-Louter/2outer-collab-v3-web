// Link import
import styles from './signUp.module.css';
import Header from '../../components/Header';
import { useState } from 'react';

// import
import axios from 'axios';

const API_URL = '서버주소/users/signup';

// Const
export default function SignUp() {
    const [sendData, setSendData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const onChangeId = (e) => {
        setSendData({
            ...sendData,
            username: e.target.value,
        });
    };

    const onChangePassword = (e) => {
        setSendData({
            ...sendData,
            password: e.target.value,
        });
    }

    const onChangeEmail = (e) => {
        setSendData({
            ...sendData,
            email: e.target.value,
        });
    }

    const clickSignUp = (e) => {
        e.preventDefault(); // 새로고침 방지
        
        axios.post(API_URL, sendData, {
            withCredentials: true
        })

        .then(response => {
            console.log('API Response:', response.data);
            alert('회원가입 성공!');
        })

        .catch(error => {
            // console.error('API Error:', error);
            alert(error.response.data.detail);
        });

    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.title}>회원 가입</div>
                <div className={styles.formContainer}>
                    <form className={styles.formMain}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>아이디</label>
                            <input className={styles.input} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." value={sendData.username} onChange={onChangeId} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호</label>
                            <input className={styles.input} type="password" id="password" name="password" placeholder="8자 이상 입력해주세요." value={sendData.password} onChange={onChangePassword} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호 확인</label>
                            <input className={styles.input} type="password" id="confirm-password" name="confirm-password" placeholder="비밀번호를 입력해주세요." required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>이메일</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="email" id="email" name="email" placeholder="example@example.com" value={sendData.email} onChange={onChangeEmail} required />
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
                        <button className={styles.submit} type="button" onClick={clickSignUp} >회원 가입</button>
                        <h5 className={styles.signInPrompt}>이미 계정이 있으신가요? <a className={styles.signInLink} href="/login">로그인</a></h5>
                    </form>
                </div>
            </div>
        </>
    );
};
