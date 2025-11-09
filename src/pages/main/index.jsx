// Link import
import styles from './main.module.css';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Const
export default function Main() {
    const location = useLocation();

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

    // 로그인 성공 시 토스트 메시지 표시
    useEffect(() => {
        if (location.state?.loginSuccess) {
            toast.success('로그인 성공!', { ...toastcode(3000) });
            toast.clearWaitingQueue();
            
            // state 초기화 (뒤로가기 후 다시 접속 시 메시지 재표시 방지)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.welcomeMessage}>환영합니다!</h1>
            </div>
            <ToastContainer limit={1} transition={Bounce} />
        </>
    );
}