import styles from "./AuthLayout.module.css";
import AuthFooter from "../../components/UI/Auth/AuthFooter/AuthFooter";
import Logo from "../../assets/icons/logo.svg";



// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={Logo} alt="Link-Up Logo" className={styles.logo} />
        {/* <Outlet/> */}
        {children}
      </div>
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
