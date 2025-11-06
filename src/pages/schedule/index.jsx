import { useEffect, useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns';
import CalendarContent from '../../components/CalendarContent';
import CalendarHeader from '../../components/CalendarHeader';
import CalendarModal from '../../components/CalendarModal';
import styles from './schedule.module.css';
import axiosInstance from "../../axiosInstance";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Schedule() {
    const [current, setCurrent] = useState(new Date());
    const startDate = startOfMonth(current);
    const endDate = endOfMonth(current);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [clickedSchedule, setClickedSchedule] = useState(null);
    const { teamId } = useParams();
    console.log(teamId)

    if (modalShow === true) {
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        const token = "토큰값";
    
        axiosInstance.get(`/team/${teamId}/schedule`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                setSchedules(res.data);
            })
            .catch(err => {
                console.error("데이터 가져오기 실패 :", err);
            });
    }, []);    
    console.log('schedules :', schedules);
    console.log('selectedDate: ', selectedDate)

    return(
        <>
            <div className={`${styles.topbar} topbar`}>탑바</div>
            <div className={`${styles.leftSidebar} leftSidebar`}>왼 사이드</div>
            <main>
                <div className={styles.calendar}>
                    <CalendarHeader current={current} setCurrent={setCurrent}/>
                    <CalendarContent 
                        schedules={schedules}
                        startDate={startDate} 
                        endDate={endDate} 
                        current={current} 
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        setModalMode={setModalMode}
                        setClickedSchedule={setClickedSchedule}
                    />
                    {modalShow && <CalendarModal 
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        selectedDate={selectedDate}
                        modalMode={modalMode}
                        setSchedules={setSchedules}
                        clickedSchedule={clickedSchedule}
                    />}
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>
        </>
    )
}
                            