// Module.css import
import styles from './SideBar.module.css';

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

// Function
export default function Sidebar() {
    const projectItems = [
        {
            name: 'Louter',
            owner: 'hyxx._.su',
            img: projectImg,
        },
        {
            name: 'Louter',
            owner: '프로젝트 소유자',
            img: projectImg,
        },
    ];
    
    return(
        <>
            <div className={styles.container}>
                <div className={styles.minusButton}>
                    <img className={styles.minusIcon} src={minus} alt="Minus" />
                </div>
                <div className={styles.projectCreate}>
                    <img className={styles.plusIcon} src={plus} alt="Plus" /><div className={styles.projectCreateText}>새 프로젝트 만들기</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.myProjectsTitle}>내 프로젝트</div>
                <div className={styles.projectList}>
                    {projectItems.map((item) => (
                        <Link className={styles.projectItem} to={`/teamname`}>
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
                    ))}
                </div>
                <div className={styles.line}></div>
                <div className={styles.sidebarBottom}>
                    <div className={styles.settingToggle}>
                        <img src={setting} alt="설정 아이콘" /><div className={styles.settingText}>설정</div>
                    </div>
                    <div className={styles.darkModeToggle}>
                        <img src={night} alt="다크 모드 아이콘" /><div className={styles.darkModeText}>다크 모드</div>
                        <div className={styles.darkModeSwitch}>
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