import { useMutation } from "@tanstack/react-query";
import { updateChannel } from "../../services/channelService";

function useUpdateChannel() {
  return useMutation({
    mutationFn: ({ channelId, body }) => updateChannel(channelId, body),
  });
}

export default useUpdateChannel;
