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