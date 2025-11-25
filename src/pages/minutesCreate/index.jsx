import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./minutesCreate.module.css";

export default function MinutesCreate() {
  const { teamId, minuteId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleSave = () => {
    if (!title.trim() || !detail.trim()) {
      alert("회의 날짜와 내용을 모두 입력해주세요.");
      return;
    }

    // TODO: API 호출 후 저장 가능
    // 예: fetch(`/api/teams/${teamId}/minutes`, {...})

    navigate(`/${teamId}/minutes`);
  };

  const handleCancel = () => {
    navigate(`/${teamId}/minutes`);
  };

  return (
    <div className={styles.container}>
      <h2>새 회의록 작성</h2>
      <input
        className={styles.inputField}
        type="text"
        placeholder="회의 날짜 (예: 2025.11.25)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={styles.textareaField}
        placeholder="회의 내용"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <div className={styles.buttonGroup}>
        <button className={styles.saveButton} onClick={handleSave}>
          저장
        </button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
