// import socket from "../socketService";
import { 
  // setChannelList, 
  updateChannelInList, 
  addChannelToList, 
  removeChannelFromList 
} from "../../redux_toolkit/api_data/workspaceSlice";

export default function registerChannelHandlers(socket, dispatch) {
  const handleChannelUpdated = ({ type, channel }) => {
    console.log(`📢 Channel ${type}:`, channel);

    if (type === "created") {
      channel.id = channel._id;
      console.log("✅ ADDING channel to list:", channel);
      dispatch(addChannelToList(channel));
    } else if (type === "updated") {
      dispatch(updateChannelInList(channel));
    } else if (type === "deleted") {
      dispatch(removeChannelFromList(channel._id));
    }
  };

  const handleMemberJoined = ({ channelId, userId, profileId, joinedAt }) => {
    console.log(`👥 User with ID: ${userId} joined channel ${channelId}: at ${joinedAt}`, profileId);
    // Optional: dispatch action to update channel members
  };

  const handleMemberLeft = ({ channelId, userId, profileId, leftAt }) => {
    console.log(`👋 User with ID: ${userId} left channel ${channelId}: at ${leftAt}`, profileId);
    // Optional: dispatch action to update channel members
  };

  socket.on("channel:updated", handleChannelUpdated);
  socket.on("channel:memberJoined", handleMemberJoined);
  socket.on("channel:memberLeft", handleMemberLeft);

  return () => {
    socket.off("channel:updated", handleChannelUpdated);
    socket.off("channel:memberJoined", handleMemberJoined);
    socket.off("channel:memberLeft", handleMemberLeft);
  };
}
