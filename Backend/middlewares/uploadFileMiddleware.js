import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const uploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      console.log("📂 File Received:", file.originalname);

      const fileType = file.mimetype.split("/")[0];
      return {
        folder: "LinkUp",
        resource_type: fileType === "image" ? "image" : "raw",
        format: file.mimetype.split("/")[1],
        public_id: `${Date.now()}-${file.originalname}`,
      };
    },
  });

  return multer({ storage });
};

export default uploader;
