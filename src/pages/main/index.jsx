// Link import
import styles from './main.module.css';
import Header from '../../components/Header';

// Const
export default function Main() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.welcomeMessage}>환영합니다!</h1>
            </div>
        </>
    );
}