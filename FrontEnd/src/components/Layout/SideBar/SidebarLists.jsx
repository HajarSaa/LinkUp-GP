import ChannelList from "./ChannelList/ChannelList";
import DmsList from "./DmsList/DmsList";
import List from "./List/List";
import styles from "./SideBar.module.css";

function SidebarLists() {

  function handleChanneladd() {
    console.log('add channel')
  }
  function handleDmsladd() {
    console.log('add Dms')
  }

  return (
    <div className={styles.side_bar_lists}>
      <List
        headerText={"Channels"}
        buttonText={"Add channel"}
        handleAdd={handleChanneladd}
      >
        <ChannelList />
      </List>

      <List
        headerText={"Direct messages"}
        buttonText={"Invite people"}
        handleAdd={handleDmsladd}
      >
        <DmsList />
      </List>
    </div>
  );
}

export default SidebarLists;
