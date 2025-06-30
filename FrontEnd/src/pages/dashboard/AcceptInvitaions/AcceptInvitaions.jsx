import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./AcceptInvitaions.module.css";
import useAcceptInvite from "../../../API/hooks/workspace/useAcceptInvite";
import { useEffect, useRef } from "react";
import {
  setStepIndex,
  setWorkspace,
} from "../../../API/redux_toolkit/ui/creationsStep";
import { useDispatch } from "react-redux";

const AcceptInvitaions = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = new URLSearchParams(search).get("token");
  const accept_invite = useAcceptInvite();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // نعمل كلك بعد 3 ثواني
    const timer = setTimeout(() => {
      buttonRef.current?.click();
    }, 3000);

    return () => clearTimeout(timer); // تنظيف التايمر
  }, [token, navigate]);

  function handleAccept() {
    accept_invite.mutate(token, {
      onSuccess: (data) => {
        dispatch(
          setWorkspace({
            workspace: { _id: data.workspaceId, id: data.workspaceId },
          })
        );
        dispatch(setStepIndex(1));
        navigate("/new-workspace/step-2");
      },
      onError: (err) => {
        console.log("Error accepting invitation:", err);
        navigate("/login");
      },
    });
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <Spinner width={70} height={70} color="#2d5878" border={4} />
        <div>
          <h2 className={styles.loadingTitle}>Check Invitation Token</h2>
          <p className={styles.loadingMessage}>
            Just a moment, we&#39;re getting things ready 🚀
          </p>
          <button
            ref={buttonRef}
            onClick={handleAccept}
            style={{ display: "none" }}
          >
            Accept Hidden
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitaions;
