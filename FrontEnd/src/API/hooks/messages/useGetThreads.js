import { useQuery } from "@tanstack/react-query";
import { getMessageThreads } from "../../services/messages";
import { useEffect } from "react";
import { setThreads } from "../../redux_toolkit/api_data/messages/threadsSlice";
import { useDispatch } from "react-redux";

function useGetThreads(threads_id) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["threads", threads_id],
    queryFn: () =>
      getMessageThreads({
        parent_id: threads_id,
        pageParam: 1,
        limit: 20,
      }),
    enabled: !!threads_id,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.data) {
      dispatch(setThreads(query.data.data));
    }
  }, [query.data, dispatch]);

  return query;
}

export default useGetThreads;
