import { useEffect, useState } from "react";
import styles from './ProjectMain.module.css'
import classNames from "classnames/bind";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import detailIcon from "../../assets/projectMain/detailIcon.svg";
import documentIcon from "../../assets/projectMain/documentIcon.svg";
import headerMenu from "../../assets/projectMain/headerMenu.svg";
import noticeIcon from "../../assets/projectMain/noticeIcon.svg";
import pOutIcon from "../../assets/projectMain/pOutIcon.svg";
import pProfileIcon from "../../assets/projectMain/pProfileIcon.svg";
import profileChangeIcon from "../../assets/projectMain/profileChangeIcon.svg";
import reportIcon from "../../assets/projectMain/reportIcon.svg";
import todoIcon from "../../assets/projectMain/todoIcon.svg";
import EditProject from "../../components/EditProject";
import OutProject from "../../components/OutProject";
import axiosInstance from "../../axiosInstance";
import MemberSideBar from '../../components/MemberSideBar';
import ProjectSideBar from "../../components/ProjectSideBar";

export default function ProjectMain() {
    const [open, setOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const st = classNames.bind(styles);
    const [editPModal, setEditPModal] = useState(false);
    const [outPModal, setOutPModal] = useState(false);
    const [teamInfo, setTeamInfo] = useState(null);
    const [members, setMembers] = useState(null);
    const [scheules, setSchedules] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const { teamId } = useParams();
    console.log('open: ',open)
    console.log('reportOpen: ', reportOpen)

    const modalOpen = (func) => {
        setOpen(false);
        func(true);
    }

    const getMemberName = (authorId) => {
        const member = members?.find(m => m.userId === authorId);
        return member?.userName || '알 수 없음';
    }

    useEffect(() => {
        const getTeam = async () => {
            try {
                const res = await axiosInstance.get(`/teams/${teamId}`);
                console.log("팀 정보", res.data);
                setTeamInfo(res.data);
            }
            catch(err) {
                console.error("팀 정보 가져오기 실패", err);
            }
        }

        const getMembers = async () => {
            try {
                const res = await axiosInstance.get(`/teams/${teamId}/members`);
                setMembers(res.data);
                console.log(res.data)
            }
            catch(err) {
                console.error(err);
            }
        }

        const getSchedules = async () => {
            try {
                const res = await axiosInstance.get(`/team/${teamId}/schedule`);
                setSchedules(res.data.schedules);
                console.log("일정", res.data.schedules);
            }
            catch(err) {
                console.error(err);
            }
        }

        const getMinutes = async () => {
            try {
                const res = await axiosInstance.get(`/teams/${teamId}/pages`);
                setMinutes(res.data);
                console.log("회의록", res.data);
            }
            catch(err) {
                console.error(err)
            }
        }

        getTeam();
        getMembers();
        getSchedules();
        getMinutes();
    },[teamId])

    return(
        <>
            <Header />
            <ProjectSideBar/>
            <main>
                <div className={styles.banner}>
                    <img src={teamInfo?.bannerPicture} className={styles.bannerImg}/>
                    <img src={headerMenu} alt="프로젝트 관련 메뉴" onClick={() => setOpen(!open)} className={styles.bannerMenu}/>
                    <ul className={st('dropdown', {show: open})}>
                        <li>
                            <Link to={`/${teamId}/setting`}>
                                <img src={pProfileIcon} alt="프로젝트 설정" className={styles.dropdownIcon}/>
                                <span>프로젝트 설정</span>
                            </Link>
                        </li>
                        <li>
                            <div onClick={() => modalOpen(setEditPModal)} style={{cursor: "pointer"}}>
                                <img src={profileChangeIcon} alt="프로젝트 편집" className={styles.dropdownIcon}/>
                                <span>프로젝트 편집</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => modalOpen(setOutPModal)} style={{cursor: "pointer"}}>
                                <img src={pOutIcon} alt="프로젝트 나가기" className={styles.dropdownIcon}/>
                                <span>프로젝트 나가기</span>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.onlineWrap}>
                        <div className={styles.online}></div>
                        <small>{members ? members.length : 0}명</small>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={`${styles.notice} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={noticeIcon}/>                       
                                공지사항
                            </div>
                            <Link to={`/${teamId}/notice`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.noticeContent}>
                            <div>공지사항을 불러오는 중...</div>
                            <div className={styles.noticeInfo}>날짜 ∙ 작성자</div>
                        </div>
                    </div>
                    <div className={`${styles.todo} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={todoIcon}/>
                                일정
                            </div>
                            <Link to={`/${teamId}/schedule`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.todoContainer}>
                            {scheules
                                ?.filter(schedule => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0); 
                                const scheduleDate = new Date(schedule.scheduleDate);
                                return scheduleDate >= today; 
                                })
                                .sort((a, b) => new Date(a.scheduleDate) - new Date(b.scheduleDate))
                                .map(schedule => (
                                <div className={styles.todoContent} key={schedule.id}>
                                    <div>{schedule.scheduleTitle}</div>
                                    <div className={styles.todoInfo}>
                                    {schedule.scheduleDate.substring(0, 10)} ∙ 작성자
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`${styles.minutes} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={documentIcon}/>                       
                                회의록
                            </div>
                            <Link to={`/${teamId}/minutes`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.minutesContainer}>
                            {minutes?.map(minute => (
                                <div className={styles.minutesContent}>
                                    <div>{minute.title}</div>
                                    <div className={styles.minutesInfo}>{minute?.createdAt.substring(0, 10)} ∙ {getMemberName(minute.authorId)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.report} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={reportIcon}/>                                              
                                활동 리포트
                            </div>
                            <Link to={`/${teamId}/report`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <small>최근 작성한 회의록을 반영하여 정리한 리포트입니다.</small>
                        <div className={styles.content}>
                            <div className={styles.col}>
                                <div className={styles.reportBox}>
                                    <span>회의 날짜 : </span>
                                </div>
                                <div className={styles.reportBox}>
                                    <span>회의 주제 : </span>
                                </div>
                                <div className={styles.reportBox}>
                                    <span>다음 회의 : </span>
                                </div>
                            </div>
                            <div className={st('reportBoxContent', {reportShow: reportOpen})} onClick={() => setReportOpen(!reportOpen)}>
                                <span>
                                    <div className={styles.shortTitle}>회의 요약</div>
                                    <span className={styles.short}>
                                        회의 요약을 불러오는 중입니다...
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {editPModal && <EditProject setEditProject={setEditPModal} teamInfo={teamInfo}/>}
                    {outPModal && <OutProject setOutPModalOpen={setOutPModal} teamInfo={teamInfo}/>}
                </div>
            </main>
            <MemberSideBar />
        </>
    )
}