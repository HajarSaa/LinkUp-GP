import mongoose from "mongoose";
import Message from "../models/message.model.js";
import Channel from "../models/channel.model.js";
import Conversation from "../models/converstion.model.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const searchMessages = catchAsync(async (req, res, next) => {
  const { keyword, user, channel, conversation, startDate, endDate } =
    req.query;
  const workspaceId = req.workspace.id;
  const currentUserId = req.userProfile.id;

  const query = {
    $or: [],
  };

  // Validate the search query
  if (!keyword || keyword.trim() === "") {
    return next(new AppError("Search query cannot be empty", 400));
  }

  // Keyword search
  const keywordQuery = { $regex: keyword, $options: "i" };

  // Get channels the user is a member of
  const userChannels = await Channel.find({
    workspaceId,
    members: currentUserId,
  }).select("_id");

  // Get conversations the user is part of
  const userConversations = await Conversation.find({
    workspaceId,
    $or: [{ memberOneId: currentUserId }, { memberTwoId: currentUserId }],
  }).select("_id");

  // If channel filter is provided
  if (channel) {
    const channelMessagesQuery = {
      channelId: { $in: userChannels.map((c) => c._id) },
      content: keywordQuery,
    };

    if (!mongoose.Types.ObjectId.isValid(channel)) {
      return next(new AppError("Invalid channel ID format", 400));
    }
    // Verify user is a member of this channel
    const isMember = userChannels.some((c) => c._id.equals(channel));
    if (!isMember) {
      return next(new AppError("You don't have access to this channel", 403));
    }
    channelMessagesQuery.channelId = new mongoose.Types.ObjectId(channel);

    if (user) {
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return next(new AppError("Invalid user ID format", 400));
      }
      channelMessagesQuery.createdBy = new mongoose.Types.ObjectId(user);
    }

    if (startDate || endDate) {
      channelMessagesQuery.createdAt = {};
      if (startDate) channelMessagesQuery.createdAt.$gte = new Date(startDate);
      if (endDate) channelMessagesQuery.createdAt.$lte = new Date(endDate);
    }

    query.$or.push(channelMessagesQuery);
  }
  // If conversation filter is provided
  else if (conversation) {
    const conversationMessagesQuery = {
      conversationId: { $in: userConversations.map((c) => c._id) },
      content: keywordQuery,
    };

    if (!mongoose.Types.ObjectId.isValid(conversation)) {
      return next(new AppError("Invalid conversation ID format", 400));
    }
    // Verify user is part of this conversation
    const isParticipant = userConversations.some((c) =>
      c._id.equals(conversation)
    );
    if (!isParticipant) {
      return next(
        new AppError("You don't have access to this conversation", 403)
      );
    }
    conversationMessagesQuery.conversationId = new mongoose.Types.ObjectId(
      conversation
    );

    if (user) {
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return next(new AppError("Invalid user ID format", 400));
      }
      conversationMessagesQuery.createdBy = new mongoose.Types.ObjectId(user);
    }

    if (startDate || endDate) {
      conversationMessagesQuery.createdAt = {};
      if (startDate)
        conversationMessagesQuery.createdAt.$gte = new Date(startDate);
      if (endDate) conversationMessagesQuery.createdAt.$lte = new Date(endDate);
    }

    query.$or.push(conversationMessagesQuery);
  }
  // If no channel or conversation filter is provided, search in all channels and conversations the user is part of
  else {
    // Build channel messages query for all user channels
    if (userChannels.length > 0) {
      const channelMessagesQuery = {
        channelId: { $in: userChannels.map((c) => c._id) },
        content: keywordQuery,
      };

      if (user) {
        if (!mongoose.Types.ObjectId.isValid(user)) {
          return next(new AppError("Invalid user ID format", 400));
        }
        channelMessagesQuery.createdBy = new mongoose.Types.ObjectId(user);
      }

      if (startDate || endDate) {
        channelMessagesQuery.createdAt = {};
        if (startDate)
          channelMessagesQuery.createdAt.$gte = new Date(startDate);
        if (endDate) channelMessagesQuery.createdAt.$lte = new Date(endDate);
      }

      query.$or.push(channelMessagesQuery);
    }

    // Build conversation messages query for all user conversations
    if (userConversations.length > 0) {
      const conversationMessagesQuery = {
        conversationId: { $in: userConversations.map((c) => c._id) },
        content: keywordQuery,
      };

      if (user) {
        if (!mongoose.Types.ObjectId.isValid(user)) {
          return next(new AppError("Invalid user ID format", 400));
        }
        conversationMessagesQuery.createdBy = new mongoose.Types.ObjectId(user);
      }

      if (startDate || endDate) {
        conversationMessagesQuery.createdAt = {};
        if (startDate)
          conversationMessagesQuery.createdAt.$gte = new Date(startDate);
        if (endDate)
          conversationMessagesQuery.createdAt.$lte = new Date(endDate);
      }

      query.$or.push(conversationMessagesQuery);
    }
  }

  // If no channels or conversations found where user is a member
  if (query.$or.length === 0) {
    return res.status(200).json({
      status: "success",
      results: 0,
      data: {
        messages: [],
      },
    });
  }

  // Execute the query
  const results = await Message.find(query)
    .sort({ createdAt: -1 })
    // .populate("attachments", "_id fileName fileType uploadedBy")
    .populate("createdBy", "userName")
    .populate({
      path: "channelId",
      select: "name ",
      match: { _id: { $exists: true } },
    })
    .populate({
      path: "conversationId",
      select: "memberOneId memberTwoId",
      match: { _id: { $exists: true } },
      populate: [
        {
          path: "memberOneId",
          select: "username ",
        },
        {
          path: "memberTwoId",
          select: "username ",
        },
      ],
    })
    .lean()
    .transform((docs) => {
      return docs.map((doc) => {
        doc.attachments = []; // Set attachments to empty array
        return doc;
      });
    });

  res.status(200).json({
    status: "success",
    results: results.length,
    data: {
      messages: results,
    },
  });
});
