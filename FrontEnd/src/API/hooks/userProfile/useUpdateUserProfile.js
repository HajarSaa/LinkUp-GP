import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../../services/userProfileService";
import socket from "../../sockets/socketService";

function useUpdateUserProfile() {
  return useMutation({mutationFn: (user_data) => updateUserProfile(user_data),
onSuccess: (_, variables) => {
  if (!variables?.userName && !variables?.email && !variables?.about) return;


  socket.emit(
    "userProfile:updateInfo",
    { 
      updates: variables
    },
    (res) => {
      console.log("📦 callback response:", res);
      if (res?.success) {
        console.log("✅ Profile info updated on server (via socket)");
      } else {
        console.error("❌ Failed to update profile info on socket:", res?.message || res?.error || "Unknown error");
      }
    }
  );
}

  });
}

export default useUpdateUserProfile;

