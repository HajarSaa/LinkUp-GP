import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import styles from "./EditProfile.module.css";
import Button from "../../Buttons/Button/Button";
import { AiOutlineAudio } from "react-icons/ai";
import UserImage from "../../User/UserImage";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeEditUserProfile } from "../../../../API/redux_toolkit/modals/convers/editUserProfie";
const ProfileEditModal = () => {
  const { isOpen, myData } = useSelector((state) => state.editUserProfile);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    title: "",
    namePronunciation: "",
    timeZone: "",
    photo: null,
  });

  useEffect(() => {
    if (myData) {
      setFormData({
        fullName: myData?.userName || "",
        displayName: myData?.displayName || myData?.userName,
        title: myData?.title || "",
        namePronunciation: myData?.namePronunciation || "",
        timeZone: myData?.timeZone || "(UTC+02:00) Cairo",
        photo: myData?.photo,
      });
    }
  }, [myData]);

  // =====================(Handle Image Uploading)
  const fileInputRef = useRef(null);

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("photo", image);
    
  };
  // ==================================================

  const handleClose = function () {
    dispatch(closeEditUserProfile());
  };

  const handleRecording = function () {
    // e.stopPropagation();
    console.log("Recooording");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    handleClose();
  };

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeZones = [
    "(UTC+02:00) Cairo",
    "(UTC+03:00) Riyadh",
    "(UTC+01:00) London",
  ];

  const handleSelect = (zone) => {
    setFormData({ ...formData, timeZone: zone });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!isOpen || !myData) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.profileModal}
      zIndex={1002}
    >
      <h2 className={styles.modalTitle}>Edit your profile</h2>

      <div className={styles.profileContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.upperSection}>
            <div className={styles.leftHS}>
              <label>Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
              />

              <label>Display name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Display name"
              />
              <p className={styles.description}>
                This could be your first name, or a nickname – however you would
                like people to refer to you in Slack.
              </p>

              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
              />
            </div>
            <div className={styles.profilePhotoSection}>
              <label> Profile photo</label>
              <div className={styles.profilePhotoPlaceholder}>
                <UserImage src={formData?.photo} alt={formData?.userName} />
              </div>
              <Button
                type="button"
                className={styles.uploadButton}
                onClick={handleUploadImage}
              >
                Upload Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <p className={styles.description}>Let people know what you do at :</p>

          <label>Name recording</label>
          <Button
            type="button"
            className={styles.recordButton}
            onClick={handleRecording}
          >
            <AiOutlineAudio />
            Record Audio Clip
          </Button>

          <label>Name pronunciation</label>
          <input
            type="text"
            name="namePronunciation"
            // value={formData.namePronunciation}
            onChange={handleChange}
            placeholder={formData.namePronunciation}
          />

          <label>Time zone</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <div
              className={styles.dropdownHeader}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {formData.timeZone}
              <IoIosArrowDown className={styles.arrow} />
            </div>
            {isDropdownOpen && (
              <ul className={styles.dropdownList}>
                {timeZones.map((zone) => (
                  <li
                    key={zone}
                    className={`${styles.dropdownItem} ${
                      formData.timeZone === zone ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(zone)}
                  >
                    {formData.timeZone === zone && (
                      <FaCheck className={styles.check} />
                    )}
                    {zone}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className={styles.description}>
            Your current time zone. Used to send summary and notification
            emails, for times in your activity feeds, and for reminders.
          </p>

          <div className={styles.buttons}>
            <Button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button type="submit" className={styles.saveButton}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ProfileEditModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  userData: PropTypes.shape({
    fullName: PropTypes.string,
    displayName: PropTypes.string,
    title: PropTypes.string,
    namePronunciation: PropTypes.string,
    timeZone: PropTypes.string,
  }),
};

export default ProfileEditModal;
