import { useRef, useState } from "react";
import styles from "./EditProject.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { toast } from 'react-toastify';
import CropImage from "../CropImage";

export default function EditProject({ setEditProject, teamInfo, onClose, onProjectUpdated, getTeam }) {
  const { teamId } = useParams();
  const fileInputRef = useRef(null);
  
  // Toast 설정
  const toastcode = (time) => ({
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: 0,
    theme: "light",
  });
  
  // 닫기 함수 처리
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (setEditProject) {
      setEditProject(false);
    }
  };
  
  const [projectName, setProjectName] = useState(teamInfo?.teamName || "");
  const [description, setDescription] = useState(teamInfo?.intro || "");
  
  const [logoPreview, setLogoPreview] = useState(teamInfo?.profilePicture || null);
  const [bannerPreview, setBannerPreview] = useState(teamInfo?.bannerPicture || null);
  
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [targetType, setTargetType] = useState(null);

  const handleUploadClick = (type) => {
    setTargetType(type);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelectedImg(url);
    setAspect(targetType === "logo" ? 1 : 16 / 2.5);
    setShowCrop(true); 
    e.target.value = "";
  };

  const handleCropCompleteImage = (croppedImg) => {
    if (targetType === "logo") setLogoPreview(croppedImg);
    else if (targetType === "banner") setBannerPreview(croppedImg);
    setShowCrop(false);
  };

  const uploadFile = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.url;
    } catch (error) {
      console.error("File upload failed:", error);
      throw error;
    }
  };

  const handleUpdate = async () => {
    if (!projectName.trim()) {
      toast.info('프로젝트명을 입력해주세요', toastcode(1000));
      toast.clearWaitingQueue();
      return;
    }
    if (!description.trim()) {
      toast.info('설명을 입력해주세요', toastcode(1000));
      toast.clearWaitingQueue();
      return;
    }

    try {
      let profilePicture = teamInfo?.profilePicture || "";
      let bannerPicture = teamInfo?.bannerPicture || "";

      // 로고가 변경되었고 blob URL인 경우에만 업로드
      if (logoPreview && logoPreview.startsWith("blob:")) {
        profilePicture = await uploadFile(logoPreview);
      } else if (logoPreview) {
        profilePicture = logoPreview;
      }

      // 배너가 변경되었고 blob URL인 경우에만 업로드
      if (bannerPreview && bannerPreview.startsWith("blob:")) {
        bannerPicture = await uploadFile(bannerPreview);
      } else if (bannerPreview) {
        bannerPicture = bannerPreview;
      }

      const response = await axiosInstance.put(`/teams/${teamId || teamInfo?.teamId}`, {
        teamName: projectName,
        profilePicture: profilePicture,
        bannerPicture: bannerPicture,
        intro: description,
      });

      if (response.status === 200) {
        toast.success('프로젝트가 성공적으로 수정되었습니다', toastcode(2000));
        toast.clearWaitingQueue();
        
        handleClose();
        getTeam();
        
        if (onProjectUpdated) {
          onProjectUpdated();
        }
      }
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      toast.error('프로젝트 수정 중 오류가 발생했습니다', toastcode(3000));
      toast.clearWaitingQueue();
    }
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <img
            src={closeModal}
            onClick={handleClose}
            className={styles.closeIcon}
            alt="close"
          />
          <div className={styles.top}>
            <h3>프로젝트 프로필</h3>
          </div>
          <div className={styles.inputBox} style={{marginTop: 20}}>
            <small>프로젝트명<span>*</span></small>
            <input 
              placeholder="프로젝트명을 입력해주세요." 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              maxLength={50}
            />
            <small className={styles.letter}>{projectName.length}/50</small>
          </div>
          <div className={styles.inputBox}>
            <small>설명<span>*</span></small>
            <input 
              placeholder="설명을 입력해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
            />
            <small className={styles.letter}>{description.length}/1000</small>
          </div>
          <small style={{fontWeight: 600}}>프로젝트 사진</small>
          <div className={styles.imgContainer}>
            <div className={styles.inputImg}>
              <small>로고</small>
              <div className={styles.logoContainer}>
                {logoPreview && <img src={logoPreview} alt="logo preview"/>}
              </div>
              <button className={styles.uploadBtn} onClick={() => handleUploadClick("logo")}>파일 업로드</button>
              <small style={{color: 'rgb(190, 190, 190)'}}>250KB 이하 png 파일</small>
            </div>
            <div className={styles.inputImg}>
              <small>배너</small>
              <div className={styles.bannerContainer}>
                {bannerPreview && <img src={bannerPreview} alt="banner preview"/>}
              </div>
              <button className={styles.uploadBtn} onClick={() => handleUploadClick("banner")}>파일 업로드</button>
              <small style={{color: 'rgb(190, 190, 190)'}}>250KB 이하 png 파일</small>
            </div>
          </div>
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/*"
          />
          <button className={styles.create} onClick={handleUpdate}>저장</button>
        </div>
      </div>
      {showCrop && 
        <CropImage 
            selectedImg={selectedImg}
            aspect={aspect}
            onClose={() => setShowCrop(false)} 
            handleCropCompleteImage={handleCropCompleteImage}
        />}
    </>
  );
}