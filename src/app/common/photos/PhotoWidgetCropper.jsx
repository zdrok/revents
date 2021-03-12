import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null);

  function cropImage() {
    // if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
    //   return;
    // }
    cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, 'image/jpeg');
  }

  return (
    <Cropper
      //   src='https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg'
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      initialAspectRatio={1}
      preview='.img-preview'
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      guides={false}
      crop={cropImage}
      ref={cropperRef}
      //   ready={() => cropImage()}
    />
  );
}

// const Demo: React.FC = () => {
//   const onCrop = () => {
//     const imageElement: any = cropperRef?.current;
//     const cropper: any = imageElement?.cropper;
//     console.log(cropper.getCroppedCanvas().toDataURL());
//   };
