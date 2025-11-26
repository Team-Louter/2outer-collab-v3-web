import styles from '../../pages/main/main.module.css';

import testLouterLogo from '../../assets/mainpage/testLouterLogo.png';
import testLouterB from '../../assets/mainpage/testLouterB.png';
import verifiedImg from '../../assets/mainpage/verified.svg';

export default function MainPage() {
    return (
        <>
            <div className={styles.projectCard}>
                <div className={styles.cardHeader}>
                    <img className={styles.projectBanner} src={testLouterB} alt="Louter 배너" />
                </div>
                <div className={styles.projectLogoHeader}>
                    <img className={styles.projectLogo} src={testLouterLogo} alt="Louter 로고" />
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.memberCountHeader}>
                        <span className={styles.memberCountCheck}></span>멤버 19명
                    </p>
                    <p className={styles.projectName}>
                        Louter
                        <img className={styles.verifiedBadge} src={verifiedImg} alt="인증 배지" />
                    </p>
                    <div className={styles.projectDescBox}>
                        <p className={styles.projectType}>팀 소개</p>
                        <p className={styles.projectDesc}>대구소프트웨어마이스터고 최우수 동아리 선정</p>
                    </div>
                </div>
                <button className={styles.joinButton}>프로젝트 참가 요청</button>
            </div>
        </>
    );
}