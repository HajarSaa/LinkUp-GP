import { useQuery } from "@tanstack/react-query";
import { getWorkspace } from "../services/workspaceService";

const useCurrentWorkspace = () => {
  const work_id = localStorage.getItem("selectedWorkspaceId");

  return useQuery({
    queryKey: ["workspace", work_id],
    queryFn: () => getWorkspace(work_id),
    enabled: work_id?.length > 0,
    staleTime: 0,
    retry: 1,
  });
};

export default useCurrentWorkspace;
