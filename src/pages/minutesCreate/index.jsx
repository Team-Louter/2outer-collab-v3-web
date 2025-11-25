import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./minutesCreate.module.css";

// axiosInstance import
import axiosInstance from "../../axiosInstance";

export default function MinutesCreate() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

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
        `/teams/${teamId}/minutes`,
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.editorCard}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Untitled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={saving}
        />

        <textarea
          className={styles.contentInput}
          placeholder="문서를 작성하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={saving}
        />

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
  );
}
