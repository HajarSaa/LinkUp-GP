import { useQuery } from "@tanstack/react-query";
import {getConversationMedia } from "../../services/mediaService";
import { useEffect } from "react";
import { setConversMedia } from "../../redux_toolkit/api_data/media/conversMediaSlice";
import { useDispatch } from "react-redux";

function useGetConversMedia(convers_id) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["convers-media", { convers_id }],
    queryFn: () => getConversationMedia(convers_id),
    enabled: !!convers_id,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.media) {
      dispatch(setConversMedia(query.data.media));
    }
  }, [query.data, dispatch]);
  return query;
}

export default useGetConversMedia;
