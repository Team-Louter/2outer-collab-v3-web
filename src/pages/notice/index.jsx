import { useState } from "react";
import styles from "./notice.module.css";

const Activity = () => {
  // 공지사항 데이터
  const notices = [
    {
      id: 1,
      type: "[공지]",
      title: "테스트 공지사항입니다.",
      date: "2025-07-08",
      user: "최헌수",
      detail:
        "안녕하세요, Team-Collab 운영팀입니다. 서비스 안정화를 위한 정기 점검이 예정되어 있으며, 점검 시간 동안 일부 기능 이용이 제한될 수 있으니 참고 부탁드립니다.",
    },
    {
      id: 2,
      type: "[안내]",
      title: "새로운 기능이 추가되었습니다!",
      date: "2025-08-10",
      user: "운영팀",
      detail:
        "이번 업데이트로 알림 기능이 개선되고, UI가 일부 변경되었습니다. 자세한 내용은 공지사항 페이지를 확인해주세요.",
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
                  <svg
                    className={styles["notice-icon"]}
                    width="29"
                    height="27"
                    viewBox="0 0 29 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.4284 3.20438V7.82673C24.9872 7.82673 25.5405 7.93679 26.0567 8.15062C26.573 8.36445 27.042 8.67787 27.4371 9.07299C27.8323 9.4681 28.1457 9.93717 28.3595 10.4534C28.5733 10.9696 28.6834 11.523 28.6834 12.0817C28.6834 12.6405 28.5733 13.1938 28.3595 13.71C28.1457 14.2263 27.8323 14.6954 27.4371 15.0905C27.042 15.4856 26.573 15.799 26.0567 16.0128C25.5405 16.2267 24.9872 16.3367 24.4284 16.3367V20.5917C24.4284 22.9291 21.7605 24.2638 19.8897 22.8611L16.968 20.6683C15.4061 19.4974 13.5877 18.7155 11.6634 18.3876V22.4214C11.6636 23.3486 11.3285 24.2446 10.7201 24.9443C10.1116 25.644 9.27074 26.1001 8.35247 26.2286C7.43419 26.3571 6.50041 26.1494 5.72325 25.6436C4.94609 25.1379 4.37795 24.3683 4.12354 23.4766L1.89676 15.6815C1.09542 14.7351 0.57393 13.584 0.390894 12.3576C0.207858 11.1312 0.370536 9.87797 0.860643 8.73891C1.35075 7.59985 2.14885 6.62007 3.16524 5.9097C4.18163 5.19934 5.37602 4.78655 6.61413 4.71774L10.8947 4.47946C12.989 4.36313 15.0259 3.75111 16.8375 2.69378L20.1621 0.7535C22.0541 -0.348545 24.4284 1.01447 24.4284 3.20438ZM5.47096 17.8657L6.851 22.698C6.91741 22.9319 7.06622 23.1338 7.26993 23.2666C7.47365 23.3993 7.71852 23.4539 7.95932 23.4202C8.20013 23.3865 8.4206 23.2668 8.58004 23.0832C8.73947 22.8996 8.8271 22.6645 8.82673 22.4214V18.1522L6.61413 18.0288C6.22927 18.0056 5.84695 17.951 5.47096 17.8657ZM21.5917 3.20438L18.2657 5.14608C16.246 6.32573 13.9924 7.04898 11.6634 7.26507V15.5183C14.198 15.8673 16.6105 16.8558 18.67 18.399L21.5917 20.5917V3.20438ZM8.82673 7.43527L6.77015 7.54873C5.81341 7.60156 4.91123 8.01114 4.24171 8.69662C3.57219 9.3821 3.18397 10.2937 3.15369 11.2514C3.12341 12.2091 3.45327 13.1434 4.07815 13.8698C4.70304 14.5962 5.57754 15.062 6.52903 15.1751L6.77015 15.1964L8.82673 15.3099V7.43527ZM24.4284 10.6634V13.5001C24.7899 13.4997 25.1376 13.3612 25.4005 13.1131C25.6633 12.8649 25.8215 12.5257 25.8427 12.1648C25.8639 11.804 25.7465 11.4486 25.5145 11.1714C25.2824 10.8942 24.9533 10.716 24.5943 10.6733L24.4284 10.6634Z"
                      fill="#181F29"
                    />
                  </svg>

                  <div className={styles["top-container-title"]}>공지사항</div>
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

            {/* 공지사항 리스트 */}
            <div className={styles["middle-container"]}>
              <div className={styles["middle-container-wrapper"]}>
                {notices.map((notice) => {
                  const isOpen = openIds.includes(notice.id);
                  return (
                    <div key={notice.id} className={styles["notice-item"]}>
                      {/* 공지 박스 */}
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
                  <div className={styles["modal-title"]}>공지 생성</div>
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

export default Notice;
