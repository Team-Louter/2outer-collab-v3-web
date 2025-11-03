import styles from './projectSetting.module.css';
import Header from "../../components/Header";
import settingIcon from "../../assets/projectSetting/settingIcon.svg";
import plus from "../../assets/projectSetting/plus.svg";
import changeIcon from "../../assets/projectSetting/changeIcon.svg";
import deleteRole from "../../assets/projectSetting/delete.svg";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Expel from '../../components/Expel';
import DeleteProject from '../../components/DeleteProject';
import ApplyJoin from "../../components/ApplyJoin";
import EditRole from '../../components/EditRole';
import EditProject from '../../components/EditProject';
import axios from 'axios';

export default function projectSetting() {
    const [expelModalOpen, setExpelModalOpen] = useState(false); //추방 경고 모달
    const [deletePModalOpen, setDeletePModalOpen] = useState(false); //프로젝트 삭제 경고 모달
    const [applyModalOpen, setApplyModalOpen] = useState(false); // 참가 요청 확인 모달
    const [editRole, setEditRole] = useState(false); // 역할 편집 모달
    const [editProject, setEditProject] = useState(false); // 프로젝트 프로필 편집 모달
    const [expelPerson, setExpelPerson] = useState(null); //추방할 사람
    const [members, setMembers] = useState(Firstmembers);
    const [roleMode, setRoleMode] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [teams, setTeam] = useState(null);

    useEffect(() => {
      axios.get("/teams/my-teams")
        .then(res => {
          setTeam(res.data);
          console.log('teams : ', res.data);
        })
        .catch(console.error);
    }, []);

    if (expelModalOpen === true || deletePModalOpen === true || applyModalOpen === true || editRole === true || editProject === true) {
        document.body.style.overflow = 'hidden';
    }

    const { teamname } = useParams();

    const [memberRoles, setMemberRoles] = useState(
        members.reduce((acc, m) => {
          acc[m.nickname] = m.role; 
          return acc;
        }, {})
      );
    
      const handleRoleChange = (nickname, newRole) => {
        setMemberRoles((prev) => ({
          ...prev,
          [nickname]: newRole,
        }));
      };

      const expel = (person) => {
        setExpelModalOpen(!expelModalOpen);
        setExpelPerson(person);
      }

      const handleRole = (mode, role=null) => {
        setRoleMode(mode);
        setEditRole(true);
        setSelectedRole(role)
      }

    return(
        <>
            <Header />
            <div className={`${styles.leftSidebar} leftSidebar`}>왼 사이드</div>
            <main>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <img src={settingIcon} />
                        <h2>프로젝트 설정</h2>
                    </div>
                    <div className={styles.thisProject}>프로젝트명<small style={{margin: 0, marginLeft: 10}}>{teamname}</small></div>
                    <div className={styles.row}>
                        <div className={styles.role}>
                            <div className={styles.top}>
                                <span>역할</span>
                                <img src={plus} onClick={() => handleRole("생성")}/>
                            </div>
                            <div className={styles.roleContainer}>
                                {roles.map(role => (
                                    <div className={styles.roleElement} key={role.role}>
                                        <small>{role.role}({role.memberCount})</small>
                                        <img src={changeIcon} onClick={() => handleRole("편집", role)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.members}>
                            <div className={styles.top}>
                                <span>멤버 ({members.length})</span>
                            </div>
                            <div className={styles.memberContainer}>
                                {members.map(member => (
                                    <div className={styles.memberElement} key={member.nickname}>
                                        <div className={styles.forRow}>
                                            <div className={styles.profileImg}></div>
                                            <small>{member.nickname}</small>
                                        </div>
                                        <div className={styles.forRow}>
                                            <select className={styles.dropdown} value={memberRoles[member.nickname]} onChange={(e) => handleRoleChange(member.nickname, e.target.value)}>
                                                {roles.map(role => (
                                                    <option key={role.role}>{role.role}</option>
                                                ))}
                                            </select>
                                            <img src={deleteRole} onClick={() => expel(member)}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.setting} onClick={() => setApplyModalOpen(!applyModalOpen)}>프로젝트 참가 요청</div>
                    <div className={styles.setting} onClick={() => setEditProject(!editProject)}>프로젝트 프로필 변경</div>
                    <div className={styles.setting} style={{color:'red'}} onClick={() => setDeletePModalOpen(!deletePModalOpen)}>프로젝트 삭제</div>
                </div>
            </main>
            <div className={`${styles.rightSidebar} rightSidebar`}>오른 사이드</div>

            {expelModalOpen &&
            <Expel 
                expelPerson={expelPerson} 
                setExpelModalOpen={setExpelModalOpen}
                setMembers={setMembers}
            />}
            {deletePModalOpen &&
            <DeleteProject 
                setDeletePModalOpen={setDeletePModalOpen}
                teams={teams}
            />}
            {applyModalOpen &&
            <ApplyJoin 
                setApplyModalOpen={setApplyModalOpen}
            />}
            {editRole &&
            <EditRole 
                setEditRole={setEditRole}
                roleMode={roleMode}
                selectedRole={selectedRole}
            />}
            {editProject &&
            <EditProject setEditProject={setEditProject}/>}
        </>
    )
}

const Firstmembers = [
    { nickname: "코딩왕자", role: "팀장" },
    { nickname: "버그헌터", role: "프론트엔드 개발자" },
    { nickname: "데이터요정", role: "백엔드 개발자" },
    { nickname: "UI천재", role: "디자이너" },
    { nickname: "문서요정", role: "기획자" },
    { nickname: "테스트마스터", role: "QA" },
    { nickname: "알고리즘짱", role: "개발자" },
    { nickname: "커밋요정", role: "프론트엔드 개발자" },
    { nickname: "배포장인", role: "DevOps" },
    { nickname: "회의요정", role: "PM" }
  ];

  const roles = [
    {
      "role": "팀장",
      "description": "팀의 전반적인 운영을 총괄하며 모든 권한을 가진다.",
      "teamSettings": true,
      "announcement": true,
      "meetingNote": true,
      "schedule": true,
      "memberCount": 1
    },
    {
      "role": "프론트엔드 개발자",
      "description": "사용자 인터페이스를 개발하고 기능 구현을 담당한다.",
      "teamSettings": false,
      "announcement": false,
      "meetingNote": true,
      "schedule": false,
      "memberCount": 2
    },
    {
      "role": "백엔드 개발자",
      "description": "서버, API, 데이터베이스를 구축하고 유지보수한다.",
      "teamSettings": false,
      "announcement": false,
      "meetingNote": true,
      "schedule": false,
      "memberCount": 1
    },
    {
      "role": "디자이너",
      "description": "UI/UX를 설계하고 디자인 리소스를 제작한다.",
      "teamSettings": false,
      "announcement": false,
      "meetingNote": false,
      "schedule": false,
      "memberCount": 1
    },
    {
      "role": "기획자",
      "description": "서비스의 기능과 흐름을 설계하고 요구사항을 정리한다.",
      "teamSettings": false,
      "announcement": true,
      "meetingNote": true,
      "schedule": true,
      "memberCount": 1
    },
    {
      "role": "QA",
      "description": "품질 관리를 담당하며 버그 및 이슈를 테스트한다.",
      "teamSettings": false,
      "announcement": false,
      "meetingNote": true,
      "schedule": false,
      "memberCount": 1
    },
    {
      "role": "개발자",
      "description": "기능 구현과 유지보수를 담당하는 일반 개발자 역할이다.",
      "teamSettings": false,
      "announcement": false,
      "meetingNote": true,
      "schedule": false,
      "memberCount": 1
    },
    {
      "role": "DevOps",
      "description": "배포, 서버 인프라, CI/CD를 관리한다.",
      "teamSettings": true,
      "announcement": false,
      "meetingNote": false,
      "schedule": true,
      "memberCount": 1
    },
    {
      "role": "PM",
      "description": "프로젝트 일정과 팀 업무를 조율하며 공지와 회의를 주도한다.",
      "teamSettings": true,
      "announcement": true,
      "meetingNote": true,
      "schedule": true,
      "memberCount": 1
    }
  ]