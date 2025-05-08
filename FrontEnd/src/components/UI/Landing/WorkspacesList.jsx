import styles from "./Landing.module.css";
import WorkspaceItem from "./WorkspaceItem";

function WorkspacesList() {
  const workspaces = [
    { name: "Graduation-Team", members: 5 },
    { name: "Testing WorkSpace", members: 1 },
    { name: "New Workspace", members: 1 },
    { name: "test-2", members: 0 },
    { name: "new-workspace", members: 0 },
  ];

  const user = {
    email: "ahmed@gmail.com",
  };

  return (
    <div className={styles.workspaces_list}>
      <div className={styles.workspace_list_header}>
        Workspaces for <strong>{user.email}</strong>
      </div>

      <div className={styles.workspace_list_items}>
        {workspaces.map((workspace, index) => (
          <WorkspaceItem key={index} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}

export default WorkspacesList;
