import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspace } from "../services/workspaceService";
import {
  setWorkspace,
  setLoading,
  setError,
} from "../redux_toolkit/api_data/workspaceSlice";
import {useNavigate } from "react-router-dom";

const useCurrentWork = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workspace, loading, error } = useSelector((state) => state.workspace);

  useEffect(() => {
    const fetchWorkspace = async () => {
      const work_id = localStorage.getItem("selectedWorkspaceId");
      if (!work_id) {
        console.log("No Workspace ID found\nthen navigate to login page");
        dispatch(setLoading(false));
        //
        // this handle :=> workspace Id is deleted from localStorage
        //
        navigate("/login");
        return;
      }

      dispatch(setLoading(true));

      try {
        const response = await getWorkspace(work_id);
        dispatch(setWorkspace(response.workspace));
      } catch (err) {
        console.log("Error fetching workspace:", err);
        dispatch(setError("Failed to fetch workspace data."));
        //
        // this handle :=> the owner delete the workspace
        //
        navigate("/workspaces-landing");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchWorkspace();
  }, [dispatch, navigate]);

  return { workspace, loading, error };
};

export default useCurrentWork;
