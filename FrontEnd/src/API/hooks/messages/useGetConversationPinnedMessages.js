import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationPinnedMessages } from "../../services/messages";


const useGetConversationPinnedMessages = (conversationId) => {

  const limit = 10;

  const query = useInfiniteQuery({
    queryKey: ["conversation-pinned-messages", conversationId],
    queryFn: ({ pageParam = 1 }) =>
      getConversationPinnedMessages({ conversationId, limit, page: pageParam }),

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },

    enabled: !!conversationId,
    staleTime: 0,
  });



  return query;
};

export default useGetConversationPinnedMessages;
