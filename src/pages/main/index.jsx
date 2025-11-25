// Link import
import styles from './main.module.css';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/ProjectSideBar';
import { useTheme } from '../../context/ThemeContext';

// import
import ProjectCard from '../../components/ProjectCard';

// Img import
import Testsponsor from '../../assets/mainpage/testsponsor.png';
import closeModalIcon from '../../assets/mainpage/closeModal.svg';

// Const
export default function Main() {
    const location = useLocation();
    const { isDarkMode } = useTheme();
    
    const bannerText = {
        tag: "[업데이트]",
        title: "새 프로젝트 만들기 기능 추가",
    };

    const sponsorText = {
        href: "https://dodam.b1nd.com/",
        Img: Testsponsor,
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
                    <a href={sponsorText.href}><img className={styles.sponsorImg} src={sponsorText.Img} alt="광고" /></a>
                    
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
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                        <ProjectCard />
                    </div>
                </div>
            </div>
        </>
    );
}