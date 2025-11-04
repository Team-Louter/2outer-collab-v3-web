// Module.css import
import styles from './LeftSideBar.module.css';

// Link import
import { Link } from 'react-router-dom';

// Img import
import minus from '../../assets/leftSideBar/logo.svg';

// Const
const Sidebar = () => {
    return(
        <>
            <nav className={styles.side_bar}>
                <div className={styles.minus_div}>
                    <img className={`${styles.minus_img} ${styles.icon}`} src={minus} alt="" />
                </div>

                <div className={`${styles.plus_div} ${button_hover}`}>
                    <svg className={`${styles.plus_img} ${styles.icon}`} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 21C7.8 21 4 17.2 4 12.5C4 7.8 7.8 4 12.5 4C17.2 4 21 7.8 21 12.5C21 17.2 17.2 21 12.5 21ZM12.5 5C8.35 5 5 8.35 5 12.5C5 16.65 8.35 20 12.5 20C16.65 20 20 16.65 20 12.5C20 8.35 16.65 5 12.5 5Z" fill="currentColor"/>
                        <path d="M8 12H17V13H8V12Z" fill="currentColor"/>
                        <path d="M12 8H13V17H12V8Z" fill="currentColor"/>
                    </svg>

                    <div className={styles.plus_text}>새 프로젝트 만들기</div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.project_text}>내 프로젝트</div>
                
                <div className={styles.my_project}>
                    <ul className={styles.project_list}>
                        <li className={styles.project_item}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/Louter.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>Louter</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_item}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/B1ND.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>B1ND</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/CNS.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>CNS</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/3D.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>삼디</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/두카미.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>두카미</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/ALT.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>ALT</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/모디.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>모디</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/CHATTY.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>CHATTY</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/Louter.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>Louter2</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/Louter.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>Louter3</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                        <li className={styles.project_info}>
                            <div className={styles.project_gradation}>
                                <div className={styles.project_white}>
                                    <img className={styles.project_icon} src="../src/assets/images/project_img/Louter.svg" alt="프로젝트 이미지"/>
                                </div>
                            </div>
                            <div className={styles.project_info}>
                                <div className={styles.project_name}>Louter4</div>
                                <div className={styles.project_owner}>hyxx._.su</div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={styles.line}></div>
                
                <div className={`${styles.setting} ${styles.button_hover}`}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.10417 1.58331C7.94937 1.58331 6.84187 2.04205 6.02531 2.85862C5.20874 3.67518 4.75 4.78268 4.75 5.93748C4.75 7.09228 5.20874 8.19978 6.02531 9.01634C6.84187 9.8329 7.94937 10.2916 9.10417 10.2916C10.259 10.2916 11.3665 9.8329 12.183 9.01634C12.9996 8.19978 13.4583 7.09228 13.4583 5.93748C13.4583 4.78268 12.9996 3.67518 12.183 2.85862C11.3665 2.04205 10.259 1.58331 9.10417 1.58331ZM15.4375 10.0937V11.1831C16.0035 11.3287 16.5078 11.6264 16.9053 12.0317L17.8489 11.4863L18.6406 12.8574L17.6977 13.4021C17.8519 13.9568 17.8519 14.5431 17.6977 15.0979L18.6406 15.6425L17.8489 17.0137L16.9053 16.4682C16.5022 16.8793 15.9948 17.1727 15.4375 17.3169V18.4062H13.8542V17.3169C13.2969 17.1727 12.7894 16.8793 12.3864 16.4682L11.442 17.0137L10.6503 15.6425L11.594 15.0979C11.4398 14.5431 11.4398 13.9568 11.594 13.4021L10.6503 12.8574L11.442 11.4863L12.3864 12.0309C12.7895 11.6202 13.297 11.3271 13.8542 11.1831V10.0937H15.4375ZM13.2596 13.4844C13.13 13.7188 13.0619 13.9822 13.0617 14.25C13.0617 14.5271 13.1338 14.7883 13.2596 15.0155L13.2881 15.0654C13.4288 15.2999 13.6278 15.4939 13.8657 15.6286C14.1037 15.7633 14.3724 15.8341 14.6458 15.8341C14.9193 15.8341 15.188 15.7633 15.426 15.6286C15.6639 15.4939 15.8629 15.2999 16.0035 15.0654L16.032 15.0155C16.1579 14.7883 16.2292 14.5279 16.2292 14.25C16.2292 13.9729 16.1579 13.7116 16.032 13.4844L16.0028 13.4346C15.862 13.2003 15.6631 13.0064 15.4252 12.8718C15.1874 12.7372 14.9187 12.6665 14.6454 12.6665C14.3721 12.6665 14.1035 12.7372 13.8657 12.8718C13.6278 13.0064 13.4288 13.2003 13.2881 13.4346L13.2596 13.4844ZM10.3408 11.0833C9.66431 12.0004 9.30022 13.1104 9.30208 14.25C9.30022 15.3895 9.66431 16.4996 10.3408 17.4166H1.58333V15.8333C1.58333 14.5735 2.08378 13.3654 2.97458 12.4746C3.86537 11.5838 5.07356 11.0833 6.33333 11.0833H10.3408Z" fill="#181F29"/>
                    </svg>
                    설정
                </div>
                
                <div className={`${styles.darkmode} ${styles.button_hover}`}>
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2132 2.50801L11.1279 3.09376L12.2132 3.67951L12.8068 4.75051L13.4003 3.67951L14.4856 3.09376L13.4003 2.50801L12.8075 1.43701L12.2132 2.50801ZM1.69177 9.00001C1.69177 4.85776 5.09429 1.50001 9.29177 1.50001H10.6096L9.94993 2.62501C9.50989 3.37501 9.29177 4.26676 9.29177 5.25001C9.29166 6.02522 9.46551 6.79084 9.80084 7.49187C10.1362 8.19291 10.6247 8.81196 11.2312 9.30456C11.8378 9.79716 12.5474 10.1511 13.309 10.3409C14.0706 10.5308 14.8654 10.5518 15.6363 10.4025L16.9146 10.1573L16.5019 11.3768C15.9966 12.8691 15.0286 14.1668 13.7348 15.0862C12.441 16.0056 10.8869 16.5002 9.29253 16.5C5.09505 16.5 1.69177 13.1423 1.69177 9.00001ZM15.7525 4.81201L16.4472 6.06451L17.7156 6.75001L16.4464 7.43551L15.7518 8.68801L15.0579 7.43551L13.7887 6.75001L15.0579 6.06451L15.7525 4.81201Z" fill="#181F29"/>
                    </svg>
                    다크모드
                </div>

                <div className={`${styles.rule1} ${styles.button_hover}`}>서비스 운영 정책</div>
                
                <div className={`${styles.rule2} ${styles.button_hover}`}>개인정보 처리 방침</div>
                
                <div className={`${styles.logout} ${styles.button_hover}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="#181F29"/>
                    </svg>
                    로그아웃
                </div>
            </nav>
        </>
    );
};

export default Sidebar;