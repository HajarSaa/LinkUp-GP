import { createSelector } from "@reduxjs/toolkit";

export const selectTypingUsersByRoom = (roomId) =>
  createSelector(
    (state) => state.typing.typingUsers,
    (typingUsers) => typingUsers[roomId] || []
  );
