import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelMessages } from "../../services/channleService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setChannelMessages } from "../../redux_toolkit/api_data/messages/channelMessagesSlice";

const useGetChannelMessages = (channel_id) => {
  const dispatch = useDispatch();

  const query = useInfiniteQuery({
    queryKey: ["channel-messages", { channel_id }],
    queryFn: ({ pageParam = 1 }) =>
      getChannelMessages({ channel_id, pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: !!channel_id,
  });

  useEffect(() => {
    if (query.data && channel_id) {
      const allMessages = query.data.pages.flatMap((page) => page.data);
      dispatch(setChannelMessages({ channel_id, messages: allMessages }));
    }
  }, [query.data, channel_id, dispatch]);

  return query;
};

export default useGetChannelMessages;
