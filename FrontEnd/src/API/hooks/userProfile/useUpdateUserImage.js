import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../../services/userProfileService";
import socket from "../../sockets/socketService";

function useUpdateUserImage() {
  return useMutation({
    mutationFn: (formData) => updateUserImage(formData),

    onSuccess: (updatedPhotoUrl) => {
      if (!updatedPhotoUrl) return;

      socket.emit(
        "userProfile:updatePhoto",
        { photoUrl: updatedPhotoUrl },
        (res) => {
          if (res?.success) {
            console.log("✅ Photo updated on server (via socket)");
          } else {
            console.error("❌ Failed to update photo on socket:", res?.message);
          }
        }
      );
    },
  });
}

export default useUpdateUserImage;