import { useState } from "react";
import styles from "./Appliance.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import { OkayButtons } from "../Buttons";
import axiosInstance from "../../axiosInstance";

export default function Appliance({ apply, setApplianceOpen, getMembers, applyJoin }) {
  const { teamId} = useParams();

  const reject = async () => {
    const data = {
      requestId : apply.requestId,
      approve: false
    };

    try {
      const res = await axiosInstance.post(`/teams/${teamId}/join-request/process`, data);
      console.log("거절 성공");
      setApplianceOpen(false);
      applyJoin();
    }
    catch(err) {
      console.error(err);
    }
  }

  const ok = async () => {
    const data = {
      requestId : apply.requestId,
      approve: true
    };

    try {
      const res = await axiosInstance.post(`/teams/${teamId}/join-request/process`, data);
      console.log("승인 성공", res);
      setApplianceOpen(false);
      getMembers();
      applyJoin();
    }
    catch(err) {
      console.error(err);
    }
  }

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
            <textarea value={apply.introduction} readOnly />
          </div>

          <div className={styles.result} style={{marginBottom: 20}}>
            <small>작업물</small>
            <input value={apply.workUrl} readOnly />
          </div>

          <div className={styles.button}>
            <OkayButtons no={reject} yes={ok}/>
          </div>
        </div>
      </div>
    </>
  );
}