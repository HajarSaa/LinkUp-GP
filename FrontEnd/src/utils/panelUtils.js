// ============(opened & closed User panels)
const user_panel = "user_panel_ids";

export const addToOpenedUserPanelItems = (page_id, user_panel_id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || {};
  stored[page_id] = {
    type: "userPanel",
    id: user_panel_id,
  };
  localStorage.setItem(user_panel, JSON.stringify(stored));
};

export const RemoveFromOpenedUserPanelItems = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || {};
  if (stored[page_id]) {
    delete stored[page_id];
    localStorage.setItem(user_panel, JSON.stringify(stored));
  }
};

export const isIdInOpenedUserPanelItems = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || {};
  return page_id in stored;
};

export const getUserPanelIdByPageId = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || {};
  return stored[page_id]?.id || null;
};

// ============(opened & closed Threads panels)

const thread_panel = "thread_panel_ids";

export const addToOpenedthreadPanelItems = (
  page_id,
  thread_panel_id,
  parent_message
) => {
  const stored = JSON.parse(localStorage.getItem(thread_panel)) || {};
  stored[page_id] = {
    type: "threadPanel",
    id: thread_panel_id,
    parnetMessage: parent_message,
  };
  localStorage.setItem(thread_panel, JSON.stringify(stored));
};

export const RemoveFromOpenedThreadPanelItems = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(thread_panel)) || {};
  if (stored[page_id]) {
    delete stored[page_id];
    localStorage.setItem(thread_panel, JSON.stringify(stored));
  }
};

export const isIdInOpenedThreadPanelItems = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(thread_panel)) || {};
  return page_id in stored;
};

export const getThreadPanelIdByPageId = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(thread_panel)) || {};
  return stored[page_id]?.id || null;
};
export const getParentMessageByPageId = (page_id) => {
  const stored = JSON.parse(localStorage.getItem(thread_panel)) || {};
  return stored[page_id]?.parnetMessage || null;
};
