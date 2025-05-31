import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authService";

const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

export default useLogin;
