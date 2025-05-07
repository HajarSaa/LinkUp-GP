import styles from "./AuthLayout.module.css";

import AuthHeader from "../../components/Auth/AuthHeader/AuthHeader";



// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.auth_container}>
        <AuthHeader/>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
