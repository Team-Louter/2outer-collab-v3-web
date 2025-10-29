import { useRef, useState } from 'react';
import { format } from 'date-fns';
import styles from './calendarModal.module.css';
import axios from 'axios';
import closeModal from '../../assets/closeModal.svg';

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
        axios.post("http://localhost:5173/schedules", {
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
        axios.delete(`http://localhost:5173/schedules/${clickedSchedule.id}`)
        setSchedules(prev => prev.filter(item => item.id !== clickedSchedule.id))
        setModalShow(!modalShow)
    }

    const colors = ['lightgrey', 'pink', 'gold', 'lightgreen', 'lightblue'];

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <div className={styles.modalTitle}>
                        <img src={closeModal} onClick={() => setModalShow(!modalShow)} />
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
