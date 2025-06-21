import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChannelData } from "../../services/channelService";
import { setChannel } from "../../redux_toolkit/api_data/channelSlice";


const useGetChannel = (channel_id) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["channel", { channel_id }],
    queryFn: () => getChannelData(channel_id),
    enabled: !!channel_id,
    retry:1
  });

  useEffect(() => {
    if (query.data?.channel) {
      dispatch(setChannel(query.data.channel));
    }
  }, [query.data, dispatch]);

  return query;
};
export default useGetChannel;
