import { useMutation } from "@tanstack/react-query";
import { joinWorkspace } from "../../services/workspaceService";

function useJoinWorkspace() {
  return useMutation({
    mutationFn: ({ workspaceId, data }) =>
      joinWorkspace(workspaceId, data),
  });
}

export default useJoinWorkspace;
