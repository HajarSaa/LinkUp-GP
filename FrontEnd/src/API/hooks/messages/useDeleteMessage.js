import { useMutation } from "@tanstack/react-query";
import { deleteThisMessage } from "../../services/messages";

function useDeleteMessage() {
  return useMutation({
    mutationFn: (message_id) => deleteThisMessage(message_id),
  });
}

export default useDeleteMessage;
