import LaterItem from "../models/laterItem.model.js";
import UserProfile from "../models/userProfile.model.js";

export function startReminderWatcher(io) {
  setInterval(async () => {
    const now = new Date();

    const dueItems = await LaterItem.find({
      reminderAt: { $lte: now },
      notified: { $ne: true },
      status: "in-progress",
    }).lean();

    for (const item of dueItems) {
      const userProfile = await UserProfile.findById(item.userProfile).lean();
      if (!userProfile || !userProfile.user) continue;

      const userRoom = `user:${userProfile.user}`;
      io.to(userRoom).emit("reminderDue", {
        itemId: item.itemId.toString(),
        itemType: item.itemType,
        reminderAt: item.reminderAt,
        message: "Reminder is due!",
      });

      await LaterItem.updateOne(
        { _id: item._id },
        { $set: { notified: true } }
      );
    }
  }, 60 * 1000);
}
