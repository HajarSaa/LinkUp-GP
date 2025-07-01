import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import styles from "./CreateWorkspace.module.css";
import UserImage from "../../../components/UI/User/UserImage";
import {
  setStepIndex,
  setUser,
} from "../../../API/redux_toolkit/ui/creationsStep";
import useJoinWorkspace from "../../../API/hooks/workspace/useJoinWorkspace";

const avatarImages = [
  "/assets/avatars/image-1.png",
  "/assets/avatars/image-2.png",
  "/assets/avatars/image-3.png",
  "/assets/avatars/image-4.png",
  "/assets/avatars/image-5.png",
];

function Step2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { workspace } = useSelector((state) => state.createWorkspace.workspace);
  const savedUser = useSelector((state) => state.createWorkspace.user);

  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [randomAvatarBlob, setRandomAvatarBlob] = useState(null);
  const [error, setError] = useState("");

  const { mutate: join_workspace, isPending } = useJoinWorkspace();
  const isButtonDisabled = userName.trim() === "" || isPending;

  useEffect(() => {
    const savedName = savedUser?.userName;
    if (savedName) setUserName(savedName);

    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    const randomImagePath = avatarImages[randomIndex];

    fetch(randomImagePath)
      .then((res) => res.blob())
      .then((blob) => {
        const extension = blob.type.split("/")[1];
        const file = new File([blob], `default-avatar.${extension}`, {
          type: blob.type,
        });

        setRandomAvatarBlob(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      })
      .catch((err) => {
        console.error("Failed to load preview image:", err);
      });
  }, [savedUser?.userName]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setProfilePhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNextClick = async () => {
    if (!workspace?._id) {
      setError("Workspace ID is missing.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("userName", userName.trim());

    if (profilePhoto) {
      formData.append("avatar", profilePhoto);
    } else if (randomAvatarBlob) {
      formData.append("avatar", randomAvatarBlob);
    }

    join_workspace(
      { workspaceId: workspace._id, data: formData },
      {
        onSuccess: () => {
          dispatch(setUser({ userName }));
          dispatch(setStepIndex(2));
          navigate("/new-workspace/step-3");
        },
        onError: (err) => {
          setError(err.response?.data?.message || "Something went wrong.");
        },
      }
    );
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
            onChange={handleNameChange}
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
              <UserImage src={preview} alt="preview" />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.btns_group}>
            <label className={styles.uploadButton}>
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <button
              onClick={handleNextClick}
              disabled={isButtonDisabled}
              className={`${styles.button} ${
                isButtonDisabled ? styles.disabled : ""
              }`}
            >
              {isPending ? "Joining..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default Step2;
