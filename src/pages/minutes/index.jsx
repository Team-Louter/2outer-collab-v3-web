import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import Header from "../../components/Header";
import SideBar from "../../components/ProjectSideBar";
import MemberSideBar from "../../components/MemberSideBar";
import NotFound from "../notFound";

import styles from "./minutes.module.css";

import minutesIcon from "../../assets/minutes/minutes_icon.svg";
import plus from "../../assets/minutes/plus.svg";

function Minutes() {
  const { teamId } = useParams();
  const [minutes, setMinutes] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // teamId가 유효한 숫자가 아니거나 권한이 없으면 NotFound
  if (!teamId || !/^\d+$/.test(teamId) || notFound) {
    return <NotFound />;
  }

  // 회의록 목록 불러오기
  const fetchMinutes = async () => {
    try {
      const response = await axiosInstance.get(`/teams/${teamId}/pages`);
      console.log("📌 서버 응답 minutes:", response.data);
      setMinutes(response.data);
    } catch (err) {
      console.error("회의록 불러오기 실패:", err);
      if (err.response?.status === 404 || err.response?.status === 400 || err.response?.status === 403) {
        setNotFound(true);
      }
    }
  };

  // 현재 사용자가 팀 멤버인지 확인
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

  useEffect(() => {
    if (teamId) {
      checkMembership();
      fetchMinutes();
    }
  }, [teamId]);

  // 회의록 클릭 → 상세 페이지 이동
  const moveToDetailPage = (minute) => {
    const pageId = minute.id ?? minute.pageId ?? minute.minutesId;
    if (!pageId) return;
    navigate(`/${teamId}/minutes/${pageId}`);
  };

  // + 버튼 클릭 시 새 생성 페이지로 이동
  const handleNavigateCreatePage = () => {
    navigate(`/${teamId}/minutes/create`);
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className={styles.background}>
        <div className={styles["top-bar"]}></div>
        <div className={styles.bottom}>
          <div className={styles["left-side-bar"]}></div>
          <div className={styles.main}>
            <div className={styles["top-container"]}>
              <div className={styles["top-container-wrapper"]}>
                <div className={styles["top-container-wrapper-left"]}>
                  <img src={minutesIcon} alt="Minutes Icon" />
                  <div className={styles["top-container-title"]}>회의록</div>
                </div>
                <div className={styles["top-container-wrapper-right"]}>
                  <button
                    className={styles["plus-button"]}
                    onClick={handleNavigateCreatePage}
                  >
                    <img src={plus} alt="Add Minutes" />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles["middle-container"]}>
              <div className={styles["middle-container-wrapper"]}>
                {minutes.map((minute) => {
                  const pageId = minute.id ?? minute.pageId ?? minute.minutesId;
                  return (
                    <div
                      key={pageId}
                      className={styles["minutes-item"]}
                      onClick={() => moveToDetailPage(minute)}
                    >
                      <div className={styles["minutes-box"]}>
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
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles["right-side-bar"]}></div>
        </div>
      </div>
      <MemberSideBar />
    </>
  );
}

export default Minutes;
//</>
