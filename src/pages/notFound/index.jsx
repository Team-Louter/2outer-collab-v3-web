import styles from './notFound.module.css';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function NotFound() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>404</h1>
                <h2 className={styles.title}>페이지를 찾을 수 없습니다</h2>
                <p className={styles.description}>
                    요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
                </p>
                <Link to="/" className={styles.homeButton}>
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}
