import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./notice.module.css";
import axiosInstance from "../../axiosInstance";

import Header from "../../components/Header";
import SideBar from "../../components/ProjectSideBar";
import MemberSideBar from "../../components/MemberSideBar";
import plus from "../../assets/minutes/plus.svg";

export default function Notice() {
  const { teamId } = useParams();

  const [notices, setNotices] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ----------------------------------------
  // GET /notices
  // ----------------------------------------
  const fetchNotices = async () => {
    try {
      const res = await axiosInstance.get("/notices");

      setNotices(
        res.data.map((n) => ({
          id: n.noticeId,
          title: n.title,
          detail: n.content,
          date: n.createdAt?.split("T")[0] ?? "",
          user: "운영팀",
        }))
      );
    } catch (err) {
      console.error("공지사항 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // ----------------------------------------
  // POST /notices
  // ----------------------------------------
  const createNotice = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      await axiosInstance.post("/notices", {
        title,
        content,
      });

      setModalOpen(false);
      setTitle("");
      setContent("");

      fetchNotices();
    } catch (err) {
      console.error("공지 생성 실패:", err);
    }
  };

  const toggleNotice = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Header />
      <SideBar />

      <div className={styles.background}>
        {/* 상단 바 */}
        <div className={styles["top-bar"]}></div>

        <div className={styles.bottom}>
          {/* 왼쪽 사이드바 */}
          <div className={styles["left-side-bar"]}></div>

          {/* 메인 영역 */}
          <div className={styles.main}>
            {/* 상단 컨테이너 */}
            <div className={styles["top-container"]}>
              <div className={styles["top-container-wrapper"]}>
                <div className={styles["top-container-wrapper-left"]}>
                  <div className={styles["top-container-title"]}>공지사항</div>
                </div>

                <div className={styles["top-container-wrapper-right"]}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className={styles["plus-button"]}
                  >
                    <img
                      className={styles["plus-button"]}
                      src={plus}
                      alt="플러스 아이콘"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 공지 목록 */}
            <div className={styles["middle-container"]}>
              <div className={styles["middle-container-wrapper"]}>
                {notices.map((n) => {
                  const isOpen = openIds.includes(n.id);
                  return (
                    <div key={n.id} className={styles["notice-item"]}>
                      <div
                        className={`${styles["notice-box"]} ${
                          isOpen ? styles.open : ""
                        }`}
                        onClick={() => toggleNotice(n.id)}
                      >
                        <div className={styles["notice-box-left"]}>
                          <div className={styles["notice-type"]}>[공지]</div>
                          <div className={styles["notice-title"]}>
                            {n.title}
                          </div>
                        </div>

                        <div className={styles["notice-box-right"]}>
                          <div className={styles["notice-date"]}>{n.date}</div>
                          <p>·</p>
                          <div className={styles["notice-user"]}>{n.user}</div>
                        </div>
                      </div>

                      <div
                        className={`${styles["notice-detail"]} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        {n.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <div className={styles["right-side-bar"]}></div>
        </div>

        {/* 공지 생성 모달 */}
        {modalOpen && (
          <div
            className={styles["modal-overlay"]}
            onClick={() => setModalOpen(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              {/* 모달 상단 */}
              <div className={styles["modal-top"]}>
                <div className={styles["modal-title"]}>공지 생성</div>
              </div>

              {/* 모달 내용: CSS 파일에 정의된 구조에 맞게 변경 */}
              <div className={styles["modal-middle-title"]}>
                {/* 제목 섹션 */}
                <div className={styles["modal-middle-title-top"]}>
                  <label className={styles["modal-label"]}>
                    제목 <span className={styles.star}>*</span>
                  </label>
                </div>
                <div className={styles["modal-middle-title-middle"]}>
                  <input
                    className={styles["notice-title-input"]}
                    placeholder="제목을 입력하세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className={styles["modal-middle-title-bottom"]}>
                  {/* CSS에 있는 클래스 유지 */}
                </div>

                {/* 내용 섹션 */}
                <div className={styles["modal-bottom-des-top"]}>
                  <label className={styles["modal-label"]}>
                    내용 <span className={styles.star}>*</span>
                  </label>
                </div>
                <div className={styles["modal-bottom-des-middle"]}>
                  <textarea
                    className={styles["notice-des-input"]}
                    placeholder="내용을 입력하세요."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className={styles["modal-bottom-des-bottom"]}>
                  {/* CSS에 있는 클래스 유지 */}
                </div>
              </div>

              {/* 모달 버튼 */}
              <div className={styles["modal-bottom"]}>
                <div className={styles["modal-button-wrapper"]}>
                  <button
                    className={styles["cancel-button"]}
                    onClick={() => setModalOpen(false)}
                  >
                    취소
                  </button>
                  <button
                    className={styles["create-button"]}
                    onClick={createNotice}
                  >
                    생성
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MemberSideBar />
    </>
  );
}
