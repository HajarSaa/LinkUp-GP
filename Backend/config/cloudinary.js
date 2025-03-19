import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dzlvica4e",
  api_key: "118571177156764",
  api_secret: "zlGwhmWuBZIkDIThS9vzTF_LmUQ",
});

export { cloudinary };
