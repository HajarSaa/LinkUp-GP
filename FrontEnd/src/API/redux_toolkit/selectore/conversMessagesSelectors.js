import { createSelector } from "reselect";

const selectConversMessagesState = (state) => state.convers_messages;

export const selectMessagesByConvers = createSelector(
  [selectConversMessagesState, (_, convers_id) => convers_id],
  (conversMessage, convers_id) =>
    conversMessage.messagesByConvers[convers_id] || []
);
