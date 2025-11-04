// Link import
import styles from './login.module.css';
import Header from '../../components/Header';
import { useState } from 'react';

// import
import axios from 'axios';

const API_URL = '서버주소/users/login';

// Const
export default function login() {
    const [sendData, setSendData] = useState({
        username: "",
        password: "",
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
    };

    const clickLogin = (e) => {
        e.preventDefault(); // 새로고침 방지
        
        axios.post(API_URL, sendData, {
            withCredentials: true
        })

        .then(response => {
            console.log('API Response:', response.data);
            alert('로그인 성공!');
        })

        .catch(error => {
            // console.error('API Error:', error);
            alert(error.response.data.detail);
        });

    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.title}>로그인</div>
                <div className={styles.formContainer}>
                    <form className={styles.formMain}>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.usernameInput}`} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." value={sendData.username} onChange={onChangeId} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.passwordInput}`} type="password" id="password" name="password" placeholder="8자 이상 입력해주세요." value={sendData.password} onChange={onChangePassword} required />
                        </div>
                        <div className={styles.options}>
                            <div className={styles.rememberMe}><a className={styles.rememberMeLink}><div className={styles.checkbox}></div>로그인 유지</a></div>
                            <a className={styles.forgotPasswordLink} href="/forgot-password">비밀번호를 잊어버리셨나요?</a>
                        </div>
                        <button className={styles.submit} type="submit" onClick={clickLogin}>로그인</button>
                        <h5 className={styles.signUpPrompt}>계정이 없으신가요? <a className={styles.signUpLink} href="/signup">회원가입</a></h5>
                    </form>
                </div>
            </div>
        </>
    );
}