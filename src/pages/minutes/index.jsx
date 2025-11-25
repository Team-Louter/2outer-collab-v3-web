import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./minutes.module.css";

import minutesIcon from "../../assets/minutes/minutes_icon.svg";
import plus from "../../assets/minutes/plus.svg";

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

  const navigate = useNavigate();
  const location = useLocation();

  const toggleMinutes = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  // + 버튼 클릭 시 새 생성 페이지로 이동
  const handleNavigateCreatePage = () => {
    const newId = Date.now(); // 새 회의록 ID 생성
    navigate(`${location.pathname}/${newId}`);
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
                <img src={minutesIcon} alt="Minutes Icon" />
                <div className={styles["top-container-title"]}>회의록</div>
              </div>
              <div className={styles["top-container-wrapper-right"]}>
                <button
                  className={styles["plus-button"]}
                  onClick={handleNavigateCreatePage} // ⬅ 여기서 이동
                >
                  <img src={plus} alt="Add Minutes" />
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
    </div>
  );
}

export default Minutes;
