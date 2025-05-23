import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setConvers,
  setConError,
  setConLoading,
} from "../redux_toolkit/api_data/conversSlice";
import { getConversData } from "../services/coversService";

const useChannelData = (convers_id) => {
  const dispatch = useDispatch();
  const { convers, loading, error } = useSelector((state) => state.convers);

  useEffect(() => {
    const fetchConversData = async () => {
      if (!convers_id) return;
      dispatch(setConLoading(true));
      try {
        const response = await getConversData(convers_id);
        dispatch(setConvers(response.conversation));
      } catch (err) {
        console.log("Error fetching Conversation:", err);
        dispatch(setConError("Failed to fetch conversation data."));
      } finally {
        dispatch(setConLoading(false));
      }
    };

    fetchConversData();
  }, [convers_id, dispatch]);

  return { convers, loading, error };
};

export default useChannelData;
