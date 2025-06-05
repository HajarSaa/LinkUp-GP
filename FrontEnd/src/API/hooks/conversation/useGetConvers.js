import { useDispatch } from "react-redux";
import { setConvers } from "../../redux_toolkit/api_data/conversSlice";
import { getConversData } from "../../services/coversService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const useGetConvers = (convers_id) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["convers", { convers_id }],
    queryFn: () => getConversData(convers_id),
    enabled: !!convers_id,
  });
  useEffect(() => {
      if (query.data?.conversation) {
        dispatch(setConvers(query.data?.conversation));
      }
    }, [query.data, dispatch]);
  return query;
};

export default useGetConvers;