import { useState } from "react";
import styles from "./Appliance.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import { OkayButtons } from "../Buttons";

export default function Appliance({ apply, setApplianceOpen }) {
  const { teamId} = useParams();
  const [previewSrc, setPreviewSrc] = useState(null);
  const [bigger, setBigger] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
  };

  const handlePreviewClick = () => {
    if (previewSrc) {
      setBigger(true);
    }
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <img
            src={closeModal}
            onClick={() => setApplianceOpen(false)}
            className={styles.closeIcon}
          />

          <div className={styles.top}>
            <h3>참가 요청서</h3>
            <small>{apply.teamName}</small>
          </div>

          <div className={styles.name}>
            <small>닉네임</small>
            <input value={apply.userName} readOnly />
          </div>

          <div className={styles.intro}>
            <small>소개</small>
            <textarea value readOnly />
          </div>

          <div className={styles.result} style={{marginBottom: 20}}>
            <small>작업물</small>
            <input value={apply.workUrl} readOnly />
          </div>

          <div className={styles.button}>
            <OkayButtons />
          </div>
        </div>
      </div>
    </>
  );
}