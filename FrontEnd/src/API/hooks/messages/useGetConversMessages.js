import { useInfiniteQuery } from "@tanstack/react-query";
import {getConversMessages } from "../../services/messages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setConversMessages } from "../../redux_toolkit/api_data/messages/conversMessagesSlice";

const useGetConversMessages = (convers_id) => {
  const dispatch = useDispatch();

  const limit = 10; // ثابت في كل الصفحات

  const query = useInfiniteQuery({
    queryKey: ["convers-messages", convers_id],
    queryFn: ({ pageParam = 1 }) =>
      getConversMessages({ convers_id, limit, pageParam }),

    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },

    enabled: !!convers_id,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data && convers_id) {
      const allMessages = query.data.pages.flatMap((page) => page.data);
      dispatch(setConversMessages({ convers_id, messages: allMessages }));
    }
  }, [query.data, query.data?.pages, convers_id, dispatch]);
  return query;
};

export default useGetConversMessages;
