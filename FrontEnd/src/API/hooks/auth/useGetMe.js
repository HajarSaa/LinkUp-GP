import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/authService";

const useGetMe = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: ({ signal }) => getMe(signal),
    staleTime: 0,
    retry: 1,
    enabled,
  });
};


export default useGetMe;
