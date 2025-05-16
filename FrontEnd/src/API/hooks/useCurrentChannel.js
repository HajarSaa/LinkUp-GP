import {useEffect } from "react";
import { getChannelData } from "../services/channleService";
import { useDispatch, useSelector } from "react-redux";
import { setChannel, setChanError, setChanLoading } from "../redux_toolkit/api_data/channelSlice";


const useChannelData = (channel_id) => {
  const dispatch = useDispatch();
  const { channel, loading, error } = useSelector((state) => state.channel);

  useEffect(() => {
    const fetchChannelData = async () => {
      if (!channel_id) return;
      dispatch(setChanLoading(true));
      try {
        const response = await getChannelData(channel_id)
        dispatch(setChannel(response.channel));
      } catch (err) {
        console.log("Error fetching channel:", err);
        dispatch(setChanError("Failed to fetch channel data."));
      } finally {
        dispatch(setChanLoading(false));
      }
    };

    fetchChannelData();
  }, [channel_id, dispatch]);

  return { channel, loading, error };
};

export default useChannelData;
