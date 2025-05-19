export const getWorkLabel = (name) => {
  const words = name.split(/[-_]+/);
  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const getRandomColorFromPalette = (colorPalette = null) => {
  const defaultPalette = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#FF9633",
    "#33FFF6",
    "#8D33FF",
    "#FFDB33",
  ];

  const palette = colorPalette || defaultPalette;
  return palette[Math.floor(Math.random() * palette.length)];
};

// find member

export const findMemberById = (workspace, memberOneId, memberTwoId) => {
  if (!workspace || !memberOneId) return null;

  const my_data = workspace.members.find(
    (member) => member.user === workspace.createdBy
  );
  const myMemberId = my_data._id

  if (memberOneId === memberTwoId) {
    if (memberOneId === myMemberId)
      return {
        member:
          workspace.members.find((member) => member._id === myMemberId) ||
          null,
        isMe: true,
      };
  }

  return {
    member:
      workspace.members.find((member) => member._id !== myMemberId) || null,
    isMe: false,
  };
};
