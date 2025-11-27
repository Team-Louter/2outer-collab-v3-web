// Module.css import
import styles from "./ProjectSideBar.module.css";

// React import
import { useState, useEffect } from "react";

// Link import
import { Link, useNavigate, useParams } from "react-router-dom";

// Toast import
import { toast } from "react-toastify";

// Img import
import minus from "../../assets/sideBar/minus.svg";
import logout from "../../assets/sideBar/logout.svg";
import night from "../../assets/sideBar/night.svg";
import plus from "../../assets/sideBar/plus.svg";
import setting from "../../assets/sideBar/setting.svg";
import notice from "../../assets/sideBar/notice.svg";
import todos from "../../assets/sideBar/todos.svg";
import schedule from "../../assets/sideBar/schedule.svg";
import minutes from "../../assets/sideBar/minutes.svg";
import report from "../../assets/sideBar/report.svg";
import minus from '../../assets/sideBar/minus.svg';
import logout from '../../assets/sideBar/logout.svg';
import night from '../../assets/sideBar/night.svg';
import plus from '../../assets/sideBar/plus.svg';
import setting from '../../assets/sideBar/setting.svg';
import notice from '../../assets/sideBar/notice.svg';
import todos from '../../assets/sideBar/todos.svg';
import schedule from '../../assets/sideBar/schedule.svg';
import minutes from '../../assets/sideBar/minutes.svg';
import report from '../../assets/sideBar/report.svg';
import settingIcon from '../../assets/sideBar/settingIcon.svg';

// Theme Context
import { useTheme } from "../../context/ThemeContext";

// Sidebar Context
import { useSidebar } from "../../context/SidebarContext";

// Axios Instance
import axiosInstance from "../../axiosInstance";

// Modal Import
import CreateProject from "../CreateProject";

