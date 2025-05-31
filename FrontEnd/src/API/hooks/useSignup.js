import { useMutation } from "@tanstack/react-query";
import { signupService } from "../services/authService";

const useSignup = () => {
  return useMutation({
    mutationFn: signupService,
  });
};

export default useSignup;
