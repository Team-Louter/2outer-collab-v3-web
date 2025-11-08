// Link import
import styles from './login.module.css';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import
import axiosInstance from '../../axiosInstance';

// Const
export default function login() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [sendData, setSendData] = useState({
        userEmail: "",
        userPassword: "",
    });

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
        
        console.log('전송 데이터:', sendData); // 디버깅용
        
        // API 요청
        axiosInstance.post('/auth/login', sendData)
            .then(response => {
                console.log('로그인 성공:', response.data);
                
                // 토큰 저장
                if (response.data?.token) {
                    localStorage.setItem('token', response.data.token);
                    console.log('토큰 저장 완료:', response.data.token);
                }
                
                // 메인 페이지로 이동하면서 state 전달
                navigate('/', { state: { loginSuccess: true } });
            })
            .catch(error => {
                console.error('로그인 실패:', error);
                console.error('에러 응답 전체:', error.response);
                console.error('에러 데이터:', error.response?.data);
                console.error('에러 상태:', error.response?.status);
                
                if (error.response?.data) {
                    // 서버에서 보낸 에러 메시지 표시
                    const errorData = error.response.data;
                    const errorMessage = typeof errorData === 'string' 
                        ? errorData 
                        : errorData.message || errorData.detail || errorData.error || JSON.stringify(errorData);
                    
                    console.log('표시할 에러 메시지:', errorMessage);
                    toast.error(errorMessage, toastcode(3000));
                    toast.clearWaitingQueue();
                } else {
                    toast.error('서버와 통신할 수 없습니다: ' + error.message, toastcode(3000));
                    toast.clearWaitingQueue();
                }
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
                            <input className={`${styles.input} ${styles.usernameInput}`} type="email" id="email" name="email" placeholder="이메일을 입력해주세요" value={sendData.userEmail} onChange={onChangeId} required />
                        </div>
                        <div className={styles.inputContainer}>
                            <input className={`${styles.input} ${styles.passwordInput}`} type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요" value={sendData.userPassword} onChange={onChangePassword} required />
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
            <ToastContainer limit={1} transition={Bounce} />
        </>
    );
}