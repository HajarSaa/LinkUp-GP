import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getWorkspace } from "../../services/workspaceService";
import { setWorkspace } from "../../redux_toolkit/api_data/workspaceSlice";
import {
  disableResizing,
  enableResizing,
} from "../../redux_toolkit/ui/resizeSlice";

const useCurrentWorkspace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const work_id = localStorage.getItem("selectedWorkspaceId");

  const query = useQuery({
    queryKey: ["workspace", work_id],
    queryFn: () => getWorkspace(work_id),
    enabled: !!work_id,
    staleTime: 0,
    retry: 1,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: false,
  });

  // Handle success
  useEffect(() => {
    if (query.data?.workspace) {
      dispatch(setWorkspace(query.data.workspace));
    }
  }, [query.data, dispatch]);

  // Handle error
  useEffect(() => {
    if (query.isError) {
      if (axios.isAxiosError(query.error)) {
        const status = query.error?.response?.status;

        if (status === 401) {
          navigate("/login");
          return;
        }
      }

      console.error("Error fetching workspace:", query.error);
      navigate("/workspaces-landing");
    }
  }, [query.isError, query.error, navigate]);

  // Handle resizing based on loading
  useEffect(() => {
    if (query.isLoading) {
      dispatch(disableResizing());
    } else {
      dispatch(enableResizing());
    }
  }, [query.isLoading, dispatch]);

  return query;
};

export default useCurrentWorkspace;
