const AppError = require("../utils/appError");

const validateMessageInput = ({
  content,
  senderId,
  conversationId,
  channelId,
  tempId,
  fileIds,
}) => {
  if (!senderId) {
    throw new AppError("Sender ID is required", 400);
  }

  if (!tempId) {
    throw new AppError("Temp ID is required", 400);
  }

  const hasContent = typeof content === "string" && content.trim().length > 0;
  const hasFiles = Array.isArray(fileIds) && fileIds.length > 0;

  if (!hasContent && !hasFiles) {
    throw new AppError("Message must have text or files", 400);
  }

  if (!conversationId && !channelId) {
    throw new AppError("Message must belong to a conversation or channel", 400);
  }

  if (conversationId && channelId) {
    throw new AppError(
      "Message can't belong to both a conversation and a channel",
      400
    );
  }
};

module.exports = validateMessageInput;
