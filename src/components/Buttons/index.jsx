import styles from "./Buttons.module.css";

export function YesNoButtons({no, yes}) {
    return (
        <div className={styles.Buttons}>
            <button className={styles.no} onClick={() => no(false)}>아니오</button>
            <button className={styles.yes} onClick={() => yes}>네</button>
        </div>
    )
}

export function OkayButtons({no, yes}) {
    return (
        <div className={styles.Buttons}>
            <button className={styles.no} onClick={() => no}>거절</button>
            <button className={styles.yes} onClick={() => yes}>수락</button>
        </div>
    )
}
