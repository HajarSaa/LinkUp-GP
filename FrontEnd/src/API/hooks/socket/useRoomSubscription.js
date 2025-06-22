import { useEffect } from "react";
import registerRoomHandler from "../../sockets/handlers/roomHandler";

const useRoomSubscription = (roomId) => {
  const { joinRoom, leaveRoom } = registerRoomHandler();

  useEffect(() => {
    if (!roomId) return;

    joinRoom(roomId);

    return () => {
      leaveRoom(roomId);
    };
  }, [roomId]);
};

export default useRoomSubscription;
