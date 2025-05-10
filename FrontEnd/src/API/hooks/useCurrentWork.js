import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspace } from "../services/workspaceService";
import {
  setWorkspace,
  setLoading,
  setError,
} from "../redux_toolkit/ui/workspaceSlice";

const useCurrentWork = () => {

  const dispatch = useDispatch();
  const { workspace, loading, error } = useSelector((state) => state.workspace);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const work_id = localStorage.getItem("selectedWorkspaceId");
      if (!work_id) {
        console.error("No Workspace ID found");
        dispatch(setLoading(false));
        dispatch(setError("Workspace ID not found in localStorage."));
        return;
      }

      dispatch(setLoading(true));

      try {
        const response = await getWorkspace(work_id);
        dispatch(setWorkspace(response.workspace)); // تخزين الداتا في الـ Redux
      } catch (err) {
        console.error("Error fetching workspace:", err);
        dispatch(setError("Failed to fetch workspace data."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWorkspace();
  }, [dispatch]);

  return { workspace, loading, error };
};

export default useCurrentWork;
