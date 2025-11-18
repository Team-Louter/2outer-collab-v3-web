// Link import
import styles from './main.module.css';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar';
import { useTheme } from '../../context/ThemeContext';

// Img import
import Testsponsor from '../../assets/mainpage/testsponsor.png';
import closeModalIcon from '../../assets/mainpage/closeModal.svg';
import testLouterLogo from '../../assets/mainpage/testLouterLogo.png';
import testLouterB from '../../assets/mainpage/testLouterB.png';
import verifiedImg from '../../assets/mainpage/verified.svg';

// Const
export default function Main() {
    const location = useLocation();
    const { isDarkMode } = useTheme();
    
    const bannerText = {
        tag : "[업데이트]",
        title : "새 프로젝트 만들기 기능 추가",
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

    const TestCode = () => {
        return (
            <div className={styles.projectCard}>
                <div className={styles.cardHeader}>
                    <img className={styles.projectBanner} src={testLouterB} alt="Louter 배너" />
                </div>
                <div className={styles.projectLogoHeader}>
                    <img className={styles.projectLogo} src={testLouterLogo} alt="Louter 로고" />
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.memberCountHeader}>
                        <div className={styles.memberCountCheck}></div>멤버 19명
                    </p>
                    <p className={styles.projectName}>
                        Louter
                        <img className={styles.verifiedBadge} src={verifiedImg} alt="인증 배지" />
                    </p>
                    <div className={styles.projectDescBox}>
                        <p className={styles.projectType}>팀 소개</p>
                        <p className={styles.projectDesc}>대구소프트웨어마이스터고 최우수 동아리 선정</p>
                    </div>
                </div>
                <button className={styles.joinButton}>프로젝트 참가 요청</button>
            </div>
        );
    };

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
            <Sidebar />
            <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
                {/* 배너 섹션 */}
                <div className={styles.bannerSection}>
                    {bannerText.tag}<div className={styles.bannerText}>{bannerText.title}</div>
                </div>

                <div className={styles.sponsorContent}>
                    <img className={styles.sponsorImg} src={Testsponsor} alt="광고" />
                    
                    <button className={styles.closeButton} aria-label="광고 닫기">
                        <img src={closeModalIcon} alt="닫기" />
                    </button>
                </div>

                <h1 className={styles.projectTitle}>Project</h1>

                {/* 프로젝트 섹션 */}
                <div className={styles.projectSection}>
                    {/* 프로젝트 카드 그리드 */}
                    <div className={styles.projectGrid}>
                        {/* 첫 번째 행 */}
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                        <TestCode />
                    </div>
                </div>
            </div>
            <ToastContainer limit={1} transition={Bounce} />
        </>
    );
}