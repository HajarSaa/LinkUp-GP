// selectPinnedMessagesSelector.js

import { createSelector } from "reselect";

const selectPinnedConversationMessagesState = (state) =>
  state.pinnedConverMessages;

export const selectPinnedMessagesByConversation = createSelector(
  [selectPinnedConversationMessagesState, (_, convers_id) => convers_id],
  (pinnedMessages, convers_id) => pinnedMessages[convers_id] || []
);
