// Module.css import
import styles from './SideBar.module.css';

// React import
import { useState, useEffect } from 'react';

// Link import
import { Link } from 'react-router-dom';

// Img import
import minus from '../../assets/sideBar/minus.svg';
import logout from '../../assets/sideBar/logout.svg';
import night from '../../assets/sideBar/night.svg';
import plus from '../../assets/sideBar/plus.svg';
import setting from '../../assets/sideBar/setting.svg';

// Test Import
import projectImg from '../../assets/sideBar/Louter.svg';

// Theme Context
import { useTheme } from '../../context/ThemeContext';

// Sidebar Context
import { useSidebar } from '../../context/SidebarContext';

// Axios Instance
import axiosInstance from '../../axiosInstance';

// Function
export default function Sidebar() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { isOpen, toggleSidebar } = useSidebar();
    const [projectItems, setProjectItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 팀 목록 가져오기
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get('/teams/my-teams');
                
                // API 응답 데이터를 projectItems 형식으로 변환
                const teams = response.data.map(team => ({
                    id: team.teamId,
                    name: team.teamName,
                    owner: team.creatorName,
                    img: team.profilePicture,
                }));
                
                setProjectItems(teams);
            } catch (error) {
                console.error('팀 목록을 불러오는데 실패했습니다:', error);
                // 에러 발생 시 빈 배열로 설정
                setProjectItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeams();
    }, []);
    
    return(
        <>
            {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
            <div className={`${styles.container} ${isOpen ? styles.open : ''} ${isDarkMode ? styles.dark : ''}`}>
                <div className={styles.minusButton}>
                    <img className={styles.minusIcon} src={minus} alt="Minus" onClick={toggleSidebar} />
                </div>
                <div className={styles.projectCreate}>
                    <img className={styles.plusIcon} src={plus} alt="Plus" /><div className={styles.projectCreateText}>새 프로젝트 만들기</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.myProjectsTitle}>내 프로젝트</div>
                <div className={styles.projectList}>
                    {isLoading ? (
                        <div className={styles.loadingText}>로딩 중...</div>
                    ) : projectItems.length === 0 ? (
                        <div className={styles.emptyText}>참여 중인 프로젝트가 없습니다</div>
                    ) : (
                        projectItems.map((item) => (
                            <Link key={item.id} className={styles.projectItem} to={`/${item.id}`}>
                                <div className={styles.projectImgGradient}>
                                    <div className={styles.projectImgBackground}>
                                        <img className={styles.projectImg} src={item.img} alt="프로젝트 이미지" />
                                    </div>
                                </div>
                                <div className={styles.projectInfo}>
                                    <div className={styles.projectNameText}>{item.name}</div>
                                    <div className={styles.projectOwnerText}>{item.owner}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <div className={styles.line}></div>
                <div className={styles.sidebarBottom}>
                    <div className={styles.settingToggle}>
                        <img src={setting} alt="설정 아이콘" /><div className={styles.settingText}>설정</div>
                    </div>
                    <div className={styles.darkModeToggle} onClick={toggleDarkMode}>
                        <img src={night} alt="다크 모드 아이콘" /><div className={styles.darkModeText}>다크 모드</div>
                        <div className={`${styles.darkModeSwitch} ${isDarkMode ? styles.active : ''}`}>
                            <div className={styles.darkModeCircle}></div>
                        </div>
                    </div>
                    <div className={styles.toggleText1}>서비스 운영 정책</div>
                    <div className={styles.toggleText2}>개인정보 처리 방침</div>
                    <div className={styles.logoutToggle}>
                        <img src={logout} alt="로그아웃 아이콘" /><div className={styles.logoutText}>로그아웃</div>
                    </div>
                </div>
            </div>
        </>
    );
};