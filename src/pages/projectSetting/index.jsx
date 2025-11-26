import styles from './projectSetting.module.css';
import Header from "../../components/Header";
import settingIcon from "../../assets/projectSetting/settingIcon.svg";
import plus from "../../assets/projectSetting/plus.svg";
import changeIcon from "../../assets/projectSetting/changeIcon.svg";
import deleteIcon from "../../assets/projectSetting/delete.svg";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Expel from '../../components/Expel';
import DeleteProject from '../../components/DeleteProject';
import ApplyJoin from "../../components/ApplyJoin";
import EditRole from '../../components/EditRole';
import EditProject from '../../components/EditProject';
import axiosInstance from '../../axiosInstance';
import ProjectSideBar from '../../components/ProjectSideBar';
import MemberSideBar from "../../components/MemberSideBar";

export default function projectSetting() {
    const [expelModalOpen, setExpelModalOpen] = useState(false);
    const [deletePModalOpen, setDeletePModalOpen] = useState(false);
    const [applyModalOpen, setApplyModalOpen] = useState(false);
    const [editRole, setEditRole] = useState(false);
    const [editProject, setEditProject] = useState(false);
    const [expelPerson, setExpelPerson] = useState(null);
    const [members, setMembers] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [roleMode, setRoleMode] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [roles, setRoles] = useState([]);
    const [messages, setMessages] = useState("");
    const [type, setType] = useState("");
    const [myRole, setMyRole] = useState(""); 
    const userId = Number(localStorage.getItem("userId"));
    

    if (expelModalOpen === true || deletePModalOpen === true || applyModalOpen === true || editRole === true || editProject === true) {
        document.body.style.overflow = 'hidden';
    }

    const { teamId } = useParams();

    const [memberRoles, setMemberRoles] = useState({});
    
    useEffect(() => {
        if (members && members.length > 0) {
            setMemberRoles(
                members.reduce((acc, m) => {
                    acc[m.userName] = m.roleName;
                    return acc;
                }, {})
            );
        }
    }, [members]);

    useEffect(() => {
        if (members && members.length > 0) {
            const foundRole = members.find(member => member.userId === userId)?.roleName;
            setMyRole(foundRole || "");
            console.log("내 역할", foundRole);
        }
    }, [members, userId]);

    const expel = (thing, messages, type) => {
        setExpelModalOpen(!expelModalOpen);
        setExpelPerson(thing);
        setMessages(messages);
        setType(type);
    }

    const handleRole = (mode, role=null) => {
        setRoleMode(mode);
        setEditRole(true);
        console.log(selectedRole)
        setSelectedRole(role);
    }

    const getRoles = async () => {
      try {
          const res = await axiosInstance.get(`/teams/${teamId}/roles`);
          setRoles(res.data);
          console.log("역할", res.data);
      }
      catch(err) {
          console.error("역할 불러오기 실패", err);
      }
    }

    const getMembers = async () => {
      try {
          const res = await axiosInstance.get(`/teams/${teamId}/members`);
          setMembers(res.data);
          console.log("멤버", res.data);
      }
      catch(err) {
          console.error("멤버 불러오기 실패", err);
      }
    }

    const getTeam = async () => {
      try {
          const res = await axiosInstance.get(`/teams/${teamId}`);
          console.log("팀 정보", res.data);
          setTeamInfo(res.data);
      }
      catch(err) {
          console.error("팀 정보 가져오기 실패", err);
      }
    }

    useEffect(() => {
        getRoles();
        getTeam();
        getMembers();
    }, [teamId])

    const handleRoleChange = async (memberName, newRoleName) => {
      try {
        const member = members.find(m => m.userName === memberName);
        const role = roles.find(r => r.roleName === newRoleName);
        
        if (!member || !role) {
          console.error("멤버 또는 역할을 찾을 수 없습니다");
          return;
        }

        console.log(member.userId, role.roleId);
        const res = await axiosInstance.put(`/teams/${teamId}/members/role`, {
          targetUserId: member.userId,
          newRoleId: role.roleId
        });
        console.log("역할 변경 성공", res.data);
        
        getMembers();
      }
      catch (err) {
        console.error("역할 변경 실패:", err);
      }
    }

    return(
        <>
            <Header />
            <ProjectSideBar />
            <main>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <img src={settingIcon} />
                        <h2>프로젝트 설정</h2>
                    </div>
                    <div className={styles.thisProject}>프로젝트명<small style={{margin: 0, marginLeft: 10}}>{teamInfo?.teamName}</small></div>
                    <div className={styles.row}>
                        <div className={styles.role}>
                            <div className={styles.top}>
                                <span>역할</span>
                                <img src={plus} onClick={() => handleRole("생성")}/>
                            </div>
                            <div className={styles.roleContainer}>
                                {roles?.map(role => (
                                    <div className={styles.roleElement} key={role.roleId}>
                                        <small>{role.roleName}</small>
                                        <div className={styles.icons}>
                                          <img src={changeIcon} onClick={() => handleRole("편집", role)}/>
                                          <img src={deleteIcon} onClick={() => expel(role, "해당 역할을 삭제하시겠습니까?", "역할")} style={{height: 25, width: 25}}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.members}>
                            <div className={styles.top}>
                                <span>멤버 ({members?.length})</span>
                            </div>
                            <div className={styles.memberContainer}>
                                {members?.map(member => (
                                    <div className={styles.memberElement} key={member.userId}>
                                        <div className={styles.forRow}>
                                            <div className={styles.profileImg}></div>
                                            <small>{member.userName}</small>
                                        </div>
                                        <div className={styles.forRow}>
                                          <select 
                                              className={styles.dropdown} 
                                              value={memberRoles[member.userName] || member.roleName || ''} 
                                              onChange={(e) => handleRoleChange(member.userName, e.target.value)}
                                          >
                                              {roles?.map(role => (
                                                  <option 
                                                      key={role.roleName} 
                                                      value={role.roleName}
                                                  >
                                                      {role.roleName}
                                                  </option>
                                              ))}
                                          </select>
                                          <img src={deleteIcon} onClick={() => expel(member, "해당 멤버를 추방하시겠습니까?", "멤버")}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.setting} onClick={() => setApplyModalOpen(!applyModalOpen)}>프로젝트 참가 요청</div>
                    <div className={styles.setting} onClick={() => setEditProject(!editProject)}>프로젝트 프로필 변경</div>
                    { myRole === '관리자' 
                      ? <div className={styles.setting} style={{color:'red'}} onClick={() => setDeletePModalOpen(!deletePModalOpen)}>프로젝트 삭제</div>
                      : <></>
                    }
                </div>
            </main>
            <MemberSideBar />

            {expelModalOpen === false 
            ? <></> 
            : <Expel 
                expelPerson={expelPerson} 
                setExpelModalOpen={setExpelModalOpen}
                messages={messages}
                type={type}
                getRoles={getRoles}
                getMembers={getMembers}
            />}
            {deletePModalOpen === false
            ? <></>
            : <DeleteProject 
                setDeletePModalOpen={setDeletePModalOpen}
                teamInfo={teamInfo}
            />}
            {applyModalOpen === false
            ? <></>
            : <ApplyJoin 
                setApplyModalOpen={setApplyModalOpen}
            />}
            {editRole === false
            ? <></>
            : <EditRole 
                setEditRole={setEditRole}
                roleMode={roleMode}
                selectedRole={selectedRole}
                getRoles={getRoles}
            />}
            {editProject === false
            ? <></>
            : <EditProject 
                setEditProject={setEditProject}
                teamInfo={teamInfo}
                getTeam={getTeam}
              />}
        </>
    )
}