import { useMutation } from "@tanstack/react-query";
import { joinThisChannel } from "../../services/channelService";

function useJoinChannel(setIsJoining) {
  return useMutation({
    mutationFn: (channel_id) => joinThisChannel(channel_id),
    onMutate: () => {
      setIsJoining(true);
    },
    onSettled: () => {
      setIsJoining(false);
    },
  });
}

export default useJoinChannel