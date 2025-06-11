import { useMutation } from '@tanstack/react-query'
import { sendMessage } from '../../services/messages';

function useSendMessage() {
  return useMutation({
    mutationFn: ({ type, id, messageContent }) =>
      sendMessage(type, id, messageContent),
  });
}



export default useSendMessage