// mockNotifications.js
const mockNotifications = [
  {
    _id: "notif1",
    type: "mention",
    isRead: false,
    triggeredBy: "user123",
    createdAt: new Date().toISOString(),
    messageId: {
      _id: "msg1",
      content: "Hey @alaa check this out!",
      channelId: "channel1",
    },
  },
  {
    _id: "notif2",
    type: "reply",
    isRead: true,
    triggeredBy: "user456",
    createdAt: new Date().toISOString(),
    messageId: {
      _id: "msg2",
      content: "I replied to your thread",
      channelId: "channel2",
      parentMessageId: "parent123",
    },
  },
  {
    _id: "notif3",
    type: "reaction",
    isRead: false,
    triggeredBy: "user789",
    createdAt: new Date().toISOString(),
    messageId: {
      _id: "msg3",
      content: "👍 Great job!",
      channelId: "channel3",
    },
  },
];

export default mockNotifications;
