import { useMutation } from "@tanstack/react-query";
import { togglePinMessage } from "../../services/messages";

const useTogglePinMessage = () => {
  return useMutation({
    mutationFn: ({ messageId, pin }) => togglePinMessage({ messageId, pin }),
  });
};

export default useTogglePinMessage;
