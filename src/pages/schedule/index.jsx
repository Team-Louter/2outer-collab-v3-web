import { useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns';
import CalendarContent from '../../components/calendarContent';
import CalendarHeader from '../../components/calendarHeader';
import CalendarModal from '../../components/calendarModal';
import data from '../../data.json';
import styles from './schedule.module.css';

export default function Schedule() {
    const [current, setCurrent] = useState(new Date());
    const startDate = startOfMonth(current);
    const endDate = endOfMonth(current);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    console.log(modalShow)

    if (modalShow === true) {
        document.body.style.overflow = 'hidden';
    }

    return(
        <>
            <div className={`${styles.topbar} topbar`}>탑바</div>
            <div className={`${styles.leftSidebar} leftSidebar`}>왼 사이드</div>
            <main>
                <div className={styles.calendar}>
                    <CalendarHeader current={current} setCurrent={setCurrent}/>
                    <CalendarContent 
                        data={data}
                        startDate={startDate} 
                        endDate={endDate} 
                        current={current} 
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        setSelectedDate={setSelectedDate}
                        setModalMode={setModalMode}
                    />
                    {modalShow && <CalendarModal 
                        data={data}
                        modalShow={modalShow} 
                        setModalShow={setModalShow} 
                        selectedDate={selectedDate}
                        modalMode={modalMode}
                    />}
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>
        </>
    )
}