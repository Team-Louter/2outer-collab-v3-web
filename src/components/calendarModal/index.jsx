import { useRef, useState } from 'react';
import { format } from 'date-fns';
import styles from './calendarModal.module.css';
import axios from 'axios';

export default function CalendarModal({ modalShow, setModalShow, selectedDate, modalMode, setSchedules, clickedSchedule }) {
    const titleRef = useRef("");
    const contentRef = useRef("");
    const [highlight, setHighlight] = useState('lightgrey');

    const handleTitleText = (e) => {
        setTitleTextLength(e.target.value.length);
    }

    const handleDetailText = (e) => {
        setDetailTextLength(e.target.value.length);
    }

    const [titleTextLength, setTitleTextLength] = useState(() => modalMode === '편집' ? clickedSchedule.title.length : 0);
    const [detailTextLength, setDetailTextLength] = useState(() => modalMode === '편집' ? clickedSchedule.content.length : 0);

    const scheduleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5174/schedules", {
            date: selectedDate,
            title: titleRef.current.value,
            content: contentRef.current.value,
            color: highlight
        })
        .then(res => {
            console.log('추가 성공', res.data);
            setSchedules(prev => [...prev, res.data])
            setModalShow(!modalShow);
        })
        .catch(err => console.error("추가 실패", err));

        if (modalMode === '편집') {
            scheduleDelete()
        }
    };

    const scheduleDelete = () => {
        axios.delete(`http://localhost:5174/schedules/${clickedSchedule.id}`)
        setSchedules(prev => prev.filter(item => item.id !== clickedSchedule.id))
        setModalShow(!modalShow)
    }

    const colors = ['lightgrey', 'pink', 'gold', 'lightgreen', 'lightblue'];

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <div className={styles.modalTitle}>
                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setModalShow(!modalShow)}>
                            <path d="M15.9752 15.4959L23.2983 8.17005C23.4275 8.04029 23.5 7.86466 23.4999 7.68161C23.4997 7.49856 23.427 7.32302 23.2977 7.19344C23.0387 6.93595 22.5827 6.93465 22.3211 7.19474L15 14.5206L7.67629 7.19279C7.41605 6.93595 6.95998 6.93725 6.70105 7.19409C6.63678 7.25806 6.5859 7.33419 6.55138 7.41803C6.51687 7.50187 6.49941 7.59174 6.50002 7.68239C6.50002 7.86705 6.57158 8.04001 6.70105 8.1681L14.0241 15.4953L6.7017 22.8231C6.57248 22.9531 6.50012 23.129 6.50048 23.3122C6.50085 23.4954 6.57392 23.6709 6.70365 23.8004C6.82922 23.9246 7.00683 23.9961 7.19029 23.9961H7.1942C7.37832 23.9954 7.55593 23.9233 7.67889 23.7978L15 16.4719L22.3237 23.7997C22.4532 23.9285 22.6263 24 22.8097 24C22.9004 24.0001 22.9902 23.9823 23.074 23.9477C23.1578 23.913 23.2339 23.8622 23.298 23.7981C23.3621 23.7341 23.413 23.658 23.4476 23.5742C23.4823 23.4905 23.5001 23.4007 23.5 23.3101C23.5 23.1261 23.4284 22.9525 23.2983 22.8244L15.9752 15.4959Z" fill="#181F29"/>
                        </svg>
                        <h3>{format(selectedDate, 'MM월 dd일')} 일정 {modalMode}</h3>
                    </div>
                    <form onSubmit={scheduleSubmit}>
                        <div className={styles.inputArea} style={{marginTop:'20px'}}>
                            <label>제목 <span style={{color: 'red'}}>*</span></label>
                            <input type='text' placeholder='제목을 입력하세요.' required maxLength="50" onChange={handleTitleText} defaultValue={clickedSchedule && modalMode == '편집' ? clickedSchedule.title : ""} ref={titleRef}/>
                            <small>{titleTextLength}/50</small>
                        </div>
                        <div className={styles.inputArea}>
                            <label>내용</label>
                            <textarea placeholder='내용을 입력하세요.' maxLength="250" onChange={handleDetailText} defaultValue={clickedSchedule && modalMode == '편집' ? clickedSchedule.content : ""} ref={contentRef}/>
                            <small>{detailTextLength}/250</small>
                        </div>
                        <div className={styles.palette}>
                            <small>색상</small>
                            {colors.map(color => (
                                <div style={{backgroundColor: color, border: highlight === color ? "1px solid black" : "0px solid black"}} onClick={() => setHighlight(color)}></div>
                            ))}
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.delete} type='button' onClick={scheduleDelete}>삭제</button>
                            <button className={styles.create} type='submit'>{modalMode === '생성' ? "생성" : "저장"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
