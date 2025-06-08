import UserProfile from "../models/userProfile.model.js";

export async function setUserStatus(
  userId,
  workspaceId,
  status,
  customStatus = null
) {
  const update = { status, lastActive: new Date() };

  if (customStatus !== null) {
    update.customStatus = customStatus;
  }

  await UserProfile.updateOne(
    { user: userId, workspace: workspaceId },
    { $set: update }
  );
}
