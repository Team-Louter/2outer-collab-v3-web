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
                <svg
                  width="26"
                  height="34"
                  viewBox="0 0 26 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.120117 4.12039C0.120117 3.26639 0.459366 2.44737 1.06323 1.84351C1.6671 1.23964 2.48612 0.900391 3.34012 0.900391H16.2201C16.6471 0.900482 17.0565 1.07017 17.3584 1.37212L25.4084 9.42212C25.7103 9.72398 25.88 10.1334 25.8801 10.5604V29.8804C25.8801 30.7344 25.5409 31.5534 24.937 32.1573C24.3331 32.7611 23.5141 33.1004 22.6601 33.1004H3.34012C2.48612 33.1004 1.6671 32.7611 1.06323 32.1573C0.459366 31.5534 0.120117 30.7344 0.120117 29.8804V4.12039ZM21.9936 10.5604L16.2201 4.78693V10.5604H21.9936ZM13.0001 4.12039H3.34012V29.8804H22.6601V13.7804H14.6101C14.1831 13.7804 13.7736 13.6108 13.4717 13.3088C13.1697 13.0069 13.0001 12.5974 13.0001 12.1704V4.12039ZM6.56012 18.6104C6.56012 18.1834 6.72974 17.7739 7.03168 17.4719C7.33361 17.17 7.74312 17.0004 8.17012 17.0004H17.8301C18.2571 17.0004 18.6666 17.17 18.9686 17.4719C19.2705 17.7739 19.4401 18.1834 19.4401 18.6104C19.4401 19.0374 19.2705 19.4469 18.9686 19.7488C18.6666 20.0508 18.2571 20.2204 17.8301 20.2204H8.17012C7.74312 20.2204 7.33361 20.0508 7.03168 19.7488C6.72974 19.4469 6.56012 19.0374 6.56012 18.6104ZM6.56012 25.0504C6.56012 24.6234 6.72974 24.2139 7.03168 23.9119C7.33361 23.61 7.74312 23.4404 8.17012 23.4404H17.8301C18.2571 23.4404 18.6666 23.61 18.9686 23.9119C19.2705 24.2139 19.4401 24.6234 19.4401 25.0504C19.4401 25.4774 19.2705 25.8869 18.9686 26.1888C18.6666 26.4908 18.2571 26.6604 17.8301 26.6604H8.17012C7.74312 26.6604 7.33361 26.4908 7.03168 26.1888C6.72974 25.8869 6.56012 25.4774 6.56012 25.0504Z"
                    fill="#181F29"
                  />
                </svg>
                <div className={styles["top-container-title"]}>회의록</div>
              </div>
              <div className={styles["top-container-wrapper-right"]}>
                <button
                  className={styles["plus-button"]}
                  onClick={() => setModalOpen(true)}
                >
                  {/* + 버튼 아이콘 */}
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.625 9.5H17.375M9.5 1.625V17.375"
                      stroke="#181F29"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
