import { useMutation } from "@tanstack/react-query";
import { acceptInvite } from "../../services/workspaceService";

const useAcceptInvite = () => {
  return useMutation({
    mutationFn: (token) => acceptInvite(token),
  });
};

export default useAcceptInvite;
