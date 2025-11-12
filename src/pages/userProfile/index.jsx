import styles from "./UserProfile.module.css";
import Header from "../../components/Header";
import { useRef, useState } from "react";
import profileIcon from "../../assets/UserProfile/profileIcon.svg";
import editIcon from "../../assets/UserProfile/editIcon.svg";

export default function UserProfile() {
    const user = {
        id: 'hyxx._.su',
        projects: ['Louter', 'Connect', '방송부', '자치',],
        introduce: '안녕티비',
    };
    const [editting, setEditting] = useState(false);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    };

    return (
        <div className={styles.profile}>
            <Header />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h2 style={{marginBottom:'30px'}}>기본 프로필</h2>
                    <div className={styles.top}>
                        <div className={styles.profileImg}>
                            <img src={profileIcon} />
                            {editting &&
                                <>
                                    <div className={styles.edit} onClick={handleClick}>
                                        <img src={editIcon} />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                </>
                            }
                        </div>
                        <div className={styles.column}>
                            <small>닉네임</small>
                            <input defaultValue={user.id} readOnly={editting === false ? true : false}/>
                            <small>내 프로젝트</small>
                            <div className={styles.projectContainer}>
                                {user.projects.map(project =>
                                    <div className={styles.project}></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <small>내 소개</small>
                    <textarea defaultValue={user.introduce} readOnly={editting === false ? true : false}/>
                    {editting === false 
                        ? <button onClick={() => setEditting(!editting)}>프로필 편집</button> 
                        : <div className={styles.buttons} onClick={() => setEditting(!editting)}>
                            <button style={{color: 'black', backgroundColor: 'white', border: '1px solid #CCCCCC'}}>취소</button><button>저장</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}