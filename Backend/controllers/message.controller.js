import mongoose from "mongoose";
import Channel from "../models/channel.model.js";
import Conversation from "../models/converstion.model.js";
import Message from "../models/message.model.js";
import File from "../models/file.model.js";
import UserProfile from "../models/userProfile.model.js";
import Notification from "../models/notification.model.js";
import LaterItem from "../models/laterItem.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { getAll } from "../utils/handlerFactory.js";
import { MetadataService } from "../utils/MetadataService.js";

export const getAllMessages = getAll(Message);

export const getChannelMessages = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Check if the channel exists
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 10 messages per page
  const skip = (page - 1) * limit;

  // Get all messages in channel that are not replies
  const messages = await Message.find({ channelId, parentMessageId: null })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const messageIds = messages.map((msg) => msg._id);

  const savedLaterItems = await LaterItem.find({
    userProfile: req.userProfile.id,
    messageId: { $in: messageIds },
  }).select("messageId");

  const savedIdsSet = new Set(
    savedLaterItems.map((item) => item.messageId.toString())
  );

  const enhancedMessages = messages.map((msg) => ({
    ...msg,
    savedForLater: savedIdsSet.has(msg._id.toString()),
  }));

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages: enhancedMessages,
    },
  });
});

export const getChannelPinnedMessages = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;

  // Check if the channel exists
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Get all pinned messages in channel
  const messages = await Message.find({ channelId, pinned: true }).lean();

  const messageIds = messages.map((msg) => msg._id);

  const savedItems = await LaterItem.find({
    userProfile: req.userProfile.id,
    messageId: { $in: messageIds },
  }).select("messageId");

  const savedIdsSet = new Set(
    savedItems.map((item) => item.messageId.toString())
  );

  const enhancedMessages = messages.map((msg) => ({
    ...msg,
    savedForLater: savedIdsSet.has(msg._id.toString()),
  }));

  // send the response
  res.status(200).json({
    status: "success",
    data: {
      messages: enhancedMessages,
    },
  });
});

export const getConversationPinnedMessages = catchAsync(
  async (req, res, next) => {
    const conversationId = req.params.id;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return next(new AppError("No conversation found with that ID", 404));
    }

    // Get all pinned messages in conversation
    const messages = await Message.find({
      conversationId,
      pinned: true,
    }).lean();

    const messageIds = messages.map((msg) => msg._id);

    const savedItems = await LaterItem.find({
      userProfile: req.userProfile.id,
      messageId: { $in: messageIds },
    }).select("messageId");

    const savedIdsSet = new Set(
      savedItems.map((item) => item.messageId.toString())
    );

    const enhancedMessages = messages.map((msg) => ({
      ...msg,
      savedForLater: savedIdsSet.has(msg._id.toString()),
    }));

    // send the response
    res.status(200).json({
      status: "success",
      data: {
        messages: enhancedMessages,
      },
    });
  }
);

export const getChannelMedia = catchAsync(async (req, res, next) => {
  const channelId = req.params.id;
  // Check if the channel exists
  const channel = await Channel.findById(channelId);
  if (!channel) {
    return next(new AppError("No channel found with that ID", 404));
  }

  // Get all media in channel that are attached to messages
  const media = await File.find({
    channelId,
    attachedToMessage: { $ne: null },
  });

  // send response
  res.status(200).json({
    status: "success",
    data: {
      media: media || [],
    },
  });
});

export const getConversationMessages = catchAsync(async (req, res, next) => {
  const conversationId = req.params.id;

  // Check if the conversation exists
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return next(new AppError("No conversation found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 20 messages per page
  const skip = (page - 1) * limit;

  // Get all messages in conversation that are not replies
  const messages = await Message.find({ conversationId, parentMessageId: null })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const messageIds = messages.map((msg) => msg._id);

  const savedItems = await LaterItem.find({
    userProfile: req.userProfile.id,
    messageId: { $in: messageIds },
  }).select("messageId");

  const savedIdsSet = new Set(
    savedItems.map((item) => item.messageId.toString())
  );

  const enhancedMessages = messages.map((msg) => ({
    ...msg,
    savedForLater: savedIdsSet.has(msg._id.toString()),
  }));

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages: enhancedMessages,
    },
  });
});

export const getConversationMedia = catchAsync(async (req, res, next) => {
  const conversationId = req.params.id;
  // Check if the channel exists
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return next(new AppError("No conversation found with that ID", 404));
  }

  // Get all media in conversation that are attached to messages
  const media = await File.find({
    conversationId,
    attachedToMessage: { $ne: null },
  });

  // send response
  res.status(200).json({
    status: "success",
    data: {
      media: media || [],
    },
  });
});

