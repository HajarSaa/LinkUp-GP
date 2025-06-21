import {
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
} from "../../redux_toolkit/api_data/workspaceSlice";

import {
  updateChannelMembers,
} from "../../redux_toolkit/api_data/channelSlice";

import {
  setBrowseChannels,
  addChannelToBrowseList,
  removeChannelFromBrowseList,
} from "../../redux_toolkit/api_data/channels/browseChannels";

import store from "../../redux_toolkit/store";

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
    console.log(
      userId === currentUserId
        ? `✅ You joined channel ${channelId}`
        : `👥 Member joined channel ${channelId}: ${profileId}`
    );

    // ✅ Update workspace.channels
    dispatch(
      updateChannelInList({ _id: channelId, members: `add:${profileId}` })
    );

    // ✅ Update current channel if it's open
    const currentChannel = store.getState().channel.channel;
    if (currentChannel && currentChannel._id === channelId) {
      const newMembers = [...new Set([...currentChannel.members, profileId])];
      dispatch(updateChannelMembers(newMembers));
    }

    // ✅ Update browseChannels
    const browseList = store.getState().browseChannels.browseChannels || [];
    const updated = browseList.map((ch) =>
      ch._id === channelId
        ? { ...ch, members: [...new Set([...ch.members, profileId])] }
        : ch
    );
    dispatch(setBrowseChannels(updated));
  };

  const handleMemberLeft = ({ channelId, userId, profileId }) => {
    const currentUserId = socket.userId;
    console.log(
      userId === currentUserId
        ? `❌ You left channel ${channelId}`
        : `🚪 Member left channel ${channelId}: ${profileId}`
    );

    // ✅ Update workspace.channels
    dispatch(
      updateChannelInList({ _id: channelId, members: `remove:${profileId}` })
    );

    // ✅ Update current channel if it's open
    const currentChannel = store.getState().channel.channel;
    if (currentChannel && currentChannel._id === channelId) {
      const newMembers = currentChannel.members.filter(
        (id) => id !== profileId
      );
      dispatch(updateChannelMembers(newMembers));
    }

    // ✅ Update browseChannels
    const browseList = store.getState().browseChannels.browseChannels || [];
    const updated = browseList.map((ch) =>
      ch._id === channelId
        ? { ...ch, members: ch.members.filter((id) => id !== profileId) }
        : ch
    );
    dispatch(setBrowseChannels(updated));
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
