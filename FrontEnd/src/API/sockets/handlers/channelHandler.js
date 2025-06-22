import {
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
} from "../../redux_toolkit/api_data/workspaceSlice";

import {
  setChannel,
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
    const currentUserId = socket.userId;
    const isMember = channel.members.includes(currentUserId);

    if (type === "created") {
      dispatch(addChannelToList(channel));
      if (channel.type === "public") {
        dispatch(addChannelToBrowseList(channel));
      }
    } 
    // else if (type === "updated") {
    //   const browseList = store.getState().browseChannels.browseChannels || [];
    //   const updated = browseList.map((ch) =>
    //     ch._id === channel._id ? { ...ch, ...channel } : ch
    //   );
    //   dispatch(setBrowseChannels(updated));

    //   dispatch(updateChannelInList(channel));
    // } 
    // else if (type === "updated") {
    //   const browseList = store.getState().browseChannels.browseChannels || [];
    //   const updatedBrowse = browseList.map((ch) =>
    //     ch._id === channel._id ? { ...ch, ...channel } : ch
    //   );
    //   dispatch(setBrowseChannels(updatedBrowse));

    //   // ✅ check if it's already in the sidebar
    //   const sidebarChannels = store.getState().workspace.workspace?.channels || [];
    //   const alreadyInSidebar = sidebarChannels.some((ch) => ch._id === channel._id);

    //   if (isMember || alreadyInSidebar) {
    //     dispatch(updateChannelInList(channel));
    //   } else {
    //     dispatch(removeChannelFromList(channel._id));
    //   }

    //   // ✅ update opened channel (channelBody, channelHeader)
    //   const currentChannel = store.getState().channel.channel;
    //   if (currentChannel && currentChannel._id === channel._id) {
    //     dispatch(setChannel({ ...currentChannel, ...channel }));
    //   }
    // }
    else if (type === "updated") {
    const browseList = store.getState().browseChannels.browseChannels || [];
    const isInBrowse = browseList.some((ch) => ch._id === channel._id);

    if (channel.type === "public" && !isInBrowse) {
      dispatch(addChannelToBrowseList(channel));
    } else if (channel.type === "private" && isInBrowse) {
      dispatch(removeChannelFromBrowseList(channel._id));
    } else {
      const updated = browseList.map((ch) =>
        ch._id === channel._id ? { ...ch, ...channel } : ch
      );
      dispatch(setBrowseChannels(updated));
    }

    const sidebarList = store.getState().workspace.workspace?.channels || [];
    const existsInSidebar = sidebarList.some((ch) => ch._id === channel._id);

    if (isMember || existsInSidebar) {
      dispatch(updateChannelInList(channel));
    } else {
      dispatch(removeChannelFromList(channel._id));
    }

    const currentChannel = store.getState().channel.channel;
    if (currentChannel && currentChannel._id === channel._id) {
      dispatch({ type: "channel/setChannel", payload: { ...currentChannel, ...channel } });
    }
  }

    else if (type === "deleted") {
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


// import {
//   updateChannelInList,
//   addChannelToList,
//   removeChannelFromList,
// } from "../../redux_toolkit/api_data/workspaceSlice";

// import {
//   updateChannelMembers,
// } from "../../redux_toolkit/api_data/channelSlice";

// import {
//   setBrowseChannels,
//   addChannelToBrowseList,
//   removeChannelFromBrowseList,
// } from "../../redux_toolkit/api_data/channels/browseChannels";

// import store from "../../redux_toolkit/store";

// export default function registerChannelHandlers(socket, dispatch) {
//   const handleChannelUpdated = ({ type, channel }) => {
//     const msg = {
//       created: `🆕 Channel created: ${channel.name}`,
//       updated: `✏️ Channel updated: ${channel.name}`,
//       deleted: `🗑️ Channel deleted: ${channel.name}`,
//     };
//     console.log(msg[type]);

//     channel.id = channel._id;

//     const currentUserId = socket.userId;
//     const isMember = channel.members.includes(currentUserId);
//     // const currentUserId = store.getState().currentUser.currentUser?._id;
//     // const isMember = channel.members.includes(currentUserId);

//     if (type === "created") {
//       if (isMember) {
//         dispatch(addChannelToList(channel));
//       }

//       if (channel.type === "public") {
//         dispatch(addChannelToBrowseList(channel));
//       }
//       console.log("👤 CurrentUser ID (from frontend):", currentUserId);
//       console.log("👤 Channel createdBy:", channel.createdBy);
//       console.log("👥 Channel members:", channel.members);
//     } else if (type === "updated") {
//       const browseList = store.getState().browseChannels.browseChannels || [];
//       const updated = browseList.map((ch) =>
//         ch._id === channel._id ? { ...ch, ...channel } : ch
//       );
//       dispatch(setBrowseChannels(updated));

//       if (isMember) {
//         dispatch(updateChannelInList(channel));
//       } else {
//         dispatch(removeChannelFromList(channel._id));
//       }
//     } else if (type === "deleted") {
//       dispatch(removeChannelFromList(channel._id));
//       dispatch(removeChannelFromBrowseList(channel._id));
//     }
//   };

//   const handleMemberJoined = ({ channelId, userId, profileId }) => {
//     const currentUserId = socket.userId;
//     console.log(
//       userId === currentUserId
//         ? `✅ You joined channel ${channelId}`
//         : `👥 Member joined channel ${channelId}: ${profileId}`
//     );

//     if (userId === currentUserId) {
//       const workspaceChannels = store.getState().workspace.workspace?.channels || [];
//       const alreadyInSidebar = workspaceChannels.find((ch) => ch._id === channelId);

//       if (!alreadyInSidebar) {
//         const browseList = store.getState().browseChannels.browseChannels || [];
//         const joinedChannel = browseList.find((ch) => ch._id === channelId);
//         if (joinedChannel) {
//           dispatch(addChannelToList(joinedChannel));
//         }
//       }
//     }

//     dispatch(
//       updateChannelInList({ _id: channelId, members: `add:${profileId}` })
//     );

//     const currentChannel = store.getState().channel.channel;
//     if (currentChannel && currentChannel._id === channelId) {
//       const newMembers = [...new Set([...currentChannel.members, profileId])];
//       dispatch(updateChannelMembers(newMembers));
//     }

//     const browseList = store.getState().browseChannels.browseChannels || [];
//     const updated = browseList.map((ch) =>
//       ch._id === channelId
//         ? { ...ch, members: [...new Set([...ch.members, profileId])] }
//         : ch
//     );
//     dispatch(setBrowseChannels(updated));
//   };

//   const handleMemberLeft = ({ channelId, userId, profileId }) => {
//     const currentUserId = socket.userId;
//     console.log(
//       userId === currentUserId
//         ? `❌ You left channel ${channelId}`
//         : `🚪 Member left channel ${channelId}: ${profileId}`
//     );

//     if (userId === currentUserId) {
//       dispatch(removeChannelFromList(channelId));
//     }

//     dispatch(
//       updateChannelInList({ _id: channelId, members: `remove:${profileId}` })
//     );

//     const currentChannel = store.getState().channel.channel;
//     if (currentChannel && currentChannel._id === channelId) {
//       const newMembers = currentChannel.members.filter(
//         (id) => id !== profileId
//       );
//       dispatch(updateChannelMembers(newMembers));
//     }

//     const browseList = store.getState().browseChannels.browseChannels || [];
//     const updated = browseList.map((ch) =>
//       ch._id === channelId
//         ? { ...ch, members: ch.members.filter((id) => id !== profileId) }
//         : ch
//     );
//     dispatch(setBrowseChannels(updated));
//   };

//   socket.on("channel:updated", handleChannelUpdated);
//   socket.on("channel:memberJoined", handleMemberJoined);
//   socket.on("channel:memberLeft", handleMemberLeft);

//   return () => {
//     socket.off("channel:updated", handleChannelUpdated);
//     socket.off("channel:memberJoined", handleMemberJoined);
//     socket.off("channel:memberLeft", handleMemberLeft);
//   };
// }
