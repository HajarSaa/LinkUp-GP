import PropTypes from "prop-types";
import styles from "./ContentPage.module.css";
import Panel from "../../../components/UI/Panels/Panel/Panel";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { closeChatPanel } from "../../../API/redux_toolkit/ui/chatPanel";

function ContentPage({ children }) {

  const location = useLocation();
  const dispatch = useDispatch();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      dispatch(closeChatPanel());
      prevPathname.current = location.pathname;
    }
  }, [location.pathname, dispatch]);

  return (
    <div className={styles.content_page}>
      <div className={styles.conetnt}>{children}</div>
      <Panel />
    </div>
  );
}

export default ContentPage;

ContentPage.propTypes = {
  children: PropTypes.any,
};
