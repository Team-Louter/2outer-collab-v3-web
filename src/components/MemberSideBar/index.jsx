// Module.css import
import styles from './MemberSideBar.module.css';

// React import
import { useState, useEffect } from 'react';

// Link import
import { useParams } from 'react-router-dom';

// Toast import
import { toast } from 'react-toastify';

// Img import
import profileImg from '../../assets/sideBar/profile.svg';

// Theme Context
import { useTheme } from '../../context/ThemeContext';

// Sidebar Context
import { useSidebar } from '../../context/SidebarContext';

// Axios Instance
import axiosInstance from '../../axiosInstance';

// Function
export default function ProjectSideBar() {
    const { teamId } = useParams();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { isOpen, toggleSidebar } = useSidebar();
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 팀 멤버 목록 가져오기
    const fetchMembers = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(`/teams/${teamId}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error('멤버 목록을 불러오는데 실패했습니다:', error);
            setMembers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (teamId) {
            fetchMembers();
        }
    }, [teamId]);
    
    return(
        <>
            {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
            <div className={`${styles.container} ${isOpen ? styles.open : ''} ${isDarkMode ? styles.dark : ''}`}>
                <div className={styles.membartext}>멤버</div>
                <div className={styles.line}></div>
                {isLoading ? (
                    <div className={styles.loadingText}>로딩 중...</div>
                ) : members.length === 0 ? (
                    <div className={styles.emptyText}>멤버가 없습니다</div>
                ) : (
                    members.map((member) => (
                        <div key={member.userId} className={styles.membarlist}>
                            <div className={styles.membarImgGradient}>
                                <div className={styles.membarImgBackground}>
                                    {member.profileImage ? (
                                        <img className={styles.avatarImg} src={member.profileImage} alt="멤버 프로필" />
                                    ) : (
                                        <img className={`${styles.avatarImg} ${styles.avatar2Img}`} src={profileImg} alt="멤버 프로필" />
                                    )}
                                </div>
                            </div>
                            <div className={styles.membarInfo}>
                                <div className={styles.membarNameText}>{member.userName}</div>
                                <div className={styles.membarRoleText}>{member.roleName}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};