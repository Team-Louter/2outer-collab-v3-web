// Link import
import styles from './login.module.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

// import
import axiosInstance from '../../axiosInstance';

// Const
export default function login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDarkMode } = useTheme();
    
    const [sendData, setSendData] = useState({
        userEmail: "",
        userPassword: "",
    });
    
    // 로그인 유지 여부
    const [rememberMe, setRememberMe] = useState(false);

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

    // 회원가입 성공 시 토스트 메시지 표시
    useEffect(() => {
        if (location.state?.signUpSuccess) {
            toast.success('회원가입 성공!', {...toastcode(2000)});
            toast.clearWaitingQueue();
            
            // state 초기화 (뒤로가기 후 다시 접속 시 메시지 재표시 방지)
            window.history.replaceState({}, document.title);
        }

        // 세션 만료 체크
        const sessionExpired = localStorage.getItem('sessionExpired');
        if (sessionExpired) {
            toast.info('세션이 만료되었습니다', toastcode(3000));
            toast.clearWaitingQueue();
            localStorage.removeItem('sessionExpired');
        }
    }, [location]);
    
    const onChangeId = (e) => {
        setSendData({
            ...sendData,
            userEmail: e.target.value,
        });
    };
    
    const onChangePassword = (e) => {
        setSendData({
            ...sendData,
            userPassword: e.target.value,
        });
    };

    const onToggleRemember = (e) => {
        setRememberMe(e.target.checked);
    };

    const clickLogin = (e) => {
        e.preventDefault(); // 새로고침 방지

        // 유효성 검사
        if (!sendData.userEmail) {
            toast.info('이메일을 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }
        if (!sendData.userPassword) {
            toast.info('비밀번호를 입력해주세요', toastcode(1000));
            toast.clearWaitingQueue();
            return;
        }
        
        // API 요청
        axiosInstance.post('/auth/login', sendData)
            .then(response => {
                // 로그인 상태 저장
                localStorage.setItem('isLoggedIn', 'true');
                
                // 사용자 정보 저장
                if (response.data.userName) {
                    localStorage.setItem('userName', response.data.userName);
                }
                if (response.data.userId) {
                    localStorage.setItem('userId', String(response.data.userId));
                }

                // 메인 페이지로 이동하면서 state 전달
                navigate('/', { state: { loginSuccess: true } });
            })

            .catch(error => {
                if (error.response?.status === 401) {
                    // 401 에러: 이메일 또는 비밀번호가 틀림
                    toast.info('잘못된 이메일 또는 비밀번호입니다', toastcode(1000));
                    toast.clearWaitingQueue();
                } else if (error.response?.data?.message) {
                    // 서버에서 전달한 에러 메시지
                    toast.error(error.response.data.message, toastcode(1000));
                    toast.clearWaitingQueue();
                } else if (error.request) {
                    // 요청은 전송되었지만 응답을 받지 못함
                    toast.error('서버와 통신할 수 없습니다', toastcode(3000));
                    toast.clearWaitingQueue();
                } else {
                    // 요청 설정 중 문제 발생
                    toast.error('로그인 요청 중 오류가 발생했습니다', toastcode(3000));
                    toast.clearWaitingQueue();
                }
            });
    };

    return (
        <>
            <Header />
            <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
                <div className={styles.title}>로그인</div>
                <div className={styles.formContainer}>
                    <form className={styles.formMain}>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.usernameInput}`} type="email" id="email" name="email" placeholder="이메일을 입력해주세요" value={sendData.userEmail} onChange={onChangeId} required autoComplete="username" />
                        </div>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.passwordInput}`} type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" value={sendData.userPassword} onChange={onChangePassword} required autoComplete="current-password" />
                        </div>
                        <div className={styles.options}>
                            <div className={styles.rememberMe}>
                                <label className={styles.rememberMeLink}>
                                    <input type="checkbox" className={styles.checkbox} checked={rememberMe} onChange={onToggleRemember} />
                                    <span className={styles.rememberLabel}>로그인 유지</span>
                                </label>
                            </div>
                            <a className={styles.forgotPasswordLink} href="/forgot-password">비밀번호를 잊어버리셨나요?</a>
                        </div>
                        <button className={styles.submit} type="submit" onClick={clickLogin}>로그인</button>
                        <h5 className={styles.signUpPrompt}>계정이 없으신가요? <a className={styles.signUpLink} href="/auth/signup">회원가입</a></h5>
                    </form>
                </div>
            </div>
        </>
    );
}