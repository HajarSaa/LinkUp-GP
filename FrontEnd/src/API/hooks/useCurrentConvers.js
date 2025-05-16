import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConvers,
  setError,
  setLoading,
} from "../redux_toolkit/api_data/conversSlice";
import { getConversData } from "../services/coversService";

const useChannelData = (convers_id) => {
  const dispatch = useDispatch();
  const { convers, loading, error } = useSelector((state) => state.convers);

  useEffect(() => {
    const fetchConversData = async () => {
      if (!convers_id) return;
      dispatch(setLoading(true));
      try {
        const response = await getConversData(convers_id);
        console.log(response);
        dispatch(setConvers(response));
      } catch (err) {
        console.error("Error fetching Conversation:", err);
        dispatch(setError("Failed to fetch conversation data."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchConversData();
  }, [convers_id, dispatch]);

  return { convers, loading, error };
};

export default useChannelData;
