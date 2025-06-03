import { useMutation } from "@tanstack/react-query";
import { leaveThisChannel } from "../../services/channelService";

function useLeaveChannel(setIsLeaving) {
  return useMutation({
    mutationFn: (channel_id) => leaveThisChannel(channel_id),
    onMutate: () => {
      setIsLeaving(true);
    },
    onSettled: () => {
      setIsLeaving(false);
    }
  });
}

export default useLeaveChannel;
