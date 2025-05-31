import { useQuery } from "@tanstack/react-query";
import { getChannelData } from "../services/channleService";

const useGetChannel = (channel_id) => {
  return useQuery({
    queryKey: ["channel", { channel_id }],
    queryFn: () => getChannelData(channel_id),
    enabled: !!channel_id,
  });
}

export default useGetChannel;
