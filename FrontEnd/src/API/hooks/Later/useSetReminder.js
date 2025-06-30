import { useMutation } from "@tanstack/react-query";
import { setReminder } from "../../services/laterService";

const useSetReminder = () => {
  return useMutation({
    mutationFn: ({ messageId, reminderAt }) =>
      setReminder({ messageId, reminderAt }),
  });
};

export default useSetReminder;
