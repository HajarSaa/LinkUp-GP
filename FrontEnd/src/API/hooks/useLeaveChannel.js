import { useState } from "react";
import { leaveThisChannel } from "../services/channleService";

const useLeaveChannel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const leaveChannel = async (channel_id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await leaveThisChannel(channel_id);
      setSuccess(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { leaveChannel, loading, error, success };
};

export default useLeaveChannel;
