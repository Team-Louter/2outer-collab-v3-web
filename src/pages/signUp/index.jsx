// Link import
import styles from './signUp.module.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import
import axiosInstance from '../../axiosInstance';

// Const
export default function SignUp() {
    const [sendData, setSendData] = useState({
        userName: "",
        userPassword: "",
        confirmPassword: "",
        userEmail: "",
    })

    // 이메일 인증 관련 상태
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

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
    };

    const onChangeVerificationCode = (e) => {
        setVerificationCode(e.target.value);
    };

    const toastcode = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
    };

    const clickSignUp = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 유효성 검사
        if (!sendData.userName) {
            toast.info('아이디를 입력해주세요', toastcode);
            return;
        } else if (!sendData.userPassword) {
            toast.info('비밀번호를 입력해주세요', toastcode);
            return;
        } else if (sendData.userPassword !== sendData.confirmPassword) {
            toast.info('비밀번호가 일치하지 않습니다', toastcode);
            return;
        } else if (!sendData.userEmail) {
            toast.info('이메일을 입력해주세요', toastcode);
            return;
        }

        // API 요청
        axiosInstance.post('/auth/signup', sendData)
            // 성공 시
            .then(response => {
                // 성공 토스트 메시지
                toast.success('회원가입 성공!', toastcode);
                
                // 회원가입 성공 후 로그인 페이지로 이동
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            })

            // 실패 시
            .catch(error => {
                console.error('API Error:', error);
                console.error('에러 응답:', error.response?.data);
                
                if (error.response?.data) {
                    toast.error(error.response.data, toastcode);
                } else {
                    toast.error('회원가입에 실패했습니다: ' + error.message, toastcode);
                }
            });
    }

    // 이메일 인증번호 발송
    const sendVerificationEmail = () => {
        if (!sendData.userEmail) {
            toast.info('이메일을 입력해주세요', toastcode);
            return;
        }
        
        axiosInstance.get('/auth/email', { params: { userEmail: sendData.userEmail } })
            .then(response => {
                setIsEmailSent(true);
                toast.info('인증번호가 전송되었습니다', toastcode);
            })
            .catch(error => {
                console.error('이메일 전송 실패:', error);
                toast.error('인증번호 전송에 실패했습니다', toastcode);
            });
    };

    // 인증번호 확인
    const verifyCode = () => {
        if (!verificationCode) {
            toast.info('인증번호를 입력해주세요', toastcode);
            return;
        }

        axiosInstance.get('/auth/verify', {
            params: {
                userEmail: sendData.userEmail,
                inputCode: verificationCode
            }
        })
            .then(response => {
                setIsEmailVerified(true);
                toast.success('이메일 인증 성공', toastcode);
            })
            .catch(error => {
                console.error('인증 실패:', error);
                toast.info('인증번호가 올바르지 않습니다', toastcode);
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
                                <input className={`${styles.input} ${styles.buttonInput}`} type="email" id="email" name="email" placeholder="example@example.com" value={sendData.userEmail} onChange={onChangeEmail} disabled={isEmailVerified} required />
                                <button className={`${styles.button} ${styles.emailButton}`} type="button" onClick={sendVerificationEmail} disabled={isEmailVerified}>
                                    {isEmailVerified ? '인증 완료' : isEmailSent ? '재전송' : '인증번호 전송'}
                                </button>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>인증번호</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="text" id="auth" name="auth" placeholder="******" value={verificationCode} onChange={onChangeVerificationCode} disabled={isEmailVerified || !isEmailSent} />
                                <button className={`${styles.button} ${styles.authButton}`} type="button" onClick={verifyCode} disabled={isEmailVerified || !isEmailSent}>
                                    {isEmailVerified ? '인증 완료' : '인증번호 확인'}
                                </button>
                            </div>
                        </div>
                        <button className={styles.submit} type="button" onClick={clickSignUp} >회원 가입</button>
                        <h5 className={styles.signInPrompt}>이미 계정이 있으신가요? <a className={styles.signInLink} href="/login">로그인</a></h5>
                    </form>
                </div>
            </div>
            <ToastContainer limit={9} />
        </>
    );
};