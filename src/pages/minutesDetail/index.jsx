import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./minutesDetail.module.css";
import axiosInstance from "../../axiosInstance";
import Header from "../../components/Header";
import SideBar from "../../components/ProjectSideBar";
import MemberSideBar from "../../components/MemberSideBar";

export default function MinutesDetail() {
  const { teamId, minuteId } = useParams();
  const navigate = useNavigate();

  const [minuteData, setMinuteData] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await axiosInstance.get(
          `/teams/${teamId}/pages/${minuteId}`
        );

        console.log("📌 detail response:", res.data); // 반드시 확인

        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        setMinuteData({
          title: data.title,
          content:
            data.content ??
            data.body ??
            data.blocks?.[0]?.content ??
            data.blockList?.[0]?.value ??
            "",
        });
      } catch (error) {
        console.error("회의록 불러오기 실패:", error);
      }
    }

    fetchDetail();
  }, [teamId, minuteId]);

  if (!minuteData)
    return <div className={styles.pageWrapper}>불러오는 중...</div>;

  return (
    <>
      <Header />
      <SideBar />
      <div className={styles.pageWrapper}>
        <div className={styles.editorCard}>
          <input
            className={styles.titleInput}
            type="text"
            value={minuteData.title}
            readOnly
          />

          <textarea
            className={styles.contentInput}
            value={minuteData.blocks?.[0]?.content || ""}
            readOnly
          />

          <div className={styles.buttonArea}>
            <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
              뒤로가기
            </button>
          </div>
        </div>
      </div>
      <MemberSideBar />
    </>
  );
}
