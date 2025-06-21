export const getWorkLabel = (name) => {
  const words = name.split(/[-_\s]+/);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
};


// find member by Id
export const findMemberById = (workspace, memberId) => {
  if (!workspace || !memberId) return null;

  return workspace.members.find((member) => member._id === memberId) || null;
};

//===========(find member user login information )==========
export const findMemberByUserId = (workspace) => {
  if (!workspace) return null;

  let userId = null;
  try {
    const current_user = JSON.parse(localStorage.getItem("currentUser"));
    userId = current_user?._id;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
  return workspace.members.find((member) => member.user === userId) || null;
};

// ===========(Get My conversations)==========
// export const getMyConversations = (workspace) => {
//   if (!workspace || !workspace.members || !workspace.conversations) return [];

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

//   const conversations = workspace.conversations
//     .filter(
//       (conv) =>
//         conv.memberOneId === myMemberId || conv.memberTwoId === myMemberId
//     )
//     .map((conv) => {
//       const otherMemberId =
//         conv.memberOneId === myMemberId ? conv.memberTwoId : conv.memberOneId;

//       const memberId =
//         conv.memberOneId === conv.memberTwoId ? myMemberId : otherMemberId;

//       const member = findMemberById(workspace, memberId);

//       return {
//         conversationId: conv._id,
//         member,
//         isMe: memberId === myMemberId,
//         lastUpdated: conv.updatedAt,
//         isSelfChat: conv.memberOneId === conv.memberTwoId,
//       };
//     });

//   return conversations.sort((a, b) => {
//     if (a.isSelfChat) return -1;
//     if (b.isSelfChat) return 1;
//     return new Date(b.lastUpdated) - new Date(a.lastUpdated);
//   });
// };

export const getMyConversations = (workspace) => {
  if (!workspace || !workspace.members || !workspace.conversations) return [];

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

  const conversations = workspace.conversations
    .filter(
      (conv) =>
        conv.memberOneId === myMemberId || conv.memberTwoId === myMemberId
    )
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

  return conversations.sort((a, b) => {
    if (a.isSelfChat) return -1;
    if (b.isSelfChat) return 1;
    return new Date(b.lastUpdated) - new Date(a.lastUpdated);
  });
};

// ============(Get Channel Members)================
export const getMembersData = (channel, workspace) => {
  if (!channel || !workspace || !workspace.members) return [];

  let userId = null;

  try {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    userId = storedUser?._id;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return [];
  }

  const memebersArray = channel.members.map((memberId) => {
    const member = findMemberById(workspace, memberId);
    return {
      ...member,
      isMe: member?.user === userId,
    };
  });

  return memebersArray.sort((a, b) => (b.isMe === true) - (a.isMe === true));
};

//====================(updateCreationDataField)========
export function updateCreationDataField(key, value) {
  const existing = JSON.parse(localStorage.getItem("creation_data")) || {};
  const updated = {
    ...existing,
    [key]: {
      ...existing[key],
      ...value,
    },
  };
  localStorage.setItem("creation_data", JSON.stringify(updated));
}
