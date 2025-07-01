// hooks/useCallState.js
import { useSelector } from "react-redux";

const useCallState = () => {
  const call = useSelector((state) => state.call);
  return call;
};

export default useCallState;
