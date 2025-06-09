import { useRef, useState } from "react";
import Modal from "../Modal";
import styles from "./UploadProfilePhoto.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import Button from "../../Buttons/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeUploadUserImageModal } from "../../../../API/redux_toolkit/modals/userProfile/uploadUserImage";
import UserImage from "../../User/UserImage";
import { currentFormatedTime } from "../../../../utils/formatedDate";
import useUpdateUserImage from "../../../../API/hooks/userProfile/useUpdateUserImage";
import Spinner from "../../Spinner/Spinner";

const UploadProfilePhotoModal = () => {
  const { isOpen, userData } = useSelector((state) => state.uploadUserImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const update_image = useUpdateUserImage();

  const time = currentFormatedTime();
  const dispatch = useDispatch();
  const uploadRef = useRef();

  const handleSelectImage = () => {
    uploadRef.current?.click();
  };
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (!image) return;
    setImage(image);
    if (image) {
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  function handleClose() {
    dispatch(closeUploadUserImageModal());
    setSelectedImage(null);
    setIsDragging(false);
  }

  function updateImage() {
    const formData = new FormData();
    formData.append("photo", image);
    update_image.mutate(formData, {
      onSuccess: () => {
        console.log("Updated");
        handleClose();
      },
    });
  }
  // handle drag & drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedImage = e.dataTransfer.files[0];
    if (droppedImage && droppedImage.type.startsWith("image/")) {
      setImage(droppedImage)
      setSelectedImage(URL.createObjectURL(droppedImage));
    }
  };

  // handle drag & drop

  if (!isOpen || !userData) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.modal}
      zIndex={1002}
      title="Add a profile photo"
    >
      <div
        className={`${styles.uploadContainer} ${
          isDragging ? styles.dragging : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <UserImage src={selectedImage} alt={"Preview"} />
        ) : (
          <div className={`${styles.uploadPlaceholder}`}>
            <AiOutlineFileImage className={styles.placeholderPhoto} />
            <p>Drag your photo here, or...</p>
            <Button className={styles.browseButton} onClick={handleSelectImage}>
              Browse Files
            </Button>
            <input
              ref={uploadRef}
              type="file"
              id="fileUpload"
              className={styles.fileInput}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>

      <div className={styles.previewContainer}>
        <p>Preview</p>
        <div className={styles.profilePreview}>
          {selectedImage ? (
            <div className={styles.image}>
              <UserImage src={selectedImage} alt={"Profile"} />
            </div>
          ) : (
            <div className={styles.image}>
              <UserImage src={userData?.photo} alt={userData?.userName} />
            </div>
          )}
          <span className={styles.name}>
            <span>{userData?.userName}</span>
            <span className={styles.time}>{time}</span>
          </span>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button className={styles.cancelButton} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={styles.saveButton} onClick={updateImage}>
          {update_image.isPending ? (
            <Spinner width={20} height={20} color="var(--green-color)" />
          ) : (
            "Save"
          )}
        </Button>
        {update_image.isError && console.log(update_image.error)}
      </div>
    </Modal>
  );
};

export default UploadProfilePhotoModal;