// Function
export default function ProjectSideBar() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const userId = localStorage.getItem("userId");
  if (userId === null) {
    navigate("/auth/login");
  }
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isOpen, toggleSidebar } = useSidebar();
  const [projectItems, setProjectItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast 설정
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

  // 사이드바 메뉴
  const menuItems = [
    { icon: notice, text: "공지사항", path: `/${teamId}/notice` },
    { icon: todos, text: "할 일", path: `/${userId}/todos` },
    { icon: schedule, text: "일정표", path: `/${teamId}/schedule` },
    { icon: minutes, text: "회의록", path: `/${teamId}/minutes` },
    { icon: report, text: "활동 리포트", path: `/${teamId}/report` },
  ];

  // 팀 목록 가져오기
  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/teams/my-teams");

      // API 응답 데이터를 projectItems 형식으로 변환
      const teams = response.data.map((team) => ({
        id: team.teamId,
        name: team.teamName,
        owner: team.creatorName,
        img: team.profilePicture || null, // 빈 문자열 대신 null 사용
      }));

      setProjectItems(teams);
    } catch (error) {
      console.error("팀 목록을 불러오는데 실패했습니다:", error);
      // 에러 발생 시 빈 배열로 설정
      setProjectItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleProjectCreated = () => {
    fetchTeams();
    // localStorage의 플래그를 확인하고 토스트 표시
    const projectCreated = localStorage.getItem("projectCreated");
    if (projectCreated === "true") {
      toast.success("프로젝트가 생성되었습니다!", { ...toastcode(3000) });
      toast.clearWaitingQueue();
      localStorage.removeItem("projectCreated");
    }
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
      {isModalOpen && (
        <CreateProject
          onClose={closeModal}
          onProjectCreated={handleProjectCreated}
        />
      )}
      <div
        className={`${styles.container} ${isOpen ? styles.open : ""} ${
          isDarkMode ? styles.dark : ""
        }`}
      >
        <div className={styles.minusButton}>
          <img
            className={styles.minusIcon}
            src={minus}
            alt="Minus"
            onClick={toggleSidebar}
          />
        </div>
        <div className={styles.projectCreate} onClick={openModal}>
          <img className={styles.plusIcon} src={plus} alt="Plus" />
          <div className={styles.projectCreateText}>새 프로젝트 만들기</div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className={styles.menuItem}>
              <img
                src={item.icon}
                alt={item.text}
                className={styles.menuIcon}
              />
              <span className={styles.menuText}>{item.text}</span>
            </Link>
          ))}
        </div>

        <div className={styles.line}></div>
        <div className={styles.myProjectsTitle}>내 프로젝트</div>
        <div className={styles.projectList}>
          {isLoading ? (
            <div className={styles.loadingText}>로딩 중...</div>
          ) : projectItems.length === 0 ? (
            <div className={styles.emptyText}>
              참여 중인 프로젝트가 없습니다
            </div>
          ) : (
            projectItems.map((item) => (
              <Link
                key={item.id}
                className={styles.projectItem}
                to={`/${item.id}`}
              >
                <div className={styles.projectImgGradient}>
                  <div className={styles.projectImgBackground}>
                    {item.img ? (
                      <img
                        className={styles.projectImg}
                        src={item.img}
                        alt="프로젝트 이미지"
                      />
=======
    const navigate = useNavigate();
    const { teamId } = useParams();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { isOpen, toggleSidebar } = useSidebar();
    const [projectItems, setProjectItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toast 설정
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

    // 사이드바 메뉴
    const menuItems = [
        { icon: notice, text: '공지사항', path: `/${teamId}/notice` },
        { icon: todos, text: '할 일', path: `/${teamId}/todos` },
        { icon: schedule, text: '일정표', path: `/${teamId}/schedule` },
        { icon: minutes, text: '회의록', path: `/${teamId}/minutes` },
        { icon: report, text: '활동 리포트', path: `/${teamId}/report` },
        { icon: settingIcon, text: '프로젝트 설정', path: `/${teamId}/setting` },
    ];

    // 팀 목록 가져오기
    const fetchTeams = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get('/teams/my-teams');
            
            // API 응답 데이터를 projectItems 형식으로 변환
            const teams = response.data.map(team => ({
                id: team.teamId,
                name: team.teamName,
                owner: team.creatorName,
                img: team.profilePicture || null, // 빈 문자열 대신 null 사용
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

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/auth/login');
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const handleProjectCreated = () => {
        fetchTeams();
        // localStorage의 플래그를 확인하고 토스트 표시
        const projectCreated = localStorage.getItem('projectCreated');
        if (projectCreated === 'true') {
            toast.success('프로젝트가 생성되었습니다!', { ...toastcode(3000) });
            toast.clearWaitingQueue();
            localStorage.removeItem('projectCreated');
        }
    };
    
    return(
        <>
            {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
            {isModalOpen && (
                <CreateProject 
                    onClose={closeModal} 
                    onProjectCreated={handleProjectCreated} 
                />
            )}
            <div className={`${styles.container} ${isOpen ? styles.open : ''} ${isDarkMode ? styles.dark : ''}`}>
                <div className={styles.minusButton}>
                    <img className={styles.minusIcon} src={minus} alt="Minus" onClick={toggleSidebar} />
                </div>
                <div className={styles.projectCreate} onClick={openModal}>
                    <img className={styles.plusIcon} src={plus} alt="Plus" /><div className={styles.projectCreateText}>새 프로젝트 만들기</div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.menuSection}>
                    {menuItems.map((item, index) => (
                        <Link key={index} to={item.path} className={styles.menuItem}>
                            <img src={item.icon} alt={item.text} className={styles.menuIcon} />
                            <span className={styles.menuText}>{item.text}</span>
                        </Link>
                    ))}
                </div>

                <div className={styles.line}></div>
                <div className={styles.myProjectsTitle}>내 프로젝트</div>
                <div className={styles.projectList}>
                    {isLoading ? (
                        <div className={styles.loadingText}>로딩 중...</div>
                    ) : projectItems.length === 0 ? (
                        <div className={styles.emptyText}>참여 중인 프로젝트가 없습니다</div>
                    ) : (
                      <div
                        className={styles.projectImg}
                        style={{ backgroundColor: "#e0e0e0" }}
                      ></div>
                    )}
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
            <img src={setting} alt="설정 아이콘" />
            <div className={styles.settingText}>설정</div>
          </div>
          <div className={styles.darkModeToggle} onClick={toggleDarkMode}>
            <img src={night} alt="다크 모드 아이콘" />
            <div className={styles.darkModeText}>다크 모드</div>
            <div
              className={`${styles.darkModeSwitch} ${
                isDarkMode ? styles.active : ""
              }`}
            >
              <div className={styles.darkModeCircle}></div>
            </div>
          </div>
          <div className={styles.toggleText1}>서비스 운영 정책</div>
          <div className={styles.toggleText2}>개인정보 처리 방침</div>
          <div className={styles.logoutToggle} onClick={handleLogout}>
            <img src={logout} alt="로그아웃 아이콘" />
            <div className={styles.logoutText}>로그아웃</div>
          </div>
        </div>
      </div>
    </>
  );
}
