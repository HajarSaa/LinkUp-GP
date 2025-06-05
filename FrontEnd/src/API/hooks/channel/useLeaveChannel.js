import { useMutation } from "@tanstack/react-query";
import { leaveThisChannel } from "../../services/channelService";

function useLeaveChannel() {
  return useMutation({
    mutationFn: (channel_id) => leaveThisChannel(channel_id)
  });
}

export default useLeaveChannel;
