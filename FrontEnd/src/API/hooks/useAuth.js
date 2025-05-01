import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux_toolkit/auth/authActions";
import {logout} from '../redux_toolkit/auth/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const signupUser = (data) => dispatch(signup(data));
  const logoutUser = () => dispatch(logout());

  return { user, token, loading, error, signupUser, logoutUser };
};
