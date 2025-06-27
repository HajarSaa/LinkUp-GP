

// note for Alaa ❗
//✅ this endpoint send emoji if new and delete it if its exist for the same person ✅

import { useMutation } from "@tanstack/react-query"
import { toggleReaction } from "../../services/reactions"

function useToggleReaction() {
  return useMutation({
    mutationFn: ({ messageId, emoji }) => toggleReaction(messageId, emoji),
  });
}

export default useToggleReaction
