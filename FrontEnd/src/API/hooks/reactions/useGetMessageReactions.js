import { useQuery } from "@tanstack/react-query";
import { getMessageReactions } from "../../services/reactions";

function useGetMessageReactions(message_id) {
  return useQuery({
    queryKey: [`message-reactions-${message_id}`],
    queryFn: () => getMessageReactions(message_id),
    enabled: !!message_id,
    retry: 1,
  });
}

export default useGetMessageReactions;
