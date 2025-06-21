import {
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
} from "../../redux_toolkit/api_data/workspaceSlice";

import { 
  updateChannelMembers, 
  addChannelToBrowseList, 
  removeChannelFromBrowseList
} from "../../redux_toolkit/api_data/channels/browseChannels"; // ✅ NEW

export default function registerChannelHandlers(socket, dispatch) {
  const handleChannelUpdated = ({ type, channel }) => {
    const msg = {
      created: `🆕 Channel created: ${channel.name}`,
      updated: `✏️ Channel updated: ${channel.name}`,
      deleted: `🗑️ Channel deleted: ${channel.name}`,
    };
    console.log(msg[type]);

    channel.id = channel._id; // for consistency

    if (type === "created") {
      dispatch(addChannelToList(channel));
      // ✅ Add to browse if public
      if (channel.type === "public") {
        dispatch(addChannelToBrowseList(channel));
      }
    } else if (type === "updated") {
      dispatch(updateChannelInList(channel));
    } else if (type === "deleted") {
      dispatch(removeChannelFromList(channel._id));
      dispatch(removeChannelFromBrowseList(channel._id));
    }
  };

  const handleMemberJoined = ({ channelId, userId, profileId }) => {
    const currentUserId = socket.userId;

    // ✅ Always update browseChannels
    dispatch(
      updateChannelMembers({ channelId, profileId, type: "add" })
    );

    if (userId === currentUserId) {
      console.log(`✅ You joined channel ${channelId}`);
      dispatch(updateChannelInList({ _id: channelId, members: `add:${profileId}` }));
    } else {
      console.log(`👥 Member joined channel ${channelId}: ${profileId}`);
    }
  };

  const handleMemberLeft = ({ channelId, userId, profileId }) => {
    const currentUserId = socket.userId;

    // ✅ Always update browseChannels
    dispatch(
      updateChannelMembers({ channelId, profileId, type: "remove" })
    );

    if (userId === currentUserId) {
      console.log(`❌ You left channel ${channelId}`);
      dispatch(updateChannelInList({ _id: channelId, members: `remove:${profileId}` }));
    } else {
      console.log(`🚪 Member left channel ${channelId}: ${profileId}`);
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
