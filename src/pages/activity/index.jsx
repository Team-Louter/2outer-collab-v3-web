import { useState } from "react";
import styles from "./activity.module.css";

// 이미지 import
import activity from "../../assets/activity/activity-icon.svg";
const Activity = () => {
  // 활동 리포트 데이터
  const notices = [
    {
      id: 1,
      title: "첫 번째 활동 리포트",
      date: "2025-07-08",
      user: "최헌수",
      detail: "활동 리포트에 대한 설명입니다.",
    },
    {
      id: 2,
      title: "테스트 활동 리포트",
      date: "2025-08-10",
      user: "운영팀",
      detail: "테스트ㅡㅡㅡㅡㅡㅡㅡ",
    },
  ];

  // 열림 상태 (여러 개 가능)
  const [openIds, setOpenIds] = useState([]);

  // 모달 열림 상태
  const [modalOpen, setModalOpen] = useState(false);

  const toggleNotice = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles["top-bar"]}></div>
        <div className={styles.bottom}>
          <div className={styles["left-side-bar"]}></div>
          <div className={styles.main}>
            {/* 상단 타이틀 */}
            <div className={styles["top-container"]}>
              <div className={styles["top-container-wrapper"]}>
                <div className={styles["top-container-wrapper-left"]}>
                  <img className={styles["act-icon"]} src={activity} alt="활동 리포트 아이콘" />

                  <div className={styles["top-container-title"]}>
                    활동 리포트
                  </div>
                </div>
                <div className={styles["top-container-wrapper-right"]}>
                  <button
                    className={styles["plus-button"]}
                    onClick={() => setModalOpen(true)}
                  >
                    <svg
                      className={styles["plus-button"]}
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.625 13.5H21.375M13.5 5.625V21.375"
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

            {/* 활동 리포트 리스트 */}
            <div className={styles["middle-container"]}>
              <div className={styles["middle-container-wrapper"]}>
                {notices.map((notice) => {
                  const isOpen = openIds.includes(notice.id);
                  return (
                    <div key={notice.id} className={styles["notice-item"]}>
                      {/* 활동 리포트 박스 */}
                      <div
                        className={`${styles["notice-box"]} ${
                          isOpen ? styles.open : ""
                        }`}
                        onClick={() => toggleNotice(notice.id)}
                      >
                        <div className={styles["notice-box-left"]}>
                          <div className={styles["notice-type"]}>
                            {notice.type}
                          </div>
                          <div className={styles["notice-title"]}>
                            {notice.title}
                          </div>
                        </div>
                        <div className={styles["notice-box-right"]}>
                          <div className={styles["notice-date"]}>
                            {notice.date}
                          </div>
                          <p>·</p>
                          <div className={styles["notice-user"]}>
                            {notice.user}
                          </div>
                        </div>
                      </div>

                      {/* 펼쳐지는 상세내용 */}
                      <div
                        className={`${styles["notice-detail"]} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        {notice.detail}
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
          <div className={styles["modal-overlay"]}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles["modal-top"]}>
                <div className={styles["modal-top-wrapper"]}>
                  <div className={styles["modal-title"]}>활동 리포트 생성</div>
                </div>
              </div>
              <div className={styles["modal-middle"]}>
                <div className={styles["modal-middle-title"]}>
                  <div className={styles["modal-middle-title-top"]}>
                    <div className={styles["notice-title-box-title"]}>제목</div>
                    <div className={styles.star}>*</div>
                  </div>
                  <div className={styles["modal-middle-title-middle"]}>
                    <input
                      className={styles["notice-title-input"]}
                      placeholder="제목을 입력하세요."
                    />
                  </div>
                  <div className={styles["modal-middle-title-bottom"]}>
                    <div className={styles["notice-title-length"]}>0/50</div>
                  </div>
                  <div className={styles["modal-bottom-des-top"]}>
                    <div className={styles["notice-des-box-title"]}>내용</div>
                    <div className={styles.star}>*</div>
                  </div>
                  <div className={styles["modal-bottom-des-middle"]}>
                    <textarea
                      className={styles["notice-des-input"]}
                      placeholder="제목을 입력하세요."
                    ></textarea>
                  </div>
                  <div className={styles["modal-bottom-des-bottom"]}>
                    <div className={styles["notice-des-length"]}>0/250</div>
                  </div>
                </div>
                <div className={styles["modal-bottom-title"]}></div>
              </div>
              <div className={styles["modal-bottom"]}>
                <div className={styles["modal-button-wrapper"]}>
                  <button
                    className={styles["cancel-button"]}
                    onClick={() => setModalOpen(false)}
                  >
                    취소
                  </button>
                  <button className={styles["create-button"]}>생성</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Activity;
