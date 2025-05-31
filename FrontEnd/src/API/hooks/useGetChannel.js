import { useQuery } from "@tanstack/react-query";
import { getChannelData } from "../services/channleService";

const useGetChannel = (channel_id) => {
  const {
    data: channel,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["channel", { channel_id }],
    queryFn: () => getChannelData(channel_id),
    enabled: !!channel_id,
    select: (data) => data.channel,
    onSuccess: (data) => {
      console.log(data)
    }
  });

  const errorMessage = error ? "Fail to fetch channel data" : null;

  return { channel, loading, error: errorMessage };
};

export default useGetChannel;
