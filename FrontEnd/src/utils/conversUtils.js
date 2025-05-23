export const getConversationPartner = (conversation, workspaceMembers) => {
  if (!conversation || !workspaceMembers || !workspaceMembers.length)
    return null;

  let userId;

  try {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = storedUser?._id;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }

  const myMembership = workspaceMembers.find(
    (member) => member.user === userId
  );
  if (!myMembership) return null;

  const myMemberId = myMembership._id;
  const { memberOneId, memberTwoId } = conversation;

  const otherMemberId =
    memberOneId === memberTwoId
      ? memberOneId
      : memberOneId === myMemberId
      ? memberTwoId
      : memberOneId;

  return (
    workspaceMembers.find((member) => member._id === otherMemberId) || null
  );
};
