import { addMonths, format, subMonths } from 'date-fns';
import styles from './calendarHeader.module.css'
import { ko } from 'date-fns/locale';

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
                <svg width="13" height="21" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={preMonth}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.521251 8.94638L9.69565 0.0116812L12.0109 2.22209L3.98309 10.0402L12.0881 17.7782L9.7949 20.0114L0.532276 11.1682C0.225316 10.8751 0.0517127 10.4763 0.0496451 10.0597C0.0475775 9.64301 0.217215 9.24256 0.521251 8.94638Z" fill="#4A85FF"/>
                </svg>
                <h2 className={styles.thisMonth}>{format(current, 'M월', { locale: ko })}</h2>
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={nextMonth}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.5229 11.1109L2.30425 20L0 17.7781L8.0665 10L0 2.22187L2.30425 0L11.5229 8.88906C11.8284 9.18373 12 9.58334 12 10C12 10.4167 11.8284 10.8163 11.5229 11.1109Z" fill="#4A85FF"/>
                </svg>
            </div>
        </div>
    )
}