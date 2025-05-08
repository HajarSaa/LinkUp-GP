import useCurrentUser from "../../../API/hooks/useCurrentUser";
import styles from "./Landing.module.css";
import WorkspaceItem from "./WorkspaceItem";

function WorkspacesList() {

  const { workspaces: w, user: u, loading, error } = useCurrentUser();

  if (loading) console.log('loading....')
  else console.log(w, u)
  

  const workspaces = [
    {
      _id: "681b91137bf5ee5aa301816f",
      name: "saif-workspace",
      createdBy: "6818ac4c11a760d2de6bdcad",
      members: ["681b91267bf5ee5aa3018174"],
      createdAt: "2025-05-07T16:57:55.096Z",
      updatedAt: "2025-05-07T16:58:15.415Z",
      id: "681b91137bf5ee5aa301816f",
    },
    {
      _id: "681b7785b6d0d6d2f6c818fb",
      name: "first",
      createdBy: "681486ab793565e88a74f633",
      members: [],
      createdAt: "2025-05-07T15:08:53.530Z",
      updatedAt: "2025-05-07T15:08:53.530Z",
      id: "681b7785b6d0d6d2f6c818fb",
    },
    {
      _id: "681b76efb6d0d6d2f6c818e9",
      name: "asmaa-s",
      createdBy: "681486ab793565e88a74f633",
      members: ["681b7701b6d0d6d2f6c818f0"],
      createdAt: "2025-05-07T15:06:23.310Z",
      updatedAt: "2025-05-07T15:06:42.064Z",
      id: "681b76efb6d0d6d2f6c818e9",
    },
    {
      _id: "681b7622b6d0d6d2f6c818e4",
      name: "asmaa-workspac0e",
      createdBy: "681486ab793565e88a74f633",
      members: [],
      createdAt: "2025-05-07T15:02:58.209Z",
      updatedAt: "2025-05-07T15:02:58.209Z",
      id: "681b7622b6d0d6d2f6c818e4",
    },
    {
      _id: "6818ac9f11a760d2de6bdcc5",
      name: "saif_Ayman_Workspace",
      createdBy: "6818ac4c11a760d2de6bdcad",
      members: [],
      createdAt: "2025-05-05T12:18:39.248Z",
      updatedAt: "2025-05-05T12:18:39.248Z",
      id: "6818ac9f11a760d2de6bdcc5",
    },
    {
      _id: "6817e47add88d1aa8e71e79c",
      name: "Ahmed_Ayman_Workspace",
      createdBy: "6817db332cd1f960f36cda70",
      members: [],
      createdAt: "2025-05-04T22:04:42.570Z",
      updatedAt: "2025-05-04T22:04:42.570Z",
      id: "6817e47add88d1aa8e71e79c",
    },
    {
      _id: "6817de1903f6170a2045c80a",
      name: "a2-workspace",
      createdBy: "6817db332cd1f960f36cda70",
      members: ["6817e1f303f6170a2045c85e"],
      createdAt: "2025-05-04T21:37:29.686Z",
      updatedAt: "2025-05-04T21:53:55.711Z",
      id: "6817de1903f6170a2045c80a",
    },
    {
      _id: "6817db632cd1f960f36cda80",
      name: "a1-workspace",
      createdBy: "6817db332cd1f960f36cda70",
      members: ["6817dca72cd1f960f36cda87"],
      createdAt: "2025-05-04T21:25:55.332Z",
      updatedAt: "2025-05-04T21:31:19.526Z",
      id: "6817db632cd1f960f36cda80",
    },
    {
      _id: "6813db1116592daf4451568c",
      name: "asmaa-workspace",
      createdBy: "6813ba3ce581b07a4208e65a",
      members: ["6813e0c7a2d8a5a4e066795c"],
      createdAt: "2025-05-01T20:35:29.636Z",
      updatedAt: "2025-05-01T20:59:52.451Z",
      id: "6813db1116592daf4451568c",
    },
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
