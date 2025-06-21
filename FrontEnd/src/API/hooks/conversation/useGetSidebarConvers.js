import { findMemberById } from "../../../utils/workspaceUtils";

function useGetSidebarConvers(workspace) {
  const workConvers = workspace.conversations;
  const logged_user_data = JSON.parse(localStorage.getItem("logged_user_data"));
  const myMemberId = logged_user_data.memberId;
  const converses = workConvers
    .map((conv) => {
      const otherMemberId =
        conv.memberOneId === myMemberId ? conv.memberTwoId : conv.memberOneId;

      const memberId =
        conv.memberOneId === conv.memberTwoId ? myMemberId : otherMemberId;

      const member = findMemberById(workspace, memberId);
      if (!member) return null; // ✅ prevent crash

      return {
        conversationId: conv._id,
        member,
        isMe: memberId === myMemberId,
        lastUpdated: conv.updatedAt,
        isSelfChat: conv.memberOneId === conv.memberTwoId,
      };
    })
    .filter(Boolean); // ✅ filter out nulls

  // sort chat => me first , the the oldest members first the newest
  return converses.sort((a, b) => {
    if (a.isSelfChat) return -1;
    if (b.isSelfChat) return 1;
    return new Date(a.lastUpdated) - new Date(b.lastUpdated);
  });
}

export default useGetSidebarConvers;
