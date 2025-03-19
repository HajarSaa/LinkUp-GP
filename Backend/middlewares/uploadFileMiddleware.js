import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const uploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      console.log("📂 File Received:", file.originalname);

      return {
        folder: "LinkUp",
        resource_type: "raw",
        format: file.mimetype.split("/")[1],
        public_id: `${Date.now()}-${file.originalname}`,
      };
    },
  });

  return multer({ storage });
};

export default uploader;
