import { useEffect, useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns';
import CalendarContent from '../../components/CalendarContent';
import CalendarHeader from '../../components/CalendarHeader';
import CalendarModal from '../../components/calendarModal';
import styles from './schedule.module.css';
import axiosInstance from "../../axiosInstance";
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';

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
  
    useEffect(() => {
        document.body.style.overflow = modalShow ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; }
    }, [modalShow]);

    const getSchedules = async () => {
        try {
            const res = await axiosInstance.get(`/team/${teamId}/schedule`);
            setSchedules(res.data.schedules);
        } catch (err) {
            console.error("데이터 가져오기 실패 :", err);
        }
    }

    useEffect(() => {
        getSchedules();
    }, []);

    return(
        <>
            <Header />
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
                        getSchedules={getSchedules}
                    />}
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>
        </>
    )
}
                            