import { useMutation } from "@tanstack/react-query";
import { deleteWorkspace } from "../../services/workspaceService";

function useDeleteWorkspace() {
  return useMutation({
    mutationFn: (workspaceId) => deleteWorkspace(workspaceId),
  });
}

export default useDeleteWorkspace;