export const getThread = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;

  // Check if the message exists
  const message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Apply pagination to the "messages" field
  const page = req.query.page * 1 || 1; // Default to page 1
  const limit = req.query.limit * 1 || 20; // Default to 20 messages per page
  const skip = (page - 1) * limit;

  // Get all replies to this message
  const replies = await Message.find({ parentMessageId: messageId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: 1 })
    .lean();

  const replyIds = replies.map((msg) => msg._id);

  const savedItems = await LaterItem.find({
    userProfile: req.userProfile.id,
    messageId: { $in: replyIds },
  }).select("messageId");

  const savedIdsSet = new Set(
    savedItems.map((item) => item.messageId.toString())
  );

  const enhancedReplies = replies.map((msg) => ({
    ...msg,
    savedForLater: savedIdsSet.has(msg._id.toString()),
  }));

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      messages: enhancedReplies,
    },
  });
});

export const getMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const createMessage = catchAsync(async (req, res, next) => {
  const { content, attachmentIds = [] } = req.body;

  // Validate that either content or attachments exist
  if (!content && attachmentIds.length === 0) {
    return next(new AppError("Message must have content or attachments", 400));
  }

  // Determine message type
  let messageType = "text";
  if (attachmentIds.length > 0 && content) {
    messageType = "mixed";
  } else if (attachmentIds.length > 0 && !content) {
    messageType = "file";
  }

  // Attach data into request body
  req.body.createdBy = req.userProfile.id;
  req.body.messageType = messageType;
  req.body.attachments = attachmentIds;

  // Attach channelId or conversationId from request parameters
  if (req.params.channelId) {
    // Check if the channel exists
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return next(new AppError("No channel found with that ID", 404));
    }

    // Check if the user is a member of the channel
    if (!channel.members.includes(req.userProfile.id)) {
      return next(new AppError("You are not a member of this channel", 403));
    }

    req.body.channelId = req.params.channelId;
  }
  if (req.params.conversationId) {
    // Check if the conversation exists
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return next(new AppError("No conversation found with that ID", 404));
    }

    // check if the user is a participant in the conversation
    if (
      !(
        req.userProfile.id === conversation.memberOneId.toString() ||
        req.userProfile.id === conversation.memberTwoId.toString()
      )
    ) {
      return next(
        new AppError("You are not a participant in this conversation", 403)
      );
    }

    req.body.conversationId = req.params.conversationId;
  }

  // If this message is a reply (has a parentMessageId)
  if (req.body.parentMessageId) {
    // Check if the parent message exists
    const parentMessage = await Message.findById(req.body.parentMessageId);
    if (!parentMessage) {
      return next(new AppError("No parent message found with that ID", 404));
    }

    // Increment threadCount and add user to threadParticipants if not already present and if the user is already a participant make him the last in threadParticipants
    await Message.findByIdAndUpdate(req.body.parentMessageId, [
      {
        $set: {
          threadCount: { $add: ["$threadCount", 1] },
          threadParticipants: {
            $cond: [
              { $in: [req.userProfile.id, "$threadParticipants"] },
              {
                $concatArrays: [
                  {
                    $filter: {
                      input: "$threadParticipants",
                      cond: { $ne: ["$$this", req.userProfile.id] },
                    },
                  },
                  [req.userProfile.id],
                ],
              },
              { $concatArrays: ["$threadParticipants", [req.userProfile.id]] },
            ],
          },
        },
      },
    ]);

    // Update last repliedAt
    await Message.findByIdAndUpdate(req.body.parentMessageId, {
      lastRepliedAt: new Date(),
    });

    // notification for reply
    if (parentMessage.createdBy.toString() !== req.userProfile.id) {
      await Notification.create({
        type: "reply",
        recipient: parentMessage.createdBy,
        triggeredBy: req.userProfile.id,
        messageId: parentMessage._id,
      });
    }
  }

  // Step 1: Extract URLs
  const urls = MetadataService.extractLinks(content);

  // Step 2: Fetch metadata (no caching)
  const linkMetadata = await Promise.all(
    urls.map((url) => MetadataService.fetchMetadata(url))
  );
  req.body.metadata = { links: linkMetadata };

  // create the message
  const message = await Message.create(req.body);

  // mention notifications
  const mentionRegex = /@(\w+)/g;
  const mentionedUsernames = [...(content?.matchAll(mentionRegex) || [])].map(
    (m) => m[1]
  );

  if (mentionedUsernames.length > 0) {
    const mentionedProfiles = await UserProfile.find({
      userName: { $in: mentionedUsernames },
      workspace: req.workspace.id,
    });

    for (const profile of mentionedProfiles) {
      if (profile._id.toString() !== req.userProfile.id) {
        await Notification.create({
          type: "mention",
          recipient: profile._id,
          triggeredBy: req.userProfile.id,
          messageId: message._id,
        });
      }
    }
  }

  // Update attached files
  if (attachmentIds.length > 0) {
    await File.updateMany(
      { _id: { $in: attachmentIds } },
      {
        attachedToMessage: message._id,
        status: "attachment",
      }
    );
  }

  res.status(201).json({
    status: "success",
    data: {
      message,
    },
  });
});

