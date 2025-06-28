import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelPinnedMessages } from "../../services/messages";

const useGetChannelPinnedMessages = (channelId) => {
  const limit = 10;

  const query = useInfiniteQuery({
    queryKey: ["channel-pinned-messages", channelId],
    queryFn: ({ pageParam = 1 }) =>
      getChannelPinnedMessages({ channelId, limit, page: pageParam }),

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },

    enabled: !!channelId,
    staleTime: 0,
  });


  return query;
};

export default useGetChannelPinnedMessages;
