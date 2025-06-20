export default function registerConnectionHandlers(socket, dispatch) {
  const handlePresenceUpdate = ({ userIds }) => {
    dispatch({ type: "workspace/setOnlineUsers", payload: userIds });
  };

  socket.on("presenceUpdate", handlePresenceUpdate);

  return () => {
    socket.off("presenceUpdate", handlePresenceUpdate);
  };
}
