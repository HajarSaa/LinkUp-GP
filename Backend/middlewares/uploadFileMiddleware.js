import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";
import path from "path";

const uploader = () => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      console.log("📂 File Received:", file.originalname);

      const ext = path.extname(file.originalname);
      const rawBaseName = path.basename(file.originalname, ext);

      const sanitizedBaseName = rawBaseName
        .trim()
        .replace(/[^\w\- ]+/g, "")
        .replace(/\s+/g, "-");

      const timestamp = Date.now();
      const finalName = `${timestamp}-${sanitizedBaseName}`;

      const mimeTopLevel = file.mimetype.split("/")[0];
      const resourceType =
        mimeTopLevel === "image"
          ? "image"
          : mimeTopLevel === "video"
          ? "video"
          : "raw";

      return {
        folder: "LinkUp",
        resource_type: resourceType,
        public_id: finalName,
        format: ext.slice(1),
      };
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 15 * 1024 * 1024,
    },
  });
};

export default uploader;
