import styles from '../../pages/main/main.module.css';
import verifiedImg from '../../assets/mainpage/verified.svg';

export default function ProjectCard({ team }) {
    if (!team) return null;

    return (
        <>
            <div className={styles.projectCard}>
                <div className={styles.cardHeader}>
                    <img className={styles.projectBanner} src={team.bannerPicture} alt={`${team.teamName} 배너`} />
                </div>
                <div className={styles.projectLogoHeader}>
                    <img className={styles.projectLogo} src={team.profilePicture || ''} alt={`${team.teamName} 로고`} />
                </div>
                <div className={styles.cardContent}>
                    <p className={styles.memberCountHeader}>
                        <span className={styles.memberCountCheck}></span>멤버 {team.memberCount || 0}명
                    </p>
                    <p className={styles.projectName}>
                        {team.teamName}
                        <img className={styles.verifiedBadge} src={verifiedImg} alt="인증 배지" />
                    </p>
                    <div className={styles.projectDescBox}>
                        <p className={styles.projectType}>팀 소개</p>
                        <p className={styles.projectDesc}>{team.intro || '소개가 없습니다.'}</p>
                    </div>
                </div>
                <button className={styles.joinButton}>프로젝트 참가 요청</button>
            </div>
        </>
    );
}