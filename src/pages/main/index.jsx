// Link import
import styles from './main.module.css';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/SideBar';
import { useTheme } from '../../context/ThemeContext';
import axiosInstance from '../../axiosInstance';

// import
import ProjectCard from '../../components/ProjectCard';

// Img import
import Testsponsor from '../../assets/mainpage/testsponsor.png';
import closeModalIcon from '../../assets/mainpage/closeModal.svg';

// Const
export default function Main() {
    const location = useLocation();
    const { isDarkMode } = useTheme();
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSponsor, setShowSponsor] = useState(true);
    
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

    // 팀 없음 토스트 표시
    useEffect(() => {
        if (location.state?.teamExists === 'false') {
            toast.info('참여 중인 프로젝트가 존재하지 않습니다', { ...toastcode(3000)});
            toast.clearWaitingQueue();

            // state 초기화 (뒤로가기 후 다시 접속 시 메시지 재표시 방지)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // 팀 데이터 가져오기
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/teams/random');
                const teamsData = response.data;
                
                // 각 팀의 멤버 수 가져오기
                const teamsWithMemberCount = await Promise.all(
                    teamsData
                        .filter(team => team && team.teamId)
                        .map(async (team) => {
                            try {
                                const countResponse = await axiosInstance.get(`/teams/${team.teamId}/members/count`);
                                return { ...team, memberCount: countResponse.data.count };
                            } catch (error) {
                                console.error(`팀 ${team.teamId}의 멤버 수를 가져오는데 실패:`, error);
                                return { ...team, memberCount: 0 };
                            }
                        })
                );
                
                setTeams(teamsWithMemberCount);
            } catch (error) {
                console.error('팀 데이터를 가져오는데 실패했습니다:', error);
                toast.error('팀 데이터를 불러오지 못했습니다.', { ...toastcode(3000) });
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
                {/* 배너 섹션 */}
                <div className={styles.bannerSection}>
                    {bannerText.tag}<div className={styles.bannerText}>{bannerText.title}</div>
                </div>

                {showSponsor && (
                  <div className={styles.sponsorContent}>
                      <a href={sponsorText.href}><img className={styles.sponsorImg} src={sponsorText.Img} alt="광고" /></a>
                      <button className={styles.closeButton} aria-label="광고 닫기" onClick={() => setShowSponsor(false)}>
                          <img src={closeModalIcon} alt="닫기" />
                      </button>
                  </div>
                )}

                <h1 className={styles.projectTitle}>Project</h1>

                {/* 프로젝트 섹션 */}
                <div className={styles.projectSection}>
                    {/* 프로젝트 카드 그리드 */}
                    <div className={styles.projectGrid}>
                        {loading ? (
                            <p>로딩 중...</p>
                        ) : teams.length > 0 ? (
                            teams.map((team) => (
                                <ProjectCard key={team.teamId} team={team} />
                            ))
                        ) : (
                            <p>표시할 팀이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}