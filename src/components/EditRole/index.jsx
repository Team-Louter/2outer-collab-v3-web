import { useState } from "react";
import styles from "./EditRole.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { ToggleButton } from "../Buttons";

export default function EditRole({ setEditRole, roleMode, selectedRole }) {
  const [teamSettings, setTeamSettings] = useState(selectedRole?.teamSettings); // 팀 관련 설정 편집 권한
  const [announcement, setAnnouncement] = useState(selectedRole?.announcement); // 공지 작성 권한
  const [meetingNote, setMeetingNote] = useState(selectedRole?.meetingNote); // 회의록 작성 권한
  const [schedule, setSchedule] = useState(selectedRole?.schedule); // 일정 편집 권한
  const [roleName, setRoleName] = useState(selectedRole?.role);
  const [roleDescription, setRoleDescription] = useState(selectedRole?.description);

  const MAX_NAME_LENGTH = 50;
  const MAX_DESC_LENGTH = 100;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setRoleName(value);
    }
  };

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_DESC_LENGTH) {
      setRoleDescription(value);
    }
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <img
            src={closeModal}
            onClick={() => setEditRole(false)}
            className={styles.closeIcon}
          />
          <div className={styles.top}>
            <h3>역할 {roleMode}</h3>
          </div>
          <div className={styles.inputBox}>
            <small>역할명 <span>*</span></small>
            <input placeholder="역할명을 입력해주세요." onChange={handleNameChange} value={roleName}/>
            <small className={styles.letter}>{roleName ? roleName.length : 0}/50</small>
          </div>
          <div className={styles.inputBox}>
            <small>설명<span>*</span></small>
            <input placeholder="설명을 입력해주세요." onChange={handleDescChange} value={roleDescription}/>
            <small className={styles.letter}>{roleDescription ? roleDescription.length : 0}/100</small>
          </div>
          <small className={styles.authTop}>권한</small>
          <div className={styles.auths}>
            <span>팀 관련 설정 편집</span>
            <ToggleButton on={teamSettings} setOn={setTeamSettings}/>
          </div>
          <div className={styles.auths}>
            <span>공지 작성</span>
            <ToggleButton on={announcement} setOn={setAnnouncement}/>
          </div>
          <div className={styles.auths}>
            <span>회의록 편집</span>
            <ToggleButton on={meetingNote} setOn={setMeetingNote}/>
          </div>
          <div className={styles.auths}>
            <span>일정 편집</span>
            <ToggleButton on={schedule} setOn={setSchedule}/>
          </div>
          <button className={styles.create}>{roleMode}</button>
        </div>
      </div>
    </>
  );
}

