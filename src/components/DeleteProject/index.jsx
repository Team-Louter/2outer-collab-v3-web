import styles from "./DeleteProject.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import { YesNoButtons } from "../Buttons";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function DeleteProject({ setDeletePModalOpen, teamInfo }) {
    const { teamId } = useParams();
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleDeleteProject = async () => {
        let res;
        try {
            if (confirm === teamInfo.teamName) {
                res = await axiosInstance.delete(`/teams/${teamId}`, {
                    params: {
                        confirmTeamName: confirm
                    }
                });
                console.log("프로젝트 삭제 성공", res.data);
                navigate('/');
            }
            else {
                alert("프로젝트 이름이 올바르지 않습니다.")
            }
        }
        catch(err) {
            console.error("프로젝트 삭제 실패", err);
        }
      }

    const handleChange = (e) => {
        setConfirm(e.target.value);
    }

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <img
                    src={closeModal}
                    onClick={() => setDeletePModalOpen(false)}
                    className={styles.closeIcon}
                />
                <h3>프로젝트를 삭제하시겠습니까?</h3>
                <div className={styles.inputBox}>
                    <small>확인 <span style={{color: 'red'}}>*</span></small>
                    <input placeholder={teamInfo.teamName} value={confirm} onChange={handleChange}/>
                </div>
                <small style={{color: 'red', fontWeight: 600}}>프로젝트를 삭제하기 위해 프로젝트명을 입력하세요.</small>
                <YesNoButtons no={setDeletePModalOpen} yes={handleDeleteProject}/>
            </div>
        </div>
    )
}