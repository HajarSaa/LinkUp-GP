import  { useRef, useState } from "react";
import Button from "../../src/components/UI/Buttons/Button/Button";

const UploadPhotoButton = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file); // نعمل preview من غير رفع
    setImagePreview(imageUrl);
  };

  return (
    <div>
      <Button
        type="button"
        // className={styles.uploadButton}
        onClick={handleButtonClick}
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

      {imagePreview && (
        <div
          style={{
            marginTop: "10px",
            width: "200px",
            height: "200px",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPhotoButton;
