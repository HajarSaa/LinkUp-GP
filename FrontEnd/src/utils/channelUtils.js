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
