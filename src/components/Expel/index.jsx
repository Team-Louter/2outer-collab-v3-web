import styles from "./Expel.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";

export default function Expel({expelPerson, setExpelModalOpen, setMembers}) {
    const handleExpel = (nickname) => {
        setMembers(prev => prev.filter(member => member.nickname !== nickname));
        setExpelModalOpen(false);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContent}>
                <img src={closeModal} onClick={() => setExpelModalOpen(false)} />
                <h3>해당 멤버를 추방하시겠습니까?</h3>
                <h4>{expelPerson.nickname}({expelPerson.role})</h4>
                <div className={styles.buttons}>
                    <button className={styles.no} onClick={() => setExpelModalOpen(false)}>아니오</button>
                    <button className={styles.yes} onClick={() => handleExpel(expelPerson.nickname)}>네</button>
                </div>
            </div>
        </div>
    )
}