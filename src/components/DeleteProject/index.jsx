import styles from "./DeleteProject.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import YesNoButtons from "../Buttons";

export default function DeleteProject({ setDeletePModalOpen }) {
    const {teamname} = useParams();
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <img src={closeModal} onClick={() => setDeletePModalOpen(false)} />
                <h3>프로젝트를 삭제하시겠습니까?</h3>
                <div className={styles.inputBox}>
                    <small>확인 <span style={{color: 'red'}}>*</span></small>
                    <input placeholder={teamname}/>
                </div>
                <small style={{color: 'red', fontWeight: 600}}>프로젝트를 삭제하기 위해 프로젝트명을 입력하세요.</small>
                <YesNoButtons no={setDeletePModalOpen}/>
            </div>
        </div>
    )
}