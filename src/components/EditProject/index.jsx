import { useRef, useState } from "react";
import styles from "./EditProject.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useParams } from "react-router-dom";
import CropImage from "../CropImage";

export default function EditProject({ setEditProject }) {
  const { teamname } = useParams();
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [targetType, setTargetType] = useState(null);

  const handleLogoButtonClick = () => {
    fileInputRef.current.dataset.type = "logo";
    fileInputRef.current.click();
  };

  const handleBannerButtonClick = () => {
    fileInputRef.current.dataset.type = "banner";
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const type = e.target.dataset.type;

    setSelectedImg(url);
    setTargetType(type);
    setAspect(type === "logo" ? 1 : 16 / 2.5);
    setShowCrop(true); 
    e.target.value = "";
  };

  const handleCropCompleteImage = (croppedImg) => {
    if (targetType === "logo") setLogoPreview(croppedImg);
    else if (targetType === "banner") setBannerPreview(croppedImg);
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <img
            src={closeModal}
            onClick={() => setEditProject(false)}
            className={styles.closeIcon}
          />
          <div className={styles.top}>
            <h3>프로젝트 프로필</h3>
          </div>
          <div className={styles.inputBox} style={{marginTop: 20}}>
            <small>프로젝트명 <span>*</span></small>
            <input placeholder="프로젝트명을 입력해주세요." defaultValue={teamname}/>
            <small className={styles.letter}>{teamname.length}/50</small>
          </div>
          <div className={styles.inputBox}>
            <small>설명<span>*</span></small>
            <input placeholder="설명을 입력해주세요."/>
            <small className={styles.letter}>0/100</small>
          </div>
          <small style={{fontWeight: 600}}>프로젝트 사진</small>
          <div className={styles.imgContainer}>
            <div className={styles.inputImg}>
              <small>로고</small>
              <div className={styles.logoContainer}>
                {logoPreview && <img src={logoPreview} alt="logo preview"/>}
              </div>
              <button className={styles.uploadBtn} onClick={handleLogoButtonClick}>파일 업로드</button>
              <small style={{color: 'rgb(190, 190, 190)'}}>3MB 이하 png 파일</small>
            </div>
            <div className={styles.inputImg}>
              <small>배너</small>
              <div className={styles.bannerContainer}>
                {bannerPreview && <img src={bannerPreview} alt="banner preview"/>}
              </div>
              <button className={styles.uploadBtn} onClick={handleBannerButtonClick}>파일 업로드</button>
              <small style={{color: 'rgb(190, 190, 190)'}}>5MB 이하 png 파일</small>
            </div>
          </div>
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/*"
          />
          <button className={styles.create}>저장</button>
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