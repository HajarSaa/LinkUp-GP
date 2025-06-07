import { useMutation } from "@tanstack/react-query"
import { updateUserImage } from "../../services/userProfileService"

function useUpdateUserProfile() {
  return useMutation({
    mutationFn: (formData) => updateUserImage(formData),
  });
}

export default useUpdateUserProfile