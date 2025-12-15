import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./minutesCreate.module.css";
import axiosInstance from "../../axiosInstance";
import Header from "../../components/Header";
import SideBar from "../../components/ProjectSideBar";
import MemberSideBar from "../../components/MemberSideBar";
import NotFound from "../notFound";

export default function MinutesCreate() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // teamId가 유효한 숫자가 아니거나 권한이 없으면 NotFound
  if (!teamId || !/^\d+$/.test(teamId) || notFound) {
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

  const toastOptions = (time) => ({
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "light",
  });

  const handleSave = async () => {
    if (!title.trim()) {
      toast.info("제목을 입력해주세요", toastOptions(1000));
      return;
    }
    if (!content.trim()) {
      toast.info("내용을 입력해주세요", toastOptions(1000));
      return;
    }

    setSaving(true);

    try {
      // 1️⃣ 페이지 생성
      const pageRes = await axiosInstance.post(`/teams/${teamId}/pages`, {
        title,
      });
      const pageId = pageRes.data.pageId; // 서버에서 반환되는 pageId 확인

      console.log("📌 Page created:", pageId);

      // 2️⃣ 블록 생성
      const blockRes = await axiosInstance.post(`/pages/${pageId}/blocks`, {
        content: content,
        type: "text",
        orderIndex: 0,
      });

      console.log("📌 Block created:", blockRes.data);

      toast.success("회의록이 저장되었습니다!", toastOptions(1500));

      // 저장 후 목록 페이지 이동
      navigate(`/${teamId}/minutes`);
    } catch (error) {
      console.error("회의록 저장 오류:", error);

      const errorMsg =
        error.response?.data?.message || "회의록 저장 중 오류가 발생했습니다";
      toast.error(errorMsg, toastOptions(1500));
      // 업로드한 이미지 파일 포함
      const coverImageUrl = "/mnt/data/스크린샷 2025-11-26 오전 7.28.09.png";

      const toastcode = (time) => ({
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
      });

      const handleSave = async () => {
        if (!title.trim()) {
          toast.info("제목을 입력해주세요", toastcode(1000));
          return;
        }

        if (!content.trim()) {
          toast.info("내용을 입력해주세요", toastcode(1000));
          return;
        }

        setSaving(true);

        const body = {
          title,
          content,
          coverImageUrl,
        };

        try {
          // POST /teams/:teamId/minutes
          const response = await axiosInstance.post(
            `/teams/${teamId}/pages`,
            body
          );

          toast.success("회의록이 저장되었습니다!", toastcode(1500));
          toast.clearWaitingQueue();

          // 저장 성공 → 목록으로 이동
          navigate(`/${teamId}/minutes`);
        } catch (error) {
          if (error.response?.data?.message) {
            toast.error(error.response.data.message, toastcode(1500));
          } else {
            toast.error("회의록 저장 중 오류가 발생했습니다", toastcode(1500));
          }
          toast.clearWaitingQueue();
        } finally {
          setSaving(false);
        }
      };
    }
  };
  return (
    <>
      <Header />
      <SideBar />
      <div className={styles.pageWrapper}>
        <div className={styles.editorCard}>
          {/* 제목 입력 */}
          <input
            className={styles.titleInput}
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
          />

          {/* 내용 입력 */}

          <textarea
            className={styles.contentInput}
            placeholder="내용을 작성하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={saving}
          />

          {/* 버튼 */}

          <div className={styles.buttonArea}>
            <button
              className={styles.cancelBtn}
              onClick={() => navigate(`/${teamId}/minutes`)}
              disabled={saving}
            >
              취소
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "저장 중..." : "저장"}
            </button>
          </div>
        </div>
      </div>
      <MemberSideBar />
    </>
  );
}
