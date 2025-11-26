import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./minutesDetail.module.css"; // Create CSS 그대로 사용
import axiosInstance from "../../axiosInstance";

export default function MinutesDetail() {
  const { teamId, minuteId } = useParams();
  const navigate = useNavigate();

  const [minuteData, setMinuteData] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const response = await axiosInstance.get(
          `/teams/${teamId}/pages/${minuteId}`
        );
        setMinuteData(response.data);
      } catch (error) {
        console.error("회의록 불러오기 실패:", error);
      }
    }
    fetchDetail();
  }, [teamId, minuteId]);

  if (!minuteData)
    return <div className={styles.pageWrapper}>불러오는 중...</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.editorCard}>
        {/* 제목 */}
        <input
          className={styles.titleInput}
          type="text"
          value={minuteData.title}
          readOnly
        />

        {/* 내용 */}
        <textarea
          className={styles.contentInput}
          value={minuteData.content}
          readOnly
        />

        {/* 뒤로가기 버튼만 */}
        <div className={styles.buttonArea}>
          <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
