import socket from "../../sockets/socketService";
import { useCallback } from "react";

export const useSaveForLater = () => {
  const toggleSaveForLater = useCallback((messageId, cb) => {
    console.log("📌 [toggleSaveForLater] Called with:", messageId);

    if (!socket) {
      console.warn("❌ No socket connection");
      return;
    }

    if (!messageId) {
      console.warn("❌ Invalid messageId");
      return;
    }

    socket.emit("toggleSaveForLater", { messageId }, (res) => {
      console.log("📬 [toggleSaveForLater] Server response:", res);
      if (res?.success) {
        cb?.(res);
      } else {
        console.error("⚠️ [toggleSaveForLater] Failed or unknown response:", res);
      }
    });
  }, []);

  return {
    toggleSaveForLater,
  };
};
