import { useState } from "react";
import styles from "./EditRole.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { ToggleButton } from "../Buttons";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

export default function EditRole({ setEditRole, roleMode, selectedRole, getRoles }) {
  const [permissions, setPermissions] = useState(selectedRole?.permissions || []); // 권한 배열
  const [roleName, setRoleName] = useState(selectedRole?.roleName || "");
  const [roleDescription, setRoleDescription] = useState(selectedRole?.description || "");

  const { teamId } = useParams();

  const MAX_NAME_LENGTH = 50;
  const MAX_DESC_LENGTH = 100;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setRoleName(value);
    }
  };

  const handleDescChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_DESC_LENGTH) {
      setRoleDescription(value);
    }
  };

  // 권한 토글 핸들러
  const handlePermissionToggle = (permissionName) => {
    setPermissions(prev => {
      if (prev.includes(permissionName)) {
        // 있으면 제거
        return prev.filter(p => p !== permissionName);
      } else {
        // 없으면 추가
        return [...prev, permissionName];
      }
    });
  };

  const handleSubmit = async () => {
    const data = {
      roleName: roleName,
      description: roleDescription,
      permissions: permissions
    }

    try {
      let res;
      if (roleMode === '생성') {
        res = await axiosInstance.post(`/teams/${teamId}/roles`, data);
        console.log("역할 생성 성공", res.data);
      }
      if (roleMode === '편집') {
        if (selectedRole.roleName !== '관리자') {
          res = await axiosInstance.put(`/teams/${teamId}/roles/${selectedRole.roleId}`, data);
          console.log("역할 편집 성공", res.data);
        }
        else {
          alert('관리자 권한은 변경할 수 없습니다.');
        }
      }

      setEditRole(false);
      getRoles();
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <img
            src={closeModal}
            onClick={() => setEditRole(false)}
            className={styles.closeIcon}
          />
          <div className={styles.top}>
            <h3>역할 {roleMode}</h3>
          </div>
          <div className={styles.inputBox}>
            <small>역할명 <span>*</span></small>
            <input 
              placeholder="역할명을 입력해주세요." 
              onChange={handleNameChange} 
              value={roleName}
            />
            <small className={styles.letter}>{roleName?.length || 0}/{MAX_NAME_LENGTH}</small>
          </div>
          <div className={styles.inputBox}>
            <small>설명<span>*</span></small>
            <input 
              placeholder="설명을 입력해주세요." 
              onChange={handleDescChange} 
              value={roleDescription}
            />
            <small className={styles.letter}>{roleDescription?.length || 0}/{MAX_DESC_LENGTH}</small>
          </div>
          <small className={styles.authTop}>권한</small>
          <div className={styles.auths}>
            <span>팀 관련 설정 편집</span>
            <ToggleButton 
              on={permissions.includes('TEAM_SETTINGS')} 
              setOn={() => handlePermissionToggle('TEAM_SETTINGS')}
            />
          </div>
          <div className={styles.auths}>
            <span>공지 작성</span>
            <ToggleButton 
              on={permissions.includes('ANNOUNCEMENT')} 
              setOn={() => handlePermissionToggle('ANNOUNCEMENT')}
            />
          </div>
          <div className={styles.auths}>
            <span>회의록 편집</span>
            <ToggleButton 
              on={permissions.includes('MEETING_MINUTES')} 
              setOn={() => handlePermissionToggle('MEETING_MINUTES')}
            />
          </div>
          <div className={styles.auths}>
            <span>일정 편집</span>
            <ToggleButton 
              on={permissions.includes('SCHEDULE')} 
              setOn={() => handlePermissionToggle('SCHEDULE')}
            />
          </div>
          <button className={styles.create} onClick={handleSubmit}>{roleMode}</button>
        </div>
      </div>
    </>
  );
}