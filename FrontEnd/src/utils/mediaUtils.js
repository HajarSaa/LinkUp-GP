export const getAttachedFiles = (message, channelMedia) => {
  if (!message?.attachments || !channelMedia) return [];

  const attachmentIds = message.attachments.map((att) =>
    typeof att === "string" ? att : att._id
  );

  return channelMedia.filter((file) => attachmentIds.includes(file._id));
};
