import { useMutation } from "@tanstack/react-query"
import { leaveWorkspace } from "../../services/workspaceService";

function useLeaveWorkspace() {
  return useMutation({
    mutationFn: (work_id) => leaveWorkspace(work_id)
  });
}

export default useLeaveWorkspace