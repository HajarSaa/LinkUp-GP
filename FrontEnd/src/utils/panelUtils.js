
// ============(opened & closed panels)
const user_panel = "user_panel_ids";
export const addToOpenedUserPanelItems = (id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || [];
  if (!stored.includes(id)) {
    stored.push(id);
    localStorage.setItem(user_panel, JSON.stringify(stored));
  }
};

export const RemoveFromOpenedUserPanelItems = (id) => {
  const stored = JSON.parse(localStorage.getItem(user_panel)) || [];
  const updated = stored.filter((item) => item !== id);
  localStorage.setItem(user_panel, JSON.stringify(updated));
};

export const getAllIds = () => {
  return JSON.parse(localStorage.getItem(user_panel)) || [];
};
