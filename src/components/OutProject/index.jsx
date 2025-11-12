import styles from "./OutProject.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import { YesNoButtons } from "../Buttons";

export default function OutProject({ setOutPModalOpen, teamInfo }) {
    const {teamId} = useParams();
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <img
                    src={closeModal}
                    onClick={() => setOutPModalOpen(false)}
                    className={styles.closeIcon}
                />
                <h3>프로젝트에서 나가시겠습니까?</h3>
                <small>{teamInfo.teamName}</small>
                <YesNoButtons no={setOutPModalOpen}/>
            </div>
        </div>
    )
}