export const selectNotificationsByType = (state, type) => {
  if (type === "mention") return state.notifications.mentions;
  if (type === "thread") return state.notifications.threads;
  if (type === "reaction") return state.notifications.reactions;
  return state.notifications.all;
};

export const selectNotificationLoading = (state) => state.notifications.loading;
