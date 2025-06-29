import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationPinnedMessages } from "../../services/messages";
import { useEffect } from "react";
import { setConverationPinnedMessages } from "../../redux_toolkit/api_data/messages/pinnedConversationMessagesSlice";
import { useDispatch } from "react-redux";


const useGetConversationPinnedMessages = (conversationId) => {

  const dispatch = useDispatch()

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

    useEffect(() => {
      if (query.data?.pages) {
        const allMessages = query.data.pages.flatMap((page) => page.data);
        dispatch(
          setConverationPinnedMessages({
            convers_id: conversationId,
            messages: allMessages,
          })
        );
      }
    }, [query.data, dispatch, conversationId]);



  return query;
};

export default useGetConversationPinnedMessages;
