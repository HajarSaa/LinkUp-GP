import {
  setMessageSavedForLater,
  removeMessageSavedForLater,
} from "../../redux_toolkit/api_data/messages/channelMessagesSlice";

import {
  setMessageSavedForLater as setConversSaved,
  removeMessageSavedForLater as removeConversSaved,
} from "../../redux_toolkit/api_data/messages/conversMessagesSlice";

import {
  setMessageSavedForLater as setThreadSaved,
  removeMessageSavedForLater as removeThreadSaved,
} from "../../redux_toolkit/api_data/messages/threadsSlice";

import {
  addLaterItem,
  removeLaterItem,
  updateLaterItemStatus,
  updateLaterItemReminder,
  removeLaterReminder,
} from "../../redux_toolkit/api_data/messages/laterItemsSlice";

export const registerLaterHandlers = (socket, store) => {
  // ✅ 1. Add saved icon + laterItems list
  socket.on("laterItemSaved", ({ messageId }) => {
    console.log("📥 [Socket] laterItemSaved received:", messageId);
    store.dispatch(setMessageSavedForLater({ messageId }));
    store.dispatch(setConversSaved({ messageId }));
    store.dispatch(setThreadSaved({ messageId }));

    // Just a temporary placeholder, data will come from getLaterItems initially as well
    store.dispatch(addLaterItem({ messageId }));
  });

  // ✅ 2. Remove saved icon + remove from sidebar
  socket.on("laterItemRemoved", ({ messageId }) => {
    store.dispatch(removeMessageSavedForLater({ messageId }));
    store.dispatch(removeConversSaved({ messageId }));
    store.dispatch(removeThreadSaved({ messageId }));
    store.dispatch(removeLaterItem(messageId));
  });

  // ✅ 3. Update item status (completed or in-progress)
  socket.on("laterItemStatusUpdated", ({ messageId, status }) => {
    store.dispatch(updateLaterItemStatus({ messageId, status }));
  });

  // ✅ 4. Reminder set
  socket.on("laterReminderSet", ({ messageId, reminderAt }) => {
    store.dispatch(updateLaterItemReminder({ messageId, reminderAt }));
  });

  // ✅ 5. Reminder removed
  socket.on("laterReminderRemoved", ({ messageId }) => {
    store.dispatch(removeLaterReminder(messageId));
  });
};
