// Link import
import styles from './signUp.module.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../context/ThemeContext';

// import
import axiosInstance from '../../axiosInstance';

// Img import
import passwordToggleIcon from '../../assets/signUp/passwordToggleIcon.svg';
import textToggleIcon from '../../assets/signUp/textToggleIcon.svg';

// Const
export default function SignUp() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    
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
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // 비밀번호 보기/숨기기 상태
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // 타이머 useEffect
    useEffect(() => {
        let interval;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0 && isTimerActive) {
            setIsTimerActive(false);
            toast.info('인증 시간이 만료되었습니다', toastcode(1000));
            toast.clearWaitingQueue();
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    // 타이머 포맷팅 함수 (mm:ss)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const toastcode = (time) => ({
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
    });

    const clickSignUp = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 유효성 검사
        if (!sendData.userName) {
            toast.info('닉네임을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!sendData.userPassword) {
            toast.info('비밀번호를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (sendData.userPassword.length < 8) {
            toast.info('비밀번호는 8자 이상이어야 합니다', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (sendData.userPassword !== sendData.confirmPassword) {
            toast.info('비밀번호가 일치하지 않습니다', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!sendData.userEmail) {
            toast.info('이메일을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        } else if (!isEmailVerified) {
            toast.info('이메일 인증을 완료해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }

        // API 요청
        axiosInstance.post('/auth/signup', sendData)
            // 성공 시
            .then(response => {
                // 로그인 페이지로 이동하면서 state 전달
                navigate('/login', { state: { signUpSuccess: true } });
            })

            // 실패 시
            .catch(error => {
                console.error('API Error:', error);
                console.error('에러 응답:', error.response?.data);
                
                if (error.response?.data) {
                    toast.error(error.response.data, toastcode(3000));
                    toast.clearWaitingQueue();
                } else {
                    toast.error('TeamCollab에 문의해주세요 : ' + error.message, toastcode(3000));
                    toast.clearWaitingQueue();
                }
            });
    }

    // 이메일 인증번호 발송
    const sendVerificationEmail = () => {
        if (!sendData.userEmail) {
            toast.info('이메일을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }
        
        axiosInstance.get('/auth/email', { params: { userEmail: sendData.userEmail } })
            .then(response => {
                setIsEmailSent(true);
                setTimer(600); // 10분 = 600초
                setIsTimerActive(true);
                toast.success('인증번호가 전송되었습니다', toastcode(5000));
                toast.clearWaitingQueue();
            })
            .catch(error => {
                console.error('이메일 전송 실패:', error);
                toast.error('인증번호 전송에 실패했습니다', toastcode(3000));
                toast.clearWaitingQueue();
            });
    };

    // 인증번호 확인
    const verifyCode = () => {
        if (!verificationCode) {
            toast.info('인증번호를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
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
                setIsTimerActive(false); // 인증 성공 시 타이머 중지
                toast.success('이메일 인증 성공', toastcode(1000));
                toast.clearWaitingQueue();
            })
            .catch(error => {
                console.error('인증 실패:', error);
                toast.info('인증번호가 올바르지 않습니다', toastcode(1000));
                toast.clearWaitingQueue();
            });
    }

    return (
        <>
            <Header />
            <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
                <div className={styles.title}>회원 가입</div>
                <div className={styles.formContainer}>
                    <form className={styles.formMain}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>닉네임</label>
                            <input className={styles.input} type="text" id="username" name="username" placeholder="영문/숫자로 입력해주세요." value={sendData.userName} onChange={onChangeId} title="" required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input className={styles.input} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="8자 이상 입력해주세요." value={sendData.userPassword} onChange={onChangePassword} />
                                <img className={styles.passwordToggleIcon} src={showPassword ? textToggleIcon : passwordToggleIcon} onClick={() => setShowPassword(!showPassword)} alt="비밀번호 보기/숨기기" />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>비밀번호 확인</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input className={styles.input} type={showConfirmPassword ? "text" : "password"} id="confirm-password" name="confirm-password" placeholder="비밀번호를 입력해주세요." value={sendData.confirmPassword} onChange={onChangeConfirmPassword} title="" required />
                                <img className={styles.passwordToggleIcon} src={showConfirmPassword ? textToggleIcon : passwordToggleIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)} alt="비밀번호 보기/숨기기" />
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>이메일</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="email" id="email" name="email" placeholder="example@example.com" value={sendData.userEmail} onChange={onChangeEmail} title="" disabled={isEmailVerified} required />
                                <button className={`${styles.button} ${styles.emailButton}`} type="button" onClick={sendVerificationEmail} disabled={isEmailVerified}>
                                    {isEmailVerified ? '인증 완료' : isEmailSent ? '재전송' : '인증번호 전송'}
                                </button>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>인증번호</label>
                            <div>
                                <input className={`${styles.input} ${styles.buttonInput}`} type="text" id="auth" name="auth" placeholder="******" value={verificationCode} onChange={onChangeVerificationCode} title="" disabled={isEmailVerified || !isEmailSent} />
                                <button className={`${styles.button} ${styles.authButton}`} type="button" onClick={verifyCode} disabled={isEmailVerified || !isEmailSent}>
                                    {isEmailVerified ? '인증 완료' : '인증번호 확인'}
                                </button>
                            </div>
                            {isTimerActive && timer > 0 && (
                                <div className={styles.timerText}>
                                    남은 시간: {formatTime(timer)}
                                </div>
                            )}
                        </div>
                        <button className={styles.submit} type="button" onClick={clickSignUp} >회원 가입</button>
                        <h5 className={styles.signInPrompt}>이미 계정이 있으신가요? <a className={styles.signInLink} href="/login">로그인</a></h5>
                    </form>
                </div>
            </div>
            <ToastContainer limit={1} transition={Bounce} />
        </>
    );
};