import { useMutation } from "@tanstack/react-query";
import { joinWorkspace } from "../../services/workspaceService";

function useJoinWorkspace() {
  return useMutation({
    mutationFn: ({ workspaceId, formData }) =>
      joinWorkspace(workspaceId, formData),
  });
}

export default useJoinWorkspace;
