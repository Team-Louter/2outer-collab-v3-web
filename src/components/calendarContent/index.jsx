import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import styles from './calendarContent.module.css';
import { Tooltip } from "react-tooltip";

export default function CalendarContent({ data, startDate, endDate, current, modalShow, setModalShow, setSelectedDate, setModalMode}) {
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const monthDays = eachDayOfInterval({
        start: startOfWeek(startDate),
        end : endOfWeek(endDate)
    })
    console.log(monthDays)

    const weekDays = [];
    for (let i = 0; i < monthDays.length; i += 7) {
        weekDays.push(monthDays.slice(i, i + 7));
    }
    console.log(weekDays);

    const clickDate = (e, day, mode) => {
        if (e) {
            e.stopPropagation();
        }
        setModalShow(!modalShow);
        setSelectedDate(day);
        setModalMode(mode);
    }

    const dailySchedules = data.reduce((acc, currentItem) => {
        const scheduleDate = format(new Date(currentItem.date), 'yyyy-MM-dd');
        acc[scheduleDate] = currentItem;
        return acc;
    }, {});

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
                    {weekDays.map(days => (
                        <tr>
                            {days.map(day => {
                                const scheduleDate = format(day, 'yyyy-MM-dd');
                                const schedule = dailySchedules[scheduleDate];
                                return(
                                    <td style={day.getMonth() !== current.getMonth() ? {color:'gray'} : {}} onClick={(e) => clickDate(e, day, '생성')}>
                                        <div className={styles.forScroll}>
                                            {day.getDate()}일<br/>
                                            {schedule && <span 
                                                onClick={(e) => clickDate(e, day, '편집')}
                                                data-tooltip-id="scheduleTooltip"
                                                data-tooltip-content={schedule.title}
                                            >{schedule.title}</span>}
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Tooltip 
                id="scheduleTooltip" 
                place="bottom"
                render={({content}) => (
                    <span className={styles.tooltip}>{content}</span>
                )}
            /> */}
        </>
    )
}