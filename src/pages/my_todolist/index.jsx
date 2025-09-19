import { useState } from "react";
import "./App.css";

function Todolist() {
  // 기본 할 일
  const [tasks, setTasks] = useState([
    { id: 1, text: "디자인 완료하기", done: false },
    { id: 2, text: "UI 구현하기", done: false },
    { id: 3, text: "JavaScript 강의 영상 시청하기", done: false },
  ]);

  // === 모달 상태 ===
  const [modalOpen, setModalOpen] = useState(false); // 추가 모달
  const [taskText, setTaskText] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false); // 편집 모달
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  // 체크박스 토글
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // 삭제
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 할 일 추가
  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setModalOpen(false);
  };

  // === 편집 관련 ===
  const openEditModal = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
    setEditModalOpen(true);
  };

  const saveEditedTask = () => {
    if (!editTaskText.trim()) return;
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      )
    );
    setEditModalOpen(false);
    setEditTaskId(null);
    setEditTaskText("");
  };

  return (
    <div className="background">
      <div className="top-bar"></div>
      <div className="bottom">
        <div className="left-side-bar"></div>
        <div className="main">
          {/* 상단 타이틀 */}
          <div className="top-container">
            <div className="top-container-wrapper">
              <div className="top-container-wrapper-left">
                <div className="top-container-title">할 일</div>
              </div>
              <div className="top-container-wrapper-right">
                <button
                  className="plus-button"
                  onClick={() => setModalOpen(true)}
                >
                  <img
                    src="/plus-icon.png"
                    alt="플러스 아이콘"
                    className="icon"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 미완료 */}
          <div className="task-section">
            <div className="task-section-title">미완료</div>
            {tasks
              .filter((t) => !t.done)
              .map((task) => (
                <div key={task.id} className={`task-box`}>
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <div className="task-actions">
                    <button
                      className="task-btn"
                      onClick={() => openEditModal(task)}
                    >
                      <img
                        src="/public/edit.png"
                        alt="편집 아이콘"
                        className="icon"
                      />
                    </button>
                    <button
                      className="task-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <img
                        src="/public/delete.png"
                        alt="삭제 아이콘"
                        className="icon"
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* 완료 */}
          <div className="task-section">
            <div className="task-section-title">완료</div>
            {tasks
              .filter((t) => t.done)
              .map((task) => (
                <div key={task.id} className={`task-box done`}>
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <div className="task-actions">
                    <button
                      className="task-btn"
                      onClick={() => openEditModal(task)}
                    >
                      <img
                        src="/public/edit.png"
                        alt="편집 아이콘"
                        className="icon"
                      />
                    </button>
                    <button
                      className="task-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <img
                        src="/public/delete.png"
                        alt="삭제 아이콘"
                        className="icon"
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="right-side-bar"></div>
      </div>

      {/* 추가 모달 */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">할 일 생성</div>
              <button
                className="modal-close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <label className="modal-label">
                할 일 <span className="star">*</span>
              </label>
              <input
                type="text"
                className="modal-input"
                placeholder="할 일을 입력해주세요."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                maxLength={50}
              />
              <div className="modal-length">{taskText.length}/50</div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => setModalOpen(false)}
              >
                취소
              </button>
              <button className="create-button" onClick={addTask}>
                생성
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 편집 모달 */}
      {editModalOpen && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">할 일 편집</div>
              <button
                className="modal-close"
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <label className="modal-label">
                할 일 <span className="star">*</span>
              </label>
              <input
                type="text"
                className="modal-input"
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
                maxLength={50}
              />
              <div className="modal-length">{editTaskText.length}/50</div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => setEditModalOpen(false)}
              >
                취소
              </button>
              <button className="create-button" onClick={saveEditedTask}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todolist;
