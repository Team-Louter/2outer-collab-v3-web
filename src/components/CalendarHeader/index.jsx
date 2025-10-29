import { addMonths, format, subMonths } from 'date-fns';
import styles from './calendarHeader.module.css'
import { ko } from 'date-fns/locale';
import left from '../../assets/schedule/left.svg';
import right from '../../assets/schedule/right.svg';

export default function CalendarHeader ({ current, setCurrent }) {
    const preMonth = () => {
        setCurrent(subMonths(current, 1))
    }

    const nextMonth = () => {
        setCurrent(addMonths(current, 1));
    }

    return (
        <div className={styles.all}>
            <div className={styles.miniTitle}>
                <h3>{format(current, 'yyyy년', { locale: ko })}</h3>
            </div>
            <div className={styles.title}>
                <img src={left} alt='전 달로 이동하기' onClick={preMonth} className='left'/>
                <h2 className={styles.thisMonth}>{format(current, 'M월', { locale: ko })}</h2>
                <img src={right} alt='다음 달로 이동하기' onClick={nextMonth} className='right'/>
            </div>
        </div>
    )
}