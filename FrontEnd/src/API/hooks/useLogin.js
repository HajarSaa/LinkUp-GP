import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      navigate("/workspaces-landing");
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

export default useLogin;
