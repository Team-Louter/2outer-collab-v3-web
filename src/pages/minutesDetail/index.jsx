import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./minutesDetail.module.css";
import axiosInstance from "../../axiosInstance";
import Header from "../../components/Header";
import SideBar from "../../components/ProjectSideBar";
import MemberSideBar from "../../components/MemberSideBar";
import NotFound from "../notFound";

export default function MinutesDetail() {
  const { teamId, minuteId } = useParams();
  const navigate = useNavigate();
  const [minuteData, setMinuteData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  // teamId와 minuteId가 유효한 숫자가 아니거나 권한이 없으면 NotFound
  if (!teamId || !/^\d+$/.test(teamId) || !minuteId || !/^\d+$/.test(minuteId) || notFound) {
    return <NotFound />;
  }

  // 현재 사용자가 팀 멤버인지 확인
  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await axiosInstance.get(`/teams/${teamId}/members`);
        const currentUserId = Number(localStorage.getItem("userId"));
        const isMember = res.data.some(member => member.userId === currentUserId);
        if (!isMember) {
          console.log("현재 사용자가 팀 멤버가 아닙니다");
          setNotFound(true);
        }
      } catch (err) {
        console.error("멤버 확인 실패:", err);
        if (err.response?.status === 404 || err.response?.status === 400 || err.response?.status === 403) {
          setNotFound(true);
        }
      }
    };
    checkMembership();
  }, [teamId]);

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
