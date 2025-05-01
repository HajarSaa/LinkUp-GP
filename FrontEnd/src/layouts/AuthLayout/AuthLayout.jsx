import styles from "./AuthLayout.module.css";
import AuthFooter from "../../components/UI/Auth/AuthFooter/AuthFooter";

import AuthHeader from "../../components/UI/Auth/AuthHeader/AuthHeader";



// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.auth_container}>
        <AuthHeader/>
        {children}
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
