import { useMutation } from "@tanstack/react-query";
import {updateUserProfile } from "../../services/userProfileService";

function useUpdateUserProfile() {
  return useMutation({
    mutationFn: (user_data) => updateUserProfile(user_data),
  });
}

export default useUpdateUserProfile;
