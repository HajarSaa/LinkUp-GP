import { useState } from "react";
import axios from "axios";
import styles from "./Code.module.css";

function UpdateImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("من فضلك اختار صورة");
      return;
    }

    const formData = new FormData();
    formData.append("photo", image);

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.patch(
        "https://link-up-beige.vercel.app/api/v1/userProfiles/updateUserImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ تم رفع الصورة بنجاح");
      console.log(res)
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "حصل خطأ أثناء الرفع"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "جاري الرفع..." : "رفع الصورة"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateImage;
