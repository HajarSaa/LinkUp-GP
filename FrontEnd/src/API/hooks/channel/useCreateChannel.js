import { useMutation } from "@tanstack/react-query";
import { createChannel } from "../../services/channelService";

function useCreateChannel() {
  return useMutation({
    mutationFn: (channel_data) => createChannel(channel_data),
  });
}

export default useCreateChannel;
