import { useState } from "react";
import styles from "./Appliance.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import { OkayButtons } from "../Buttons";

export default function Appliance({ setApplianceOpen, person }) {
  const { teamname } = useParams();
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
            <small>{teamname}</small>
          </div>

          <div className={styles.name}>
            <small>닉네임</small>
            <input value={person.id} readOnly />
          </div>

          <div className={styles.intro}>
            <small>소개</small>
            <textarea value={person.introduce} readOnly />
          </div>

          <div className={styles.result} style={{marginBottom: 20}}>
            <small>작업물</small>
            <input value={person.id} readOnly />
          </div>

          <div className={styles.button}>
            <OkayButtons />
          </div>
        </div>
      </div>

      {bigger && (
        <div
          className={styles.enlargedBackground}
          onClick={() => setBigger(false)}
        >
          <img
            src={previewSrc}
            alt="enlarged"
            className={styles.enlargedImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}