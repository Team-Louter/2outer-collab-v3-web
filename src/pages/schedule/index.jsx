import { useEffect, useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns';
import CalendarContent from '../../components/calendarContent';
import CalendarHeader from '../../components/calendarHeader';
import CalendarModal from '../../components/calendarModal';
import styles from './schedule.module.css';
import axios from 'axios';

export default function Schedule() {
    const [current, setCurrent] = useState(new Date());
    const startDate = startOfMonth(current);
    const endDate = endOfMonth(current);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [schedules, setSchedules] = useState([]);
    console.log(modalShow)

    if (modalShow === true) {
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        axios.get("http://localhost:5174/schedules")
            .then(res => {
                setSchedules(res.data);
            })
            .catch(err => {
                console.error("데이터 가져오기 실패 :", err);
            });
    }, []);
    console.log('schedules :', schedules);

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
                        setModalMode={setModalMode}
                    />
                    {modalShow && <CalendarModal 
                        schedules={schedules}
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        selectedDate={selectedDate}
                        modalMode={modalMode}
                        setSchedules={setSchedules}
                    />}
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>
        </>
    )
}