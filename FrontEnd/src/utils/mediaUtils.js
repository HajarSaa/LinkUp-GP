export const getAttachedFiles = (message, channelMedia) => {
  if (!message?.attachments || !channelMedia) return [];
  return channelMedia.filter((file) => message.attachments.includes(file._id));
};
