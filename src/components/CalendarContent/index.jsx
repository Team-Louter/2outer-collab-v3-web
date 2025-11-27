import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import styles from './calendarContent.module.css';
import { useState } from "react";

export default function CalendarContent({ schedules, startDate, endDate, current, modalShow, setModalShow, setSelectedDate, selectedDate, setModalMode, setClickedSchedule}) {
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const monthDays = eachDayOfInterval({
        start: startOfWeek(startDate),
        end : endOfWeek(endDate)
    })

    const weekDays = [];
    for (let i = 0; i < monthDays.length; i += 7) {
        weekDays.push(monthDays.slice(i, i + 7));
    }

    const clickDate = (e, day, mode, item) => {
        if (e) {
            e.stopPropagation();
        }
        setModalShow(!modalShow);
        const localDateStr = new Date(day.getTime() + 9 * 60 * 60 * 1000).toISOString();
        setSelectedDate(localDateStr);
        setModalMode(mode);

        setClickedSchedule(item);
    }

    const dailySchedules = (schedules || []).reduce((acc, cur) => {
        const date = new Date(cur.scheduleDate); 
        const localDateKey = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
        if (!acc[localDateKey]) acc[localDateKey] = [];
        acc[localDateKey].push(cur);
        return acc;
      }, {});

    const changeDate = (e, day) => {
        e.stopPropagation()

        const localDateStr = `${day.getFullYear()}-${String(day.getMonth()+1).padStart(2,'0')}-${String(day.getDate()).padStart(2,'0')}`;
        setSelectedDate(localDateStr);
    }

    const [detailShow, setDetailShow] = useState([]);

    function toggleDetail(id) {
        setDetailShow(prev =>
          prev.includes(id)
            ? prev.filter(x => x !== id) 
            : [...prev, id]             
        );
      }
      
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {week.map(day => (
                            <th key={day} style={day === '일' ? {color:'red'} : day === '토' ? {color:'blue'} : {}}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weekDays.map((days, weekIndex) => (
                        <tr key={weekIndex}>
                            {days.map(day => {
                                return(
                                    <td onClick={(e) => clickDate(e, day, '생성')} key={day}>
                                        <div className={styles.forScroll}>
                                            <span
                                            style={{
                                                color:
                                                day.getMonth() !== current.getMonth()
                                                    ? 'gray' // 이번 달 아닌 날
                                                    : day.getDay() === 0
                                                    ? 'red'   // 일요일
                                                    : day.getDay() === 6
                                                    ? 'blue'  // 토요일
                                                    : 'black',
                                                marginLeft: '5px',
                                            }}
                                            onClick={(e) => changeDate(e, day)}
                                            >
                                            {day.getDate()}일<br/>
                                            </span>
                                            {dailySchedules[format(day, 'yyyy-MM-dd')]?.map(item => (
                                            <div key={item.scheduleId}>
                                                <span
                                                onClick={(e) => clickDate(e, day, '편집', item)}
                                                data-tooltip-id="scheduleTooltip"
                                                data-tooltip-content={item.title}
                                                style={{ backgroundColor: item.color, marginLeft: '5px'}}
                                                >
                                                {item.scheduleTitle}
                                                </span>
                                                <br/>
                                            </div>
                                            ))}
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.scheduleContainer}>
                {dailySchedules[selectedDate]?.map(item => (
                    <div className={`${styles.scheduleItems} ${detailShow.includes(item.scheduleId) ? styles.detail : ""}`} onClick={() => toggleDetail(item.scheduleId)} key={item.scheduleId}>
                        <span>{format(selectedDate, 'MM/dd')}</span>
                        <span>{item.scheduleTitle}</span>
                        <small>{item.scheduleContent}</small>
                    </div>
                ))}
            </div>
        </>
    )
}