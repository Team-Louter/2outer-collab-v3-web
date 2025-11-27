import styles from "./UserProfile.module.css";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import profileIcon from "../../assets/UserProfile/profileIcon.svg";
import editIcon from "../../assets/UserProfile/editIcon.svg";
import axiosInstance from "../../axiosInstance";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [editting, setEditting] = useState(false);
    const fileInputRef = useRef(null);
    const userId = localStorage.getItem('userId');
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState(""); 
    
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadRes = await axiosInstance.post('/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log('업로드 성공:', uploadRes.data);
            
            const imageUrl = uploadRes.data.url || uploadRes.data; 
            setUploadedImageUrl(imageUrl);
            
        } catch (err) {
            console.error('파일 업로드 실패:', err);
            alert('파일 업로드에 실패했습니다.');
        }
    };

    const getUserInfo = async () => {
        try {
            const res = await axiosInstance.get(`/profile/${userId}`);
            setUser(res.data);
            setBio(res.data.bio);
            setUserName(res.data.userName);
            setUploadedImageUrl(res.data.profileImageUrl);
            console.log("프로필 정보", res.data);
        }
        catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    const changeName = (e) => {
        setUserName(e.target.value);
    }

    const changeBio = (e) => {
        setBio(e.target.value);
    }

    const changeUserInfo = async () => {
        const data = {
            userName: userName,
            profileImageUrl: uploadedImageUrl, 
            bio: bio 
        }

        try {
            const res = await axiosInstance.put(`/profile/${userId}`, data);
            console.log('프로필 업데이트 성공:', res.data);
            setUser(res.data); // 서버 응답으로 user 업데이트
            setEditting(false);
        }
        catch(err) {
            console.error(err);
            alert('프로필 업데이트에 실패했습니다.');
        }
    }

    const cancel = () => {
        setEditting(false);
        setUserName(user?.userName);
        setBio(user?.bio);
        setUploadedImageUrl(user?.profileImageUrl); // 원래 이미지로 복원
    }

    return (
        <div className={styles.profile}>
            <Header />
            <div className={styles.main}>
                <div className={styles.container}>
                    <h2 style={{marginBottom:'30px'}}>기본 프로필</h2>
                    <div className={styles.top}>
                    <div className={styles.profileImg}>
                        {uploadedImageUrl && <img src={uploadedImageUrl} />}
                        {editting &&
                            <>
                                <div className={styles.edit} onClick={handleClick}>
                                    <img src={editIcon} />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </>
                        }
                    </div>
                        <div className={styles.column}>
                            <small>닉네임</small>
                            <input value={userName} readOnly={!editting} onChange={changeName}/>
                            <small>내 프로젝트</small>
                            <div className={styles.projectContainer}>
                                {user?.projects.map((project, index) =>
                                    <div key={index} className={styles.project}>
                                        <img src={project.projectPicture} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <small>내 소개</small>
                    <textarea value={bio} readOnly={!editting} onChange={changeBio}/>
                    {editting === false 
                        ? <button onClick={() => setEditting(true)}>프로필 편집</button> 
                        : <div className={styles.buttons}>
                            <button style={{color: 'black', backgroundColor: 'white', border: '1px solid #CCCCCC'}} onClick={cancel}>취소</button>
                            <button onClick={changeUserInfo}>저장</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}