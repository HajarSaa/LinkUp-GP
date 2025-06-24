import { useQuery } from "@tanstack/react-query";
import { getChannelMedia } from "../../services/mediaService";
import { useEffect } from "react";
import { setChannelMedia } from "../../redux_toolkit/api_data/media/channelMediaSlice";
import { useDispatch } from "react-redux";

function useGetChannelMedia(channel_id) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["channel-media", { channel_id }],
    queryFn: () => getChannelMedia(channel_id),
    enabled: !!channel_id,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.media) {
      dispatch(setChannelMedia(query.data.media));
    }
  }, [query.data, dispatch]);
  return query;
}

export default useGetChannelMedia;
