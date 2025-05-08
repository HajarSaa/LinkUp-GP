import { useDispatch} from "react-redux";
import { openAddButtonModal } from "../../../API/redux_toolkit/modals/addButtonModal";
import ChannelList from "./ChannelList/ChannelList";
import DmsList from "./DmsList/DmsList";
import List from "./List/List";
import styles from "./SideBar.module.css";
import AddButtonModal from "../../UI/Modal/ChannelModals/AddButtonModal/AddButtonModal";

function SidebarLists() {
  const dispatch = useDispatch();
  // const { isOpen: is_button_mod_open, targetRef } = useSelector(
  //   (state) => state.addButtonModal
  // );

  const handleAddChannel = (ref) => {
    dispatch(openAddButtonModal(ref));
  };

  return (
    <div className={styles.side_bar_lists}>
      <List
        headerText={"Channels"}
        buttonText={"Add channel"}
        click_event={handleAddChannel}
      >
        <ChannelList />
      </List>

      <List headerText={"Direct messages"} buttonText={"Invite people"}>
        <DmsList />
      </List>

      {/* modals */}
      <AddButtonModal />
    </div>
  );
}

export default SidebarLists;
