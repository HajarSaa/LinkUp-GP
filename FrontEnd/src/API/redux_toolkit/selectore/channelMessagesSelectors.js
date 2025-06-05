import { createSelector } from "reselect";

const selectChannelMessagesState = (state) => state.channel_messages;

export const selectMessagesByChannel = createSelector(
  [selectChannelMessagesState, (_, channel_id) => channel_id],
  (channelMessages, channel_id) =>
    channelMessages.messagesByChannel[channel_id] || []
);
