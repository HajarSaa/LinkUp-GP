import { useEffect, useState } from "react";
import Modal from "../Modal";
import styles from "./UploadProfilePhoto.module.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import Button from "../../Buttons/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeUploadUserImageModal } from "../../../../API/redux_toolkit/modals/userProfile/uploadUserImage";

const UploadProfilePhotoModal = () => {
  const { isOpen, userData } = useSelector((state) => state.uploadUserImage);
  useEffect(() => {
    console.log(userData)
  },[userData])
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  function handleClose() {
    dispatch(closeUploadUserImageModal());
  }

  function updateImage() {
    console.log('Updated')
    handleClose();
  }

  if (!isOpen || !userData) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.modal}
      zIndex={1002}
      title="Add a profile photo"
    >

      <div className={styles.uploadContainer}>
        <label htmlFor="fileUpload" className={styles.uploadBox}>
          {selectedFile ? (
            <img src={selectedFile} alt="Preview" className={styles.preview} />
          ) : (
            <div className={styles.uploadPlaceholder}>
              <AiOutlineFileImage className={styles.placeholderPhoto} />
              <p>Drag your photo here, or...</p>
              <Button className={styles.browseButton}>
                <label htmlFor="fileUpload">Browse Files</label>
              </Button>
            </div>
          )}
          <input
            type="file"
            id="fileUpload"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className={styles.previewContainer}>
        <p>Preview</p>
        <div className={styles.profilePreview}>
          {selectedFile ? (
            <div className={styles.image}>
              <img
                src={selectedFile}
                alt="Profile"
                className={styles.profileImg}
              />
            </div>
          ) : (
            <div className={styles.image}>
              <FaUser className={styles.profileIcon} />
            </div>
          )}
          <span className={styles.name}>
            Alaa Alsoudy <span className={styles.time}>9:41 AM</span>
          </span>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button className={styles.cancelButton} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={styles.saveButton} onClick={updateImage}>
          Save
        </Button>
      </div>
    </Modal>
  );
};


export default UploadProfilePhotoModal;
