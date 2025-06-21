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
