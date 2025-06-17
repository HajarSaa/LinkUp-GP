import { useMutation } from "@tanstack/react-query";
import { createWorkspaceService } from "../../services/workspaceService";

function useCreateWorkspace() {
  return useMutation({
    mutationFn: (work_name) => createWorkspaceService(work_name),
  });
}

export default useCreateWorkspace;
