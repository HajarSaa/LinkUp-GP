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
import { closeEditUserProfile } from "../../../../API/redux_toolkit/modals/userProfile/editUserProfie";
import useUpdateUserImage from "../../../../API/hooks/userProfile/useUpdateUserImage";
import Spinner from "../../Spinner/Spinner";
import useUpdateUserProfile from "../../../../API/hooks/userProfile/useUpdateUserProfile";
const ProfileEditModal = () => {
  const dispatch = useDispatch();
  const { isOpen, myData, focusField } = useSelector(
    (state) => state.editUserProfile
  );
  const update_image = useUpdateUserImage();
  const update_profile = useUpdateUserProfile();
  const [profileData, setProfileData] = useState({
    userName: "",
  });
  const [inputsData, setInputsData] = useState({
    displayName: "",
    title: "",
    namePronunciation: "",
    timeZone: "(UTC+02:00) Cairo",
  });

  useEffect(() => {
    if (myData) {
      setProfileData((prev) => ({
        ...prev,
        userName: myData.userName,
      }));
    }
  }, [myData]);
  // =====================(Handle Inputs Focuses)
  const fullNameRef = useRef(null);
  const displayNameRef = useRef(null);
  const titleRef = useRef(null);
  const pronunciationRef = useRef(null);

  useEffect(() => {
    if (isOpen && focusField) {
      const refs = {
        fullName: fullNameRef,
        displayName: displayNameRef,
        title: titleRef,
        namePronunciation: pronunciationRef,
      };

      const targetRef = refs[focusField];
      if (targetRef?.current) {
        targetRef.current.focus();
      }
    }
  }, [isOpen, focusField]);

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
    update_image.mutate(formData);
  };
  // ==================================================

  const handleClose = function () {
    dispatch(closeEditUserProfile());
  };

  const handleRecording = function (e) {
    e.stopPropagation();
    console.log("Recooording");
  };

  const userNameChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      userName: e.target.value,
    }));
  };
  const displayNameChange = (e) => {
    setInputsData((prev) => ({
      ...prev,
      displayName: e.target.value,
    }));
  };
  const titleChange = (e) => {
    setInputsData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const handleSelect = (zone) => {
    console.log(zone);
    setInputsData((prev) => ({
      ...prev,
      timeZone: zone,
    }));
    setIsDropdownOpen(false);
  };

  const namePronunciationChange = (e) => {
    setInputsData({ ...inputsData, namePronunciation: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDifferent = profileData?.userName !== myData?.userName;
    if (isDifferent)
      update_profile.mutate(profileData, {
        onSuccess: () => {
          handleClose();
        },
      });
    else {
      handleClose();
    }
  };

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeZones = [
    "(UTC+02:00) Cairo",
    "(UTC+03:00) Riyadh",
    "(UTC+01:00) London",
  ];

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
      title="Edit your profile"
    >
      <div className={styles.profileContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.upperSection}>
            <div className={styles.leftHS}>
              <label>Full name</label>
              <input
                ref={fullNameRef}
                type="text"
                name="fullName"
                value={profileData?.userName}
                onChange={userNameChange}
                placeholder="Full name"
              />

              <label>Display name</label>
              <input
                ref={displayNameRef}
                type="text"
                name="displayName"
                value={inputsData?.displayName || inputsData?.userName}
                onChange={displayNameChange}
                placeholder="Display name"
              />
              <p className={styles.description}>
                This could be your first name, or a nickname – however you would
                like people to refer to you in Slack.
              </p>

              <label>Title</label>
              <input
                ref={titleRef}
                type="text"
                name="title"
                value={inputsData?.title}
                onChange={titleChange}
                placeholder="Title"
              />
            </div>
            <div className={styles.profilePhotoSection}>
              <label> Profile photo</label>
              <div className={styles.profilePhotoPlaceholder}>
                {update_image.isPending && (
                  <div className={styles.image_uploading}>
                    <Spinner />
                  </div>
                )}
                <UserImage src={myData?.photo} alt={myData?.userName} />
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
            ref={pronunciationRef}
            type="text"
            name="namePronunciation"
            value={inputsData?.namePronunciation}
            onChange={namePronunciationChange}
            placeholder={
              inputsData?.namePronunciation || `Zoe (pronounce 'zo-ee')`
            }
          />

          <label>Time zone</label>
          <div className={styles.dropdown} ref={dropdownRef}>
            <div
              className={styles.dropdownHeader}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {inputsData?.timeZone || "(UTC+02:00) Cairo"}
              <IoIosArrowDown className={styles.arrow} />
            </div>
            {isDropdownOpen && (
              <ul className={styles.dropdownList}>
                {timeZones.map((zone) => (
                  <li
                    key={zone}
                    className={`${styles.dropdownItem} ${
                      inputsData?.timeZone === zone ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(zone)}
                  >
                    {inputsData?.timeZone === zone && (
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
              {update_profile.isPending ? (
                <Spinner color="var(--green-color)" />
              ) : (
                "Save Changes"
              )}
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
