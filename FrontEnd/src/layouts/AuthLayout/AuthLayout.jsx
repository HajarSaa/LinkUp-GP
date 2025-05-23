import styles from "./AuthLayout.module.css";

import AuthHeader from "../../components/Auth/AuthHeader/AuthHeader";
import AuthFooter from "../../components/Auth/AuthFooter/AuthFooter";



// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.auth_container}>
        <AuthHeader/>
        {children}
      </div>
      <AuthFooter/>
    </div>
  );
};

export default AuthLayout;
