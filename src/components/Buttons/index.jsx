import styles from "./Buttons.module.css";

function YesNoButtons({no, yes}) {
    return (
        <div className={styles.yesNoButtons}>
            <button className={styles.no} onClick={() => no(false)}>아니오</button>
            <button className={styles.yes} onClick={() => yes}>네</button>
        </div>
    )
}

export default YesNoButtons;