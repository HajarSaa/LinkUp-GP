import { useMutation } from "@tanstack/react-query";
import { forwardMessage } from "../../services/messages";


const useForwardMessage = () => {
  return useMutation({
    mutationFn: (requestBody) => forwardMessage(requestBody),
  });
};

export default useForwardMessage;