export const updateMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  // Check if the message exists
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Check if the user is the creator of the message
  if (message.createdBy.toString() !== req.userProfile.id) {
    return next(
      new AppError("You are not authorized to update this message", 403)
    );
  }

  // Update the message content
  if (req.body.content !== undefined && req.body.content.trim() !== "")
    message.content = req.body.content;

  await message.save();

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});

//
export const deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  // Check if the message exists
  if (!message) {
    return next(new AppError("No message found with that ID", 404));
  }

  // Check if the user is the creator of the message
  if (message.createdBy.toString() !== req.userProfile.id) {
    return next(
      new AppError("You are not authorized to delete this message", 403)
    );
  }

  // If this message is a reply (has a parentMessageId)
  if (message.parentMessageId) {
    // Decrement threadCount
    await Message.findByIdAndUpdate(message.parentMessageId, {
      $inc: { threadCount: -1 },
    });

    // Check if the user has any other replies in this thread
    const otherReplies = await Message.findOne({
      parentMessageId: message.parentMessageId,
      createdBy: message.createdBy,
      _id: { $ne: message._id },
    });

    // If not, remove the user from threadParticipants
    if (!otherReplies) {
      await Message.findByIdAndUpdate(message.parentMessageId, {
        $pull: { threadParticipants: message.createdBy },
      });
    }
  }

  // Delete the message
  await message.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const togglePinMessage = catchAsync(async (req, res, next) => {
  const messageId = req.params.id;
  const userId = req.user._id;
  const pinValue = req.query.pin ?? req.body.pin;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    return next(new AppError("Invalid message ID", 400));
  }

  if (typeof pinValue === "undefined") {
    return next(new AppError("Pin value is required", 400));
  }

  const pin = pinValue === true || pinValue === "true";

  const message = await Message.findById(messageId);
  if (!message) {
    return next(new AppError("No message found with this ID", 404));
  }

  const workspaceId = message.channelId
    ? (await Channel.findById(message.channelId)).workspaceId
    : (await Conversation.findById(message.conversationId)).workspaceId;

  const userProfile = await UserProfile.findOne({
    user: userId,
    workspace: workspaceId,
  });

  if (!userProfile) {
    return next(new AppError("You are not member in this workspace", 403));
  }

  message.pinned = pin;
  message.pinnedBy = pin ? userProfile._id : null;
  await message.save();

  res.status(200).json({
    status: "success",
    data: {
      messageId: message._id,
      pinned: message.pinned,
      pinnedBy: message.pinnedBy,
    },
  });
});

export const forwardMessage = catchAsync(async (req, res, next) => {
  const { originalMessageId, targets } = req.body;

  if (!originalMessageId || !Array.isArray(targets) || targets.length === 0) {
    return next(new AppError("Missing original MessageId or targets", 400));
  }

  const originalMessage = await Message.findById(originalMessageId).lean();
  if (!originalMessage) {
    return next(new AppError("Original message not found", 404));
  }

  const forwardedMessages = [];
  for (const target of targets) {
    const { type, id } = target;

    if (type === "conversation") {
      const conversation = await Conversation.findById(id);
      if (!conversation) {
        return next(new AppError(`Conversation not found: ${id}`, 404));
      }

      const userProfileId = req.userProfile.id;
      if (
        userProfileId !== conversation.memberOneId.toString() &&
        userProfileId !== conversation.memberTwoId.toString()
      ) {
        return next(
          new AppError("You are not a member of this conversation", 403)
        );
      }

      const forwarded = await Message.create({
        content: originalMessage.content,
        attachments: originalMessage.attachments || [],
        createdBy: userProfileId,
        messageType: originalMessage.messageType,
        forwarded: true,
        conversationId: id,
      });

      forwardedMessages.push(forwarded);
    }

    if (type === "channel") {
      const channel = await Channel.findById(id);
      if (!channel) {
        return next(new AppError(`Channel not found: ${id}`, 404));
      }

      if (!channel.members.includes(req.userProfile.id)) {
        return next(new AppError("You are not a member of this channel", 403));
      }

      const forwarded = await Message.create({
        content: originalMessage.content,
        attachments: originalMessage.attachments || [],
        createdBy: req.userProfile.id,
        messageType: originalMessage.messageType,
        forwarded: true,
        channelId: id,
      });

      forwardedMessages.push(forwarded);
    }
  }

  res.status(201).json({
    status: "success",
    data: {
      forwardedMessages,
    },
  });
});
