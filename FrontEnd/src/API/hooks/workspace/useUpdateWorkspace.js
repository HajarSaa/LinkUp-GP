import { useMutation } from "@tanstack/react-query";
import { updateWorkspace } from "../../services/workspaceService";

function useUpdateWorkspace() {
  return useMutation({
    mutationFn: ({work_id, data}) => updateWorkspace(work_id, data),
  });
}

export default useUpdateWorkspace;
