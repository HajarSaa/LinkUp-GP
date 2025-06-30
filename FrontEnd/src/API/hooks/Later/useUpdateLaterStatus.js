import { useMutation } from "@tanstack/react-query";
import { updateLaterItemStatus } from "../../services/laterService";

const useUpdateLaterStatus = () => {
  return useMutation({
    mutationFn: ({ messageId, status }) =>
      updateLaterItemStatus({ messageId, status }),
  });
};

export default useUpdateLaterStatus;
