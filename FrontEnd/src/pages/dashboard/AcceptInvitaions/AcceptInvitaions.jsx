import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./AcceptInvitaions.module.css";
import useAcceptInvite from "../../../API/hooks/workspace/useAcceptInvite";
import { useEffect } from "react";
import { clearWorkspace } from "../../../API/redux_toolkit/api_data/workspaceSlice";
import { clearCreationSteps } from "../../../API/redux_toolkit/ui/creationsStep";
import { useDispatch } from "react-redux";

const AcceptInvitaions = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = new URLSearchParams(search).get("token");
  const accept_invite = useAcceptInvite();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    console.log(token)
  }, [token, accept_invite, dispatch, navigate]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <Spinner width={70} height={70} color="#2d5878" border={4} />
        <div>
          <h2 className={styles.loadingTitle}>Check Invitation Token</h2>
          <p className={styles.loadingMessage}>
            Just a moment, we're getting things ready 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitaions;
