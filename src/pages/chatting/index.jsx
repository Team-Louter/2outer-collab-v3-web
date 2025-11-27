import styles from './chatting.module.css';
import Header from '../../components/Header';
import ProjectSideBar from '../../components/ProjectSideBar';
import MemberSideBar from '../../components/MemberSideBar';

export default function Chatting() {
  return (
    <>
      <Header />
      <ProjectSideBar />
      <div className={styles.container}>
        {/* 채팅 영역 */}
        <div className={styles.chatArea}>
          {/* 예시 채팅 메시지 */}
          <div className={styles.messageList}>
            <div className={styles.message}>
              <div className={styles.userIcon + ' ' + styles.user1}></div>
              <div className={styles.messageBox}>내가 왕이니까 내 말을 들어야해</div>
            </div>
          </div>
          <div className={styles.inputArea}>
            <input className={styles.input} placeholder="메시지를 작성해주세요" />
            <button className={styles.sendBtn}>보내기</button>
          </div>
        </div>
      </div>
      <MemberSideBar />
    </>
  );
}
