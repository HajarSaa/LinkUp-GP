import { useMutation } from "@tanstack/react-query";
import { joinThisChannel } from "../../services/channelService";

function useJoinChannel() {
  return useMutation({
    mutationFn: (channel_id) => joinThisChannel(channel_id),
  });
}

export default useJoinChannel;
