import { useState } from "react";
import styles from "./minutes.module.css";

function Minutes() {
  const [minutes, setMinutes] = useState([
    {
      id: 1,
      title: "2025.08.20",
      writer: "최현수",
      detail: "프론트엔드 초기 세팅 및 DB 구조 논의",
    },
    {
      id: 2,
      title: "2025.09.01",
      writer: "한승환",
      detail: "API 명세서 작성 및 서버 배포 관련 논의",
    },
  ]);

  const [openIds, setOpenIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDetail, setNewDetail] = useState("");

  const toggleMinutes = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const handleCreateMinutes = () => {
    if (!newTitle.trim() || !newDetail.trim()) {
      alert("회의 날짜와 내용을 모두 입력해주세요.");
      return;
    }

    const newMinutes = {
      id: Date.now(),
      title: newTitle,
      writer: "작성자",
      detail: newDetail,
    };

    setMinutes([newMinutes, ...minutes]);
    setNewTitle("");
    setNewDetail("");
    setModalOpen(false);
  };

  return (
    <div className={styles.background}>
      <div className={styles["top-bar"]}></div>
      <div className={styles.bottom}>
        <div className={styles["left-side-bar"]}></div>
        <div className={styles.main}>
          {/* 상단 타이틀 */}
          <div className={styles["top-container"]}>
            <div className={styles["top-container-wrapper"]}>
              <div className={styles["top-container-wrapper-left"]}>
                {/* 아이콘 */}
                <img
                  src="/Users/hsh/Team-Collab/2outer-collab-v3-web/src/assets/minutes/minutes_icon.svg"
                  alt="Minutes Icon"
                />
                <div className={styles["top-container-title"]}>회의록</div>
              </div>
              <div className={styles["top-container-wrapper-right"]}>
                <button
                  className={styles["plus-button"]}
                  onClick={() => setModalOpen(true)}
                >
                  {/* + 버튼 아이콘 */}
                  <img
                    src="/Users/hsh/Team-Collab/2outer-collab-v3-web/src/assets/minutes/plus.svg"
                    alt="Add Minutes"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 회의록 리스트 */}
          <div className={styles["middle-container"]}>
            <div className={styles["middle-container-wrapper"]}>
              {minutes.map((minute) => {
                const isOpen = openIds.includes(minute.id);
                return (
                  <div key={minute.id} className={styles["minutes-item"]}>
                    <div
                      className={`${styles["minutes-box"]} ${
                        isOpen ? styles.open : ""
                      }`}
                      onClick={() => toggleMinutes(minute.id)}
                    >
                      <div className={styles["minutes-box-left"]}>
                        <div className={styles["minutes-title"]}>
                          {minute.title}
                        </div>
                      </div>
                      <div className={styles["minutes-box-right"]}>
                        <div className={styles["minutes-writer"]}>
                          {minute.writer}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles["minutes-detail"]} ${
                        isOpen ? styles.open : ""
                      }`}
                    >
                      {minute.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles["right-side-bar"]}></div>
      </div>

      {/* 모달 */}
      {modalOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setModalOpen(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal-top"]}>
              <div className={styles["modal-top-wrapper"]}>
                <div className={styles["modal-title"]}>회의록 생성</div>
              </div>
            </div>
            <div className={styles["modal-middle"]}>
              <div className={styles["modal-middle-title"]}>
                <div className={styles["modal-middle-title-top"]}>
                  <div className={styles["minutes-title-box-title"]}>
                    회의 날짜
                  </div>
                  <div className={styles.star}>*</div>
                </div>
                <div className={styles["modal-middle-title-middle"]}>
                  <input
                    className={styles["minutes-title-input"]}
                    placeholder="예: 2025.09.22"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className={styles["modal-middle-title-bottom"]}>
                  <div className={styles["minutes-title-length"]}>
                    {newTitle.length}/20
                  </div>
                </div>
                <div className={styles["modal-bottom-des-top"]}>
                  <div className={styles["minutes-des-box-title"]}>
                    회의 내용
                  </div>
                  <div className={styles.star}>*</div>
                </div>
                <div className={styles["modal-bottom-des-middle"]}>
                  <textarea
                    className={styles["minutes-des-input"]}
                    placeholder="회의 내용을 입력하세요."
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                  />
                </div>
                <div className={styles["modal-bottom-des-bottom"]}>
                  <div className={styles["minutes-des-length"]}>
                    {newDetail.length}/500
                  </div>
                </div>
              </div>
            </div>
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
                  onClick={handleCreateMinutes}
                >
                  생성
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Minutes;
