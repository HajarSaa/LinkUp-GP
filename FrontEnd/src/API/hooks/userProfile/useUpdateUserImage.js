import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../../services/userProfileService";

function useUpdateUserImage() {
  return useMutation({
    mutationFn: (formData) => updateUserImage(formData),
  });
}

export default useUpdateUserImage;
