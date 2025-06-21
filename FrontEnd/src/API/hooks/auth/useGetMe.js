import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/authService";

const useGetMe = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: ({ signal }) => getMe(signal),
    staleTime: 0,
    retry: 1,
    // refetchInterval: 5000,
  });
};

export default useGetMe;
