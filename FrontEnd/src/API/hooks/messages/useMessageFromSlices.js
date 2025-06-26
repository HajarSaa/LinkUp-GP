import { useSelector } from "react-redux";

export const useMessageFromSlices = (messageId) => {
  const { messagesByChannel } = useSelector((state) => state.channelMessages);
  const { messagesByConvers } = useSelector((state) => state.conversMessages);
  const { threads } = useSelector((state) => state.threads);

  // Search in channel messages
  for (const channelId in messagesByChannel) {
    const msg = messagesByChannel[channelId]?.find((m) => m._id === messageId);
    if (msg) return msg;
  }

  // Search in conversation messages
  for (const conversId in messagesByConvers) {
    const msg = messagesByConvers[conversId]?.find((m) => m._id === messageId);
    if (msg) return msg;
  }

  // Search in threads
  if (threads) {
    const msg = threads.find((m) => m._id === messageId);
    if (msg) return msg;
  }

  return null;
};