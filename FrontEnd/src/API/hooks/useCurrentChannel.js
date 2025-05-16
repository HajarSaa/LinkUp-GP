import {useEffect } from "react";
import { getChannelData } from "../services/channleService";
import { useDispatch, useSelector } from "react-redux";
import { setChannel, setError, setLoading } from "../redux_toolkit/api_data/channelSlice";


const useChannelData = (channel_id) => {
  const dispatch = useDispatch();
  const { channel, loading, error } = useSelector((state) => state.channel);

  useEffect(() => {
    const fetchChannelData = async () => {
      if (!channel_id) return;
      dispatch(setLoading(true));
      try {
        const response = await getChannelData(channel_id)
        console.log(response)
        dispatch(setChannel(response));
      } catch (err) {
        console.error("Error fetching channel:", err);
        dispatch(setError("Failed to fetch channel data."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchChannelData();
  }, [channel_id, dispatch]);

  return { channel, loading, error };
};

export default useChannelData;
