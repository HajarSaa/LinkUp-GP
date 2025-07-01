import { useMutation } from "@tanstack/react-query";
import { inviteToWork } from "../../services/workspaceService";

export const useInviteToWork = () => {
  return useMutation({
    mutationFn: ({ workspace_id, email }) => inviteToWork(workspace_id, email),
  });
};
