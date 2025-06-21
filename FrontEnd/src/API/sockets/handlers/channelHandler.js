// // import socket from "../socketService";
// import { 
//   // setChannelList, 
//   updateChannelInList, 
//   addChannelToList, 
//   removeChannelFromList 
// } from "../../redux_toolkit/api_data/workspaceSlice";

// export default function registerChannelHandlers(socket, dispatch) {
//   const handleChannelUpdated = ({ type, channel }) => {
//     console.log(`📢 Channel ${type}:`, channel);

//     if (type === "created") {
//       channel.id = channel._id;
//       dispatch(addChannelToList(channel));
//     } else if (type === "updated") {
//       dispatch(updateChannelInList(channel));
//     } else if (type === "deleted") {
//       dispatch(removeChannelFromList(channel._id));
//     }
//   };

//   const handleMemberJoined = ({ channelId, userId}) => {
//     const currentUserId = socket.userId;
//     if (userId === currentUserId) {
//       // TODO: Optionally fetch updated channel data here
//       console.log("✅ You joined a new channel:", channelId);
//     }
//   };

//   // const handleMemberLeft = ({ channelId, userId }) => {
//   //   const currentUserId = socket.userId;
//   //   if (userId === currentUserId) {
//   //     dispatch(removeChannelFromList(channelId));
//   //     console.log("❌ You left the channel:", channelId);
//   //   }
//   // };

//   const handleMemberLeft = ({ channelId, userId, profileId }) => {
//   const currentUserId = socket.userId;
//   if (userId === currentUserId) {
//     dispatch(
//       updateChannelInList({
//         _id: channelId,
//         members: `remove:${profileId}`,
//       })
//     );
//     console.log("❌ You left the channel:", channelId);
//   }
// };


//   socket.on("channel:updated", handleChannelUpdated);
//   socket.on("channel:memberJoined", handleMemberJoined);
//   socket.on("channel:memberLeft", handleMemberLeft);

//   return () => {
//     socket.off("channel:updated", handleChannelUpdated);
//     socket.off("channel:memberJoined", handleMemberJoined);
//     socket.off("channel:memberLeft", handleMemberLeft);
//   };
// }


import {
  updateChannelInList,
  addChannelToList,
  removeChannelFromList,
} from "../../redux_toolkit/api_data/workspaceSlice";

export default function registerChannelHandlers(socket, dispatch) {
  // const handleChannelUpdated = ({ type, channel }) => {
  //   console.log(`📢 Channel ${type}:`, channel);

  //   if (type === "created") {
  //     channel.id = channel._id;
  //     dispatch(addChannelToList(channel));
  //   } else if (type === "updated") {
  //     dispatch(updateChannelInList(channel));
  //   } else if (type === "deleted") {
  //     dispatch(removeChannelFromList(channel._id));
  //   }
  // };

  // const handleMemberJoined = ({ channelId, userId, profileId }) => {
  //   const currentUserId = socket.userId;
  //   if (userId === currentUserId) {
  //     console.log("✅ You joined a new channel:", channelId);
  //     dispatch(
  //       updateChannelInList({
  //         _id: channelId,
  //         members: `add:${profileId}`,
  //       })
  //     );
  //   }
  // };

  // const handleMemberLeft = ({ channelId, userId, profileId }) => {
  //   const currentUserId = socket.userId;
  //   if (userId === currentUserId) {
  //     console.log("❌ You left the channel:", channelId);
  //     dispatch(
  //       updateChannelInList({
  //         _id: channelId,
  //         members: `remove:${profileId}`,
  //       })
  //     );
  //   }
  // };

  const handleChannelUpdated = ({ type, channel }) => {
    const msg = {
      created: `🆕 Channel created: ${channel.name}`,
      updated: `✏️ Channel updated: ${channel.name}`,
      deleted: `🗑️ Channel deleted: ${channel.name}`,
    };
    console.log(msg[type]);
    if (type === "created") {
      channel.id = channel._id;
      dispatch(addChannelToList(channel));
    } else if (type === "updated") {
      dispatch(updateChannelInList(channel));
    } else if (type === "deleted") {
      dispatch(removeChannelFromList(channel._id));
    }
  };

  const handleMemberJoined = ({ channelId, userId, profileId }) => {
    const currentUserId = socket.userId;
    if (userId === currentUserId) {
      console.log(`✅ You joined channel ${channelId}`);
      dispatch(updateChannelInList({ _id: channelId, members: `add:${profileId}` }));
    } else {
      console.log(`👥 Member joined channel ${channelId}: ${profileId}`);
    }
  };

const handleMemberLeft = ({ channelId, userId, profileId }) => {
  const currentUserId = socket.userId;
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

