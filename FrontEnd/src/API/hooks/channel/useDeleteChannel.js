import { useMutation } from "@tanstack/react-query";
import { deleteThisChannel } from "../../services/channelService";

function useDeleteChannel() {
  return useMutation({
    mutationFn: (channel_id) => deleteThisChannel(channel_id),
  });
}

export default useDeleteChannel;
