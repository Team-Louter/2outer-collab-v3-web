import { useEffect, useState } from 'react'
import { endOfMonth, startOfMonth } from 'date-fns';
import CalendarContent from '../../components/CalendarContent';
import CalendarHeader from '../../components/CalendarHeader';
import CalendarModal from '../../components/calendarModal';
import styles from './schedule.module.css';
import axiosInstance from "../../axiosInstance";
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import ProjectSideBar from '../../components/ProjectSideBar';
import MemberSideBar from "../../components/MemberSideBar"
import NotFound from "../notFound";

export default function Schedule() {
    const { teamId } = useParams();
    const [current, setCurrent] = useState(new Date());
    const startDate = startOfMonth(current);
    const endDate = endOfMonth(current);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [clickedSchedule, setClickedSchedule] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // teamId가 유효한 숫자가 아니면 NotFound
    if (!teamId || !/^\d+$/.test(teamId) || notFound) {
        return <NotFound />;
    }
  
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
            // 팀이 존재하지 않거나 권한이 없으면 NotFound
            if (err.response?.status === 404 || err.response?.status === 400 || err.response?.status === 403) {
                setNotFound(true);
            }
        }
    }

    // 현재 사용자가 팀 멤버인지 확인
    const checkMembership = async () => {
        try {
            const res = await axiosInstance.get(`/teams/${teamId}/members`);
            const currentUserId = Number(localStorage.getItem("userId"));
            const isMember = res.data.some(member => member.userId === currentUserId);
            if (!isMember) {
                console.log("현재 사용자가 팀 멤버가 아닙니다");
                setNotFound(true);
            }
        } catch (err) {
            console.error("멤버 확인 실패:", err);
            if (err.response?.status === 404 || err.response?.status === 400 || err.response?.status === 403) {
                setNotFound(true);
            }
        }
    }

    useEffect(() => {
        checkMembership();
        getSchedules();
    }, []);

    return(
        <>
            <Header />
            <ProjectSideBar />
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
            <MemberSideBar />
        </>
    )
}
                            