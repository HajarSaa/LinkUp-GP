import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getMe} from "../services/authService";
import { setUser } from "../redux_toolkit/api_data/userSlice";

const useGetMe = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: ({ signal }) => getMe(signal),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      localStorage.setItem("currentUser", JSON.stringify(data.user));
    },
    onError: () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    },
  });

  return {
    user: query.data?.user || null,
    workspaces: query.data?.workspaces || [],
    isAuthenticated: !!query.data?.user,
    loading: query.isLoading,
    error: query.error,
  };
};

export default useGetMe;
