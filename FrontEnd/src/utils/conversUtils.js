export const chatMate = (conversation, workspaceMembers, logged_user) => {
  if (!conversation || !workspaceMembers || !logged_user) return null;

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

  const foundMember = workspaceMembers.find(
    (member) => member._id === otherMemberId
  );

  if (!foundMember) return null;

  return {
    ...foundMember,
    isMe: foundMember.user === userId,
  };
};
