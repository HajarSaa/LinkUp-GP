import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../services/authService";

const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export default useLogout;
