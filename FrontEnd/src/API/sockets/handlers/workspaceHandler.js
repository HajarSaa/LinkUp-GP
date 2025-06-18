import socket from "../socketService";
import { setOnlineUsers } from "../../redux_toolkit/api_data/workspaceSlice";

export const initWorkspaceHandlers = (dispatch) => {
  socket.on("presenceUpdate", ({ userIds }) => {
    dispatch(setOnlineUsers(userIds));
  });

  socket.on("workspaceMemberJoined", ({ userId, profile }) => {
    console.log("👥 New member joined:", profile?.name, "with ID:", userId);
  });

  socket.on("workspaceMemberLeft", ({ userId, leftAt }) => {
  console.log("👋 Member left:", userId, "at", leftAt);
});

};
