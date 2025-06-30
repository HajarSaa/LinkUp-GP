import { useMutation } from "@tanstack/react-query";
import { removeReminder } from "../../services/laterService";

const useRemoveReminder = () => {
  return useMutation({
    mutationFn: (messageId) => removeReminder(messageId),
  });
};

export default useRemoveReminder;
