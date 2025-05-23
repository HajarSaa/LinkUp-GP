import PropTypes from "prop-types";
import styles from "./PageContent.module.css";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { closeChatPanel } from "../../../API/redux_toolkit/ui/chatPanel";

function PageContent({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(closeChatPanel());
  }, [location.pathname, dispatch]);

  return <div className={styles.page}>{children}</div>;
}

PageContent.propTypes = {
  children: PropTypes.any,
};

export default PageContent;
