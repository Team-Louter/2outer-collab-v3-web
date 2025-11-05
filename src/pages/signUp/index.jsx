// Link import
import styles from './signUp.module.css';
import Header from '../../components/Header';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;

// Const
export default function SignUp() {
    const [sendData, setSendData] = useState({
        userName: "",
        userPassword: "",
        confirmPassword: "",
        userEmail: "",
    });

    const onChangeId = (e) => {
        setSendData({
            ...sendData,
            userName: e.target.value,
        });
    };

    const onChangePassword = (e) => {
        setSendData({
            ...sendData,
            userPassword: e.target.value,
        });
    }

    const onChangeConfirmPassword = (e) => {
        setSendData({
            ...sendData,
            confirmPassword: e.target.value,
        });
    };

    const onChangeEmail = (e) => {
        setSendData({
            ...sendData,
            userEmail: e.target.value,
        });
    }

    const clickSignUp = (e) => {
        e.preventDefault(); // 새로고침 방지

        axios.post(API_URL, sendData, {withCredentials: true})
            .then(response => {
                toast.success('회원가입 성공!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

            .catch(error => {
                console.error('API Error:', error);
                console.error('에러 응답:', error.response?.data);
                
                if (error.response?.data?.detail) {
                    toast.error(error.response.data.detail, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (error.response?.data) {
                    toast.error(JSON.stringify(error.response.data), {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.error('회원가입 실패: ' + error.message, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
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
                            <input className={styles.input} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." value={sendData.userName} onChange={onChangeId} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호</label>
                            <input className={styles.input} type="password" id="password" name="password" placeholder="8자 이상 입력해주세요." value={sendData.userPassword} onChange={onChangePassword} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호 확인</label>
                            <input className={styles.input} type="password" id="confirm-password" name="confirm-password" placeholder="비밀번호를 입력해주세요." value={sendData.confirmPassword} onChange={onChangeConfirmPassword} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>이메일</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="email" id="email" name="email" placeholder="example@example.com" value={sendData.userEmail} onChange={onChangeEmail} required />
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
            <ToastContainer />
        </>
    );
};
