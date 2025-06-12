import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import { joinWorkspace } from "../../../API/services/workspaceService";
import { clearWorkspace } from "../../../API/redux_toolkit/api_data/workspaceSlice";
import PropTypes from "prop-types";
import UserImage from '../../../components/UI/User/UserImage'

const avatarImages = [
  "/assets/avatars/image-1.jpeg",
  "/assets/avatars/image-2.jpeg",
  "/assets/avatars/image-3.jpeg",
  "/assets/avatars/image-4.jpeg",
  "/assets/avatars/image-5.jpeg",
];

function Step2({ onNext, workspace }) {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null); // File
  const [preview, setPreview] = useState(""); // preview path
  const dispatch = useDispatch();

  const isButtonDisabled = userName.trim() === "" || loading;

  // ❗ اختر صورة عشوائية عند التحميل
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    const randomImagePath = avatarImages[randomIndex];
    setPreview(randomImagePath);

    fetch(randomImagePath)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "default-avatar.jpeg", {
          type: blob.type,
        });
        setProfilePhoto(file);
      });
  }, []);

  // ✅ رفع صورة يدويًا
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleNextClick = async () => {
    if (!workspace || !workspace._id) {
      setError("Workspace ID is missing.");
      return;
    }

    if (userName.trim() === "") {
      setError("Name is required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let photoBase64 = "";

      if (profilePhoto) {
        const reader = new FileReader();
        photoBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(profilePhoto);
        });
      }

      console.log("userName:", userName);
      console.log("photoBase64:", photoBase64.slice(0, 100) + "...");

      const requestBody = {
        userName: userName.trim(),
        email: "", // إذا فيه إيميل تقدر تضيفه هنا
        about: "", // أو معلومات إضافية
        photo: photoBase64, // string (حتى لو فاضي مش مشكلة)
      };

      await joinWorkspace(workspace._id, requestBody);

      localStorage.setItem("selectedWorkspaceId", workspace._id);
      dispatch(clearWorkspace());
      onNext(userName);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <PageContent>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <p className={styles.stepText}>Step 2 of 3</p>
          <h2 className={styles.heading}>What is your name?</h2>
          <p className={styles.subheading}>
            Adding your name and profile photo helps your teammates recognize
            you.
          </p>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className={styles.input}
          />

          <div className={styles.profilePhotoSection}>
            <label>
              Your profile photo <span>(optional)</span>
            </label>
            <p className={styles.subheading}>
              Help your teammates know who you are.
            </p>

            <div className={styles.profilePhotoPlaceholder}>
              <UserImage src={preview} alt={'preview'}/>
            </div>

            <label className={styles.uploadButton}>
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            onClick={handleNextClick}
            disabled={isButtonDisabled}
            className={`${styles.button} ${
              isButtonDisabled ? styles.disabled : ""
            }`}
          >
            {loading ? "Joining..." : "Next"}
          </button>
        </div>
      </div>
    </PageContent>
  );
}
Step2.propTypes = {
  onNext: PropTypes.func.isRequired,
  workspace: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

export default Step2;
