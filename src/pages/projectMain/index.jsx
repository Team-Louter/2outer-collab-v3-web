import { useState } from "react";
import styles from './ProjectMain.module.css'
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
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


export default function ProjectMain() {
    const teamname = 'Louter'
    const [open, setOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const st = classNames.bind(styles);
    console.log('open: ',open)
    console.log('reportOpen: ', reportOpen)
    return(
        <>
            <Header />
            <div className={`${styles.leftSidebar} leftSidebar`}>왼 사이드</div>
            <main>
                <div className={styles.banner}>배너 영역
                    <img src={headerMenu} alt="프로젝트 관련 메뉴" onClick={() => setOpen(!open)}/>
                    <ul className={st('dropdown', {show: open})}>
                        <li>
                            <Link to={`/${teamname}/setting`}>
                            <img src={pProfileIcon} alt="프로젝트 설정" className={styles.dropdownIcon}/>
                            <span>프로젝트 설정</span>
                            </Link>
                        </li>
                        <li>
                            <img src={profileChangeIcon} alt="프로젝트 편집" className={styles.dropdownIcon}/>
                            <span>프로젝트 편집</span>
                        </li>
                        <li>
                            <img src={pOutIcon} alt="프로젝트 나가기" className={styles.dropdownIcon}/>
                            <span>프로젝트 나가기</span>
                        </li>
                    </ul>
                        <div className={styles.online}></div><small>멤버 수</small>
                </div>
                <div className={styles.container}>
                    <div className={`${styles.notice} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={noticeIcon}/>                       
                                공지사항
                            </div>
                            <Link to={`/${teamname}/notice`}>
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
                                할 일
                            </div>
                            <Link to={`/${teamname}/todos`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.todoContent}>
                            <div>할 일을 불러오는 중...</div>
                            <div className={styles.todoInfo}>날짜 ∙ 작성자</div>
                        </div>
                    </div>
                    <div className={`${styles.minutes} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={documentIcon}/>                       
                                회의록
                            </div>
                            <Link to={`/${teamname}/minutes`}>
                                <div className={styles.detail}>
                                    자세히 보기 
                                    <img src={detailIcon} alt="자세히보기"/>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.minutesContent}>
                            <div>회의록을 불러오는 중...</div>
                            <div className={styles.minutesInfo}>날짜 ∙ 생성자</div>
                        </div>
                    </div>
                    <div className={`${styles.report} ${styles.box}`}>
                        <div className={styles.title}>
                            <div className={styles.row}>
                                <img src={reportIcon}/>                                              
                                활동 리포트
                            </div>
                            <Link to={`/${teamname}/report`}>
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
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>
        </>
    )
}