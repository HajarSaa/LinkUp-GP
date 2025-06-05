import { useMutation } from "@tanstack/react-query";
import { createChannel } from "../../services/channelService";
import { setChannel } from "../../redux_toolkit/api_data/channelSlice";
import { useDispatch } from "react-redux";

function useCreateChannel() {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (channel_data) => createChannel(channel_data),
    onSuccess: (data) => {
      dispatch(setChannel(data.channel));
    },
  });
}

export default useCreateChannel;
