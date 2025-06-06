export const chatMate = (conversation, workspaceMembers,logged_user) => {
  if (
    !conversation ||
    !workspaceMembers ||
    !logged_user
  )
    return null;

  const userId = logged_user._id;

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
