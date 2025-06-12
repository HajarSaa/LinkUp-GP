import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stepIndex: 0,
  workspace: null,
  user: null,
  emails: null,
};

const creationStepsSlice = createSlice({
  name: "creationSteps",
  initialState,
  reducers: {
    setWorkspace(state, action) {
      state.workspace = action.payload;
      saveToLocalStorage(state);
    },
    setUser(state, action) {
      state.user = action.payload;
      saveToLocalStorage(state);
    },
    setEmails(state, action) {
      state.emails = action.payload;
      saveToLocalStorage(state);
    },
    setStepIndex(state, action) {
      state.stepIndex = action.payload;
      saveToLocalStorage(state);
    },
    restoreFromStorage(state) {
      const stored = loadFromLocalStorage();
      if (stored) {
        state.workspace = stored.workspace;
        state.user = stored.user;
        state.emails = stored.emails;
        state.stepIndex = stored.stepIndex ?? 0;
      }
    },
    clearCreationSteps(state) {
      Object.assign(state, initialState);
      localStorage.removeItem("creation_data");
    },
  },
});

function saveToLocalStorage(state) {
  localStorage.setItem("creation_data", JSON.stringify(state));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("creation_data");
  return data ? JSON.parse(data) : null;
}

export const {
  setWorkspace,
  setUser,
  setEmails,
  setStepIndex,
  restoreFromStorage,
  clearCreationSteps,
} = creationStepsSlice.actions;

export default creationStepsSlice.reducer;
