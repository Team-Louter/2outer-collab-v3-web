// CropImage.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import styles from "./CropImage.module.css";
import { YesNoButtons } from "../Buttons";

export default function CropImage({ selectedImg, aspect, onClose, handleCropCompleteImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    if (croppedAreaPixels && selectedImg) {
      const croppedImage = await getCroppedImg(selectedImg, croppedAreaPixels);
      handleCropCompleteImage(croppedImage);
    }
    onClose();
  };

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          resolve(url);
        }, "image/jpeg");
      };
    });
  };

  return (
    <div className={styles.cropBackground}>
      <div className={styles.cropContainer}>
        <div className={styles.cropperWrapper}>
          <Cropper
            image={selectedImg}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className={styles.controls}>
          <YesNoButtons no={onClose} yes={handleConfirm}/>
        </div>
      </div>
    </div>
  );
}