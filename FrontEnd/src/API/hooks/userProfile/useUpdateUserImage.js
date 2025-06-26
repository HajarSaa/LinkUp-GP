// import { useMutation } from "@tanstack/react-query";
// import { updateUserImage } from "../../services/userProfileService";
// import socket from "../../sockets/socketService";

// function useUpdateUserImage() {
//   return useMutation({
//     mutationFn: (formData) => updateUserImage(formData),

//     onSuccess: (updatedPhotoUrl) => {
//       if (!updatedPhotoUrl) return;

//       socket.emit(
//         "userProfile:updatePhoto",
//         { photoUrl: updatedPhotoUrl },
//         (res) => {
//           if (res?.success) {
//             console.log("✅ Photo updated on server (via socket)");
//           } else {
//             console.error("❌ Failed to update photo on socket:", res?.message);
//           }
//         }
//       );
//     },
//   });
// }

// export default useUpdateUserImage;

// import { useMutation } from "@tanstack/react-query";
// import { updateUserImage } from "../../services/userProfileService";
// import socket from "../../sockets/socketService";

// function useUpdateUserImage() {
//   return useMutation({
//     mutationFn: (formData) => updateUserImage(formData),

//     // onSuccess: (_, variables) => {
//     //   const photoUrl = variables?.photoUrl || variables;

//     //   if (!photoUrl) return;

//     //   socket.emit(
//     //     "userProfile:updatePhoto",
//     //     { photoUrl },
//     //     (res) => {
//     //       console.log("📦 callback response:", res);
//     //       if (res?.success) {
//     //         console.log("✅ Photo updated on server (via socket)");
//     //       } else {
//     //         console.error("❌ Failed to update photo on socket:", res?.message || res?.error || "Unknown error");
//     //       }
//     //     }
//     //   );
//     // },
//     onSuccess: (_, variables) => {
//   const photoUrl =
//     typeof variables === "string"
//       ? variables
//       : typeof variables?.photo === "string"
//       ? variables.photo
//       : variables?.photoUrl;
// console.log("📤 Photo URL received:", photoUrl);
//   if (!photoUrl || typeof photoUrl !== "string") {
//     console.error("❌ Invalid photoUrl sent to socket:", photoUrl);
//     return;
//   }

//   socket.emit(
//     "userProfile:updatePhoto",
//     { photoUrl },
//     (res) => {
//       console.log("📦 callback response:", res);
//       if (res?.success) {
//         console.log("✅ Photo updated on server (via socket)");
//       } else {
//         console.error(
//           "❌ Failed to update photo on socket:",
//           res?.message || res?.error || "Unknown error"
//         );
//       }
//     }
//   );
// }

//   });
// }

// export default useUpdateUserImage;


import { useMutation } from "@tanstack/react-query";
import { updateUserImage } from "../../services/userProfileService";
import socket from "../../sockets/socketService";

function useUpdateUserImage() {
  return useMutation({
    mutationFn: (formData) => updateUserImage(formData),

    onSuccess: (photoUrl) => {
      console.log("📤 Photo URL received:", photoUrl);

      if (!photoUrl || typeof photoUrl !== "string") {
        console.error("❌ Invalid photoUrl sent to socket:", photoUrl);
        return;
      }

      socket.emit("userProfile:updatePhoto", { photoUrl }, (res) => {
        console.log("📦 callback response:", res);
        if (res?.success) {
          console.log("✅ Photo updated on server (via socket)");
        } else {
          console.error(
            "❌ Failed to update photo on socket:",
            res?.message || res?.error || "Unknown error"
          );
        }
      });
    },
  });
}

export default useUpdateUserImage;
