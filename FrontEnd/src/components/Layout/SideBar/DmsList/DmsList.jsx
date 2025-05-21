/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import styles from "./DmsList.module.css";
import DmsListItem from "./DmsListItem";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../AddButton/AddButton";
import { closeAddButtonModal } from "../../../../API/redux_toolkit/modals/addButtonModal";

function DmsList() {
  const { workspace } = useSelector((state) => state.workspace);
  const { id } = useParams();
  const dispatch = useDispatch();

  function handleCreateBtn() {
    dispatch(closeAddButtonModal());
    console.log('put here the creation modal')
  }
  function handleBrowseBtn() {
    dispatch(closeAddButtonModal());
    console.log('put here the browse modal')

  }

  return (
    <div>
      <div className={styles.list}>
        {workspace.conversations.map((conversation, index) => (
          <DmsListItem
            key={index}
            dmData={conversation}
            workspace={workspace}
            isActive={String(conversation.id) === String(id)}
          />
        ))}
      </div>
      <AddButton text="Invite people" />
    </div>
  );
}

export default DmsList;
