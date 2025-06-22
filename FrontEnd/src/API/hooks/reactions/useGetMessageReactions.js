import { useQuery } from "@tanstack/react-query";
import { getMessageReactions } from "../../services/reactions";

function useGetMessageReactions(message_id) {
  const query =  useQuery({
    queryKey: [`message-reactions-${message_id}`],
    queryFn: () => getMessageReactions(message_id),
    enabled: !!message_id,
    retry: 1,
  });

  return query;
}

export default useGetMessageReactions;
