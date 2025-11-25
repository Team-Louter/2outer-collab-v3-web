import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./myTodolist.module.css";
import axiosInstance from "../../axiosInstance"; // axiosInstance 경로 맞춰주세요

export default function MyTodolist() {
  const { userId } = useParams(); // URL에서 userId 가져오기

  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskText, setTaskText] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  // -----------------------------
  // GET /api/:userId/todos
  // -----------------------------
  const fetchTasks = async () => {
    if (!userId) return; // userId 없으면 호출 금지
    try {
      const res = await axiosInstance.get(`/api/todos`);
      setTasks(
        res.data.map((t) => ({
          id: t.todoId,
          text: t.title,
          done: t.done,
        }))
      );
    } catch (e) {
      console.error("할 일 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  // -----------------------------
  // POST /api/:userId/todos
  // -----------------------------
  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      await axiosInstance.post(`/api/todos`, { title: taskText });
      setTaskText("");
      setModalOpen(false);
      fetchTasks();
    } catch (e) {
      console.error("할 일 생성 실패:", e);
    }
  };

  // -----------------------------
  // PUT /api/:userId/todos/:todoId
  // -----------------------------
  const toggleTask = async (id) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    try {
      await axiosInstance.put(`/api/todos/${id}`, {
        title: target.text,
        done: !target.done,
      });
      fetchTasks();
    } catch (e) {
      console.error("업데이트 실패:", e);
    }
  };

  // -----------------------------
  // DELETE /api/:userId/todos/:todoId
  // -----------------------------
  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/api/todos/${id}`);
      fetchTasks();
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  // 편집 모달 표시
  const openEditModal = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
    setEditModalOpen(true);
  };

  // -----------------------------
  // PUT /api/:userId/todos/:todoId - 편집 저장
  // -----------------------------
  const saveEditedTask = async () => {
    if (!editTaskText.trim()) return;
    const target = tasks.find((t) => t.id === editTaskId);
    if (!target) return;

    try {
      await axiosInstance.put(`/api/${userId}/todos/${editTaskId}`, {
        title: editTaskText,
        done: target.done,
      });
      setEditModalOpen(false);
      fetchTasks();
    } catch (e) {
      console.error("편집 실패:", e);
    }
  };
  console.log(styles);

  // ==============================
  // JSX 렌더
  // ==============================
  return (
    <div className={styles["background"]}>
      <div className={styles["top-bar"]}></div>
      <div className={styles["bottom"]}>
        <div className={styles["left-side-bar"]}></div>

        <div className={styles["main"]}>
          <div className={styles["top-container"]}>
            <div className={styles["top-container-wrapper"]}>
              <div className={styles["top-container-wrapper-left"]}>
                <img src="/todolist-icon.svg" alt="todo" />
                <div className={styles["top-container-title"]}>할 일</div>
              </div>
              <div className={styles["top-container-wrapper-right"]}>
                <button
                  className={styles["plus-button"]}
                  onClick={() => setModalOpen(true)}
                >
                  <img src="/plus.svg" className={styles["plus-icon"]} />
                </button>
              </div>
            </div>
          </div>

          {/* 미완료 */}
          <div className={styles["task-section"]}>
            <div className={styles["task-section-title"]}>미완료</div>
            {tasks
              .filter((t) => !t.done)
              .map((task) => (
                <div key={task.id} className={styles["task-box"]}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className={styles["task-checkbox"]}
                  />
                  <span className={styles["task-text"]}>{task.text}</span>
                  <div className={styles["task-actions"]}>
                    <button
                      className={styles["task-btn"]}
                      onClick={() => openEditModal(task)}
                    >
                      <img src="/edit.svg" className={styles["icon"]} />
                    </button>
                    <button
                      className={styles["task-btn"]}
                      onClick={() => deleteTask(task.id)}
                    >
                      <img src="/delete.svg" className={styles["icon"]} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* 완료 */}
          <div className={styles["task-section"]}>
            <div className={styles["task-section-title"]}>완료</div>
            {tasks
              .filter((t) => t.done)
              .map((task) => (
                <div
                  key={task.id}
                  className={`${styles["task-box"]} ${styles["done"]}`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className={styles["task-checkbox"]}
                  />
                  <span className={styles["task-text"]}>{task.text}</span>
                  <div className={styles["task-actions"]}>
                    <button
                      className={styles["task-btn"]}
                      onClick={() => openEditModal(task)}
                    >
                      <img src="/edit.svg" className={styles["icon"]} />
                    </button>
                    <button
                      className={styles["task-btn"]}
                      onClick={() => deleteTask(task.id)}
                    >
                      <img src="/delete.svg" className={styles["icon"]} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles["right-side-bar"]}></div>
      </div>

      {/* === 추가 모달 === */}
      {modalOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setModalOpen(false)}
        >
          <div
            className={`${styles["modal"]} ${styles["small"]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <div className={styles["modal-title"]}>할 일 생성</div>
              <button
                className={styles["modal-close"]}
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles["modal-body"]}>
              <label className={styles["modal-label"]}>
                할 일 <span className={styles["star"]}>*</span>
              </label>
              <input
                type="text"
                className={styles["modal-input"]}
                placeholder="할 일을 입력하세요"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                maxLength={50}
              />
              <div className={styles["modal-length"]}>{taskText.length}/50</div>
            </div>
            <div className={styles["modal-footer"]}>
              <button
                className={styles["cancel-button"]}
                onClick={() => setModalOpen(false)}
              >
                취소
              </button>
              <button className={styles["create-button"]} onClick={addTask}>
                생성
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === 편집 모달 === */}
      {editModalOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className={`${styles["modal"]} ${styles["small"]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <div className={styles["modal-title"]}>할 일 편집</div>
              <button
                className={styles["modal-close"]}
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles["modal-body"]}>
              <label className={styles["modal-label"]}>
                할 일 <span className={styles["star"]}>*</span>
              </label>
              <input
                type="text"
                className={styles["modal-input"]}
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                maxLength={50}
              />
              <div className={styles["modal-length"]}>
                {editTaskText.length}/50
              </div>
            </div>
            <div className={styles["modal-footer"]}>
              <button
                className={styles["cancel-button"]}
                onClick={() => setEditModalOpen(false)}
              >
                취소
              </button>
              <button
                className={styles["create-button"]}
                onClick={saveEditedTask}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
