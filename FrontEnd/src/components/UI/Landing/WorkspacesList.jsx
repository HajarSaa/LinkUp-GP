import useGetMe from "../../../API/hooks/useGetMe";
import Spinner from "../../../routes/Spinner/Spinner";
import { CiFaceFrown } from "react-icons/ci";
import styles from "./Landing.module.css";
import WorkspaceItem from "./WorkspaceItem";

function WorkspacesList() {
  const { data, isLoading, error, isError ,isFetching} = useGetMe();

  if (isFetching)
    return (
      <div className={styles.loading}>
        <Spinner width={70} height={70} border={3} color={"#4285F4"} />
      </div>
    );

  if (isError)
    return (
      <div className={styles.error}>
        <span>{error}</span>
        <span>
          <CiFaceFrown />
        </span>
      </div>
    );

  const user = data?.user || null;
  const workspaces = data?.workspaces || [];

  return (
    <div className={styles.workspaces_list}>
      <div className={styles.workspace_list_header}>
        Workspaces for <strong>{user?.email}</strong>
      </div>
      <div className={styles.workspace_list_items}>
        {workspaces.length === 0 ? (
          <div
            className={`${styles.workspaceItem} ${styles.empty_workspace_item}`}
          >
            <h3>There is no workspaces or invitations</h3>
            <p>try to create new one </p>
          </div>
        ) : (
          workspaces.map((workspace, index) => (
            <WorkspaceItem key={index} workspace={workspace} />
          ))
        )}
      </div>
    </div>
  );
}

export default WorkspacesList;
