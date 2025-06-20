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
      dispatch(addChannelToList(channel));
    } else if (type === "updated") {
      dispatch(updateChannelInList(channel));
    } else if (type === "deleted") {
      dispatch(removeChannelFromList(channel._id));
    }
  };

  const handleMemberJoined = ({ channelId, userId}) => {
    const currentUserId = socket.userId;
    if (userId === currentUserId) {
      // TODO: Optionally fetch updated channel data here
      console.log("✅ You joined a new channel:", channelId);
    }
  };

  // const handleMemberLeft = ({ channelId, userId }) => {
  //   const currentUserId = socket.userId;
  //   if (userId === currentUserId) {
  //     dispatch(removeChannelFromList(channelId));
  //     console.log("❌ You left the channel:", channelId);
  //   }
  // };

  const handleMemberLeft = ({ channelId, userId, profileId }) => {
  const currentUserId = socket.userId;
  if (userId === currentUserId) {
    dispatch(
      updateChannelInList({
        _id: channelId,
        members: `remove:${profileId}`,
      })
    );
    console.log("❌ You left the channel:", channelId);
  }
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
