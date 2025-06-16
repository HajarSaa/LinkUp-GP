import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "../../services/mediaService";

function useUploadMedia() {
  return useMutation({
    mutationFn: uploadMedia,
  });
}

export default useUploadMedia;
