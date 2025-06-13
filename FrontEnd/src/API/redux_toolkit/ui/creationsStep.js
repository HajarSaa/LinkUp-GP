import { createSlice } from "@reduxjs/toolkit";

function saveToLocalStorage(state) {
  localStorage.setItem("creation_data", JSON.stringify(state));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("creation_data");
  return data ? JSON.parse(data) : null;
}

const local = loadFromLocalStorage();

const initialState = {
  stepIndex: local?.stepIndex ?? 0,
  workspace: local?.workspace ?? null,
  user: local?.user ?? null,
  emails: local?.emails ?? null,
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
    clearCreationSteps(state) {
      Object.assign(state, {
        stepIndex: 0,
        workspace: null,
        user: null,
        emails: null,
      });
      localStorage.removeItem("creation_data");
    },
  },
});

export const {
  setWorkspace,
  setUser,
  setEmails,
  setStepIndex,
  clearCreationSteps,
} = creationStepsSlice.actions;

export default creationStepsSlice.reducer;
