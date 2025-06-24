import { useParams } from "react-router-dom";
import PageContent from "../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import UserNavbar from "../../components/UI/UserDM/Userbar";
import useGetConvers from "../../API/hooks/conversation/useGetConvers";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./dashboard.module.css";
import Panel from "../../components/Layout/Panel/Panel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getParentMessageByPageId,
  getThreadPanelIdByPageId,
  getUserPanelIdByPageId,
  isIdInOpenedThreadPanelItems,
  isIdInOpenedUserPanelItems,
} from "../../utils/panelUtils";
import {
  closeChatPanel,
  openThreadPanel,
  openUserPanel,
} from "../../API/redux_toolkit/ui/chatPanelSlice";
import EditMessageInput from "../../components/UI/InputField/MessageInput/EditMessageInput";
import FilesContainer from "../../components/UI/FilesContainer/FilesContainer";
import useRoomSubscription from "../../API/hooks/socket/useRoomSubscription";
import TypingIndicator from "../../components/Chat/TypingIndicator/TypingIndicator";
import DmBody from "../../components/UI/UserDM/DmBody";


function DmPage() {
  const { convers } = useSelector((state) => state.convers);
  const { isEditing, isInThread } = useSelector((state) => state.editMessage);
  const { id: convers_id } = useParams();
  const convers_query = useGetConvers(convers_id);
  const [activeTab, setActiveTab] = useState("messages");
  const dispatch = useDispatch();
  const roomId = convers ? `conversation:${convers._id}` : null;
  useRoomSubscription(roomId);
  // handle opened panel
  useEffect(() => {
    const isUserPanel = isIdInOpenedUserPanelItems(convers_id);
    const isThreadPanel = isIdInOpenedThreadPanelItems(convers_id);
    if (isUserPanel) {
      dispatch(
        openUserPanel({
          type: "userPanel",
          panel_id: getUserPanelIdByPageId(convers_id),
          page_id: convers_id,
        })
      );
    } else if (isThreadPanel) {
      dispatch(
        openThreadPanel({
          threadID: getThreadPanelIdByPageId(convers_id),
          parentMessage: getParentMessageByPageId(convers_id),
          type: "threadPanel",
          page_id: convers_id,
        })
      );
    } else {
      dispatch(closeChatPanel());
    }
    // reset active tab
    setActiveTab("messages");
  }, [convers_id, dispatch]);

  if (convers_query.isLoading)
    return (
      <div className={styles.status}>
        <Spinner
          width={70}
          height={70}
          border={3}
          color="var(--primary-color)"
        />
      </div>
    );

  if (convers_query.isError)
    return (
      <div className={`${styles.status} ${styles.error}`}>
        {convers_query.error}
      </div>
    );

  if (!convers) return;
  return (
    <PageContent>
      <div className={styles.page_content}>
        <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "messages" ? (
          <>
            <DmBody/>
            <TypingIndicator roomId={roomId} />
            {isEditing && !isInThread ? <EditMessageInput /> : <MessageInput />}
          </>
        ) : (
          <FilesContainer files={[]} type="conversation" />
        )}
      </div>
      <Panel />
    </PageContent>
  );
}

export default DmPage;
