import { createSelector } from "reselect";

const selectPinnedMessagesState = (state) => state.pinnedChannelMessages;

export const selectPinnedMessagesByChannel = createSelector(
  [selectPinnedMessagesState, (_, channel_id) => channel_id],
  (pinnedMessages, channel_id) => pinnedMessages[channel_id] || []
);
