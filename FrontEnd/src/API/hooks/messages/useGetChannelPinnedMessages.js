import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelPinnedMessages } from "../../services/messages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setChannelPinnedMessages } from "../../redux_toolkit/api_data/messages/pinnedChannelMessagesSlice";

const useGetChannelPinnedMessages = (channel_id) => {
  const limit = 10;
  const dispatch = useDispatch();

  const query = useInfiniteQuery({
    queryKey: ["channel-pinned-messages", channel_id],
    queryFn: ({ pageParam = 1 }) =>
      getChannelPinnedMessages({ channel_id, limit, page: pageParam }),

    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },

    enabled: !!channel_id,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data?.pages) {
      const allMessages = query.data.pages.flatMap((page) => page.data);
      dispatch(
        setChannelPinnedMessages({
          channel_id: channel_id,
          messages: allMessages,
        })
      );
    }
  }, [query.data, dispatch, channel_id]);

  return query;
};

export default useGetChannelPinnedMessages;
