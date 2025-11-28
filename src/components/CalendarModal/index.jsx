import {  useState } from 'react';
import { format } from 'date-fns';
import styles from './calendarModal.module.css';
import axios from 'axios';
import closeModal from '../../assets/closeModal.svg';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

export default function CalendarModal({ modalShow, setModalShow, selectedDate, modalMode, setSchedules, clickedSchedule, getSchedules }) {
    const getInitialValue = (field, defaultValue) => modalMode === '편집' && clickedSchedule ? clickedSchedule[field] : defaultValue;
    
    const [highlight, setHighlight] = useState(getInitialValue('color', 'LightGrey'));
    const [title, setTitle] = useState(getInitialValue('scheduleTitle', ''));
    const [content, setContent] = useState(getInitialValue('scheduleContent', ''));
    const { teamId } = useParams();
    const userId = localStorage.getItem('userId');
      
    const handleText = (e, mainF, lengthF) => {
        mainF(e.target.value);
        lengthF(e.target.value.length);
    };
      
    const [titleTextLength, setTitleTextLength] = useState(
        (clickedSchedule?.scheduleTitle?.length) || 0
    );
    const [detailTextLength, setDetailTextLength] = useState(
        (clickedSchedule?.scheduleContent?.length) || 0
    );    

    const scheduleSubmit = async (e, scheduleId) => {
        e.preventDefault();

        const data = {
            scheduleTitle : title,
            scheduleContent : content,
            scheduleDate : selectedDate,
            color : highlight
        };

        try {
            let res;
            if (modalMode === '생성') {
                console.log('생성 모드')
                res = await axiosInstance.post(`/team/${teamId}/schedule?userId=${userId}`, data);
                console.log('추가 성공', res.data);
            }
            else if (modalMode === '편집') {
                console.log('편집 모드');
                res = await axiosInstance.put(`/team/${teamId}/schedule/${scheduleId}`, data);
                console.log('수정 성공', res.data);
            }

            setSchedules(prev => [...prev, res.data])
            setModalShow(!modalShow);
            getSchedules();
        }
        catch (err) {
            console.error("❌ 변경 실패:", err.response?.data || err);
        }
    };

    const scheduleDelete = async () => {
        try {
            const res = await axiosInstance.delete(`/team/${teamId}/schedule/${clickedSchedule.scheduleId}`);
            console.log('삭제 성공', res.data);
            setModalShow(false);
            getSchedules();
        } catch (err) {
            console.error("❌ 삭제 실패:", err.response?.data || err);
        }
    };
    

    const colors = ['LightGrey', 'Pink', 'Gold', 'LightGreen', 'LightBlue'];

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <div className={styles.modalTitle}>
                        <img src={closeModal} onClick={() => setModalShow(!modalShow)} />
                        <h3>{format(selectedDate, 'MM월 dd일')} 일정 {modalMode}</h3>
                    </div>
                    <form onSubmit={(e) => scheduleSubmit(e, clickedSchedule?.scheduleId)}>
                        <div className={styles.inputArea} style={{marginTop:'20px'}}>
                            <label>제목 <span style={{color: 'red'}}>*</span></label>
                            <input
                                type="text"
                                placeholder="제목을 입력하세요."
                                required
                                maxLength="50"
                                value={title}
                                onChange={(e) => handleText(e, setTitle, setTitleTextLength)}
                            />
                            <small>{titleTextLength}/50</small>
                        </div>
                        <div className={styles.inputArea}>
                            <label>내용</label>
                            <textarea
                                placeholder="내용을 입력하세요."
                                maxLength="250"
                                value={content}
                                onChange={(e) => handleText(e, setContent, setDetailTextLength)}
                            />
                            <small>{detailTextLength}/250</small>
                        </div>
                        <div className={styles.palette}>
                            <small>색상</small>
                            {colors.map(color => (
                                <div key={color} style={{backgroundColor: color, border: highlight === color ? "1px solid black" : "0px solid black"}} onClick={() => setHighlight(color)}></div>
                            ))}
                        </div>
                        <div className={styles.buttons}>
                            {modalMode === '편집' ? (
                                <button className={styles.delete} type='button' onClick={() => scheduleDelete(clickedSchedule.scheduleId)}>
                                    삭제
                                </button>
                            ) : (
                                <button className={styles.delete} type='button' onClick={() => setModalShow(false)}>
                                    취소
                                </button>
                            )}
                            <button className={styles.create} type='submit'>
                                {modalMode === '생성' ? "생성" : "저장"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
