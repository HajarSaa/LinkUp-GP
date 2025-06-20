// import { findMemberByUserId } from "./workspaceUtils";

// export const isChannelOwner = function (channel, workspace) {
//   if (!channel || !workspace) return null;

//   let userId = null;
//   try {
//     const current_user = JSON.parse(localStorage.getItem("currentUser"));
//     userId = current_user?._id;
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error);
//     return null;
//   }
//   const member =
//     workspace.members.find((member) => member.user === userId) || null;

//   return channel.createdBy === member._id;
// };
// // =======================

// // use in leaving & deleting
// export const getNearestChannel = function (current_id, worspace) {
//   if (!current_id || !worspace) return;
//   const myChannels = getMyChannelsOnly(worspace);
//   const channel_el = myChannels?.find((channel) => channel.id === current_id);
//   const index = myChannels.indexOf(channel_el);
//   const next_index = index === 0 ? 1 : index - 1;
//   return myChannels[next_index].id;
// };

// // ============(Get My Channels)================
// export const getMyChannelsOnly = (workspace) => {
//   if (!workspace || !workspace.channels || !workspace.members) return [];

//   let userId = null;

//   try {
//     const storedUser = JSON.parse(localStorage.getItem("currentUser"));
//     userId = storedUser?._id;
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error);
//     return [];
//   }

//   const myMember = workspace.members.find((member) => member.user === userId);
//   const myMemberId = myMember?._id;

//   if (!myMemberId) return [];

//   return workspace.channels.filter((channel) =>
//     channel.members.includes(myMemberId)
//   );
// };

// // ======================(is Member in this channel)
// export const isAChannelMember = (workspace, channel) => {
//   const me = findMemberByUserId(workspace);
//   return channel.members.includes(me._id);
// };


import { findMemberByUserId } from "./workspaceUtils";

export const isChannelOwner = function (channel, workspace) {
  if (!channel || !workspace) return null;

  let userId = null;
  try {
    const current_user = JSON.parse(localStorage.getItem("currentUser"));
    userId = current_user?._id;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
  const member =
    workspace.members.find((member) => member.user === userId) || null;

  return channel.createdBy === member._id;
};

// use in leaving & deleting
export const getNearestChannel = function (current_id, workspace) {
  if (!current_id || !workspace) return;
  const myChannels = getMyChannelsOnly(workspace);
  if (!Array.isArray(myChannels) || myChannels.length === 0) return null;

  const channel_el = myChannels?.find((channel) => channel.id === current_id);
  const index = myChannels.indexOf(channel_el);
  const next_index = index === 0 ? 1 : index - 1;
  return myChannels[next_index]?.id;
};

// Get My Channels
export const getMyChannelsOnly = (workspace) => {
  if (!workspace || !workspace.channels || !workspace.members) return [];

  let userId = null;

  try {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = storedUser?._id;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return [];
  }

  const myMember = workspace.members.find((member) => member.user === userId);
  const myMemberId = myMember?._id;

  if (!myMemberId) return [];

  return workspace.channels.filter(
    (channel) => Array.isArray(channel.members) && channel.members.includes(myMemberId)
  );
};

// Is Member in this channel
export const isAChannelMember = (workspace, channel) => {
  const me = findMemberByUserId(workspace);
  return Array.isArray(channel.members) && channel.members.includes(me._id);
};
