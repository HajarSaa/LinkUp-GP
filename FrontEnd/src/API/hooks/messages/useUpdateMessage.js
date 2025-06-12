import { useMutation } from "@tanstack/react-query";
import { updateThisMessage } from "../../services/messages";

function useUpdateMessage() {
  return useMutation({
    mutationFn: ({ message_id, content }) =>
      updateThisMessage(message_id, content),
  });
}


export default useUpdateMessage;
