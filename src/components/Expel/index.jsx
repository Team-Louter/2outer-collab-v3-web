import styles from "./Expel.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { YesNoButtons } from "../Buttons";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

export default function Expel({expelPerson, setExpelModalOpen, messages, type, getRoles, getMembers }) {
    const { teamId } = useParams();

    const handleDelete = async () => {
        let res;
        try {
            if (type === '역할') {
                if (expelPerson.roleName != '관리자') {
                res = await axiosInstance.delete(`/teams/${teamId}/roles/${expelPerson.roleId}`);
                console.log("역할 삭제 성공");
                getRoles();
                }
                else {
                    alert("관리자는 삭제할 수 없습니다.")
                }
            }
            if (type === '멤버') {
                if (expelPerson.roleName != '관리자'){
                    res = await axiosInstance.delete(`teams/${teamId}/kick`, expelPerson.userId);
                    console.log("멤버 추방 성공");
                    getMembers();
                }
                else {
                    alert("관리자는 추방할 수 없습니다.")
                }
            }

            setExpelModalOpen(false);
        }
        catch(err) {
            console.error(err);
        }
    }

    console.log(expelPerson)

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <img
                    src={closeModal}
                    onClick={() => setExpelModalOpen(false)}
                    className={styles.closeIcon}
                    />
                <h3>{messages}</h3>
                {type === '멤버' 
                    ? <h4>{expelPerson.userName}({expelPerson.roleName})</h4>
                    : <h4>{expelPerson.roleName}</h4>
                }
            <YesNoButtons no={setExpelModalOpen} yes={handleDelete}/>
            </div>
        </div>
    )
}