import { useMutation } from "@tanstack/react-query";
import { toggleLaterItem } from "../../services/laterService";


const useToggleLaterItem = () => {
  return useMutation({
    mutationFn: (messageId) => toggleLaterItem(messageId),
  });
};

export default useToggleLaterItem;
