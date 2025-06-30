/* eslint-disable react-hooks/exhaustive-deps */
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
  RemoveFromOpenedThreadPanelItems,
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
import useGetConversMessages from "../../API/hooks/messages/useGetConversMessages";
import useGetConversMedia from "../../API/hooks/conversation/useGetConversMedia";
import PinnedContainer from "../../components/UI/PinnedContainer/PinnedContainer";
import useGetConversationPinnedMessages from "../../API/hooks/messages/useGetConversationPinnedMessages";
import { selectPinnedMessagesByConversation } from "../../API/redux_toolkit/selectore/selectPinnedConversationMessagesSelector";

function DmPage() {
  const { convers } = useSelector((state) => state.convers);
  const { isEditing, isInThread } = useSelector((state) => state.editMessage);
  const { id: convers_id } = useParams();
  const convers_query = useGetConvers(convers_id);
  const message_query = useGetConversMessages(convers_id);
  const media_query = useGetConversMedia(convers_id);
  const pins_query = useGetConversationPinnedMessages(convers_id);
  const [activeTab, setActiveTab] = useState("messages");
  const dispatch = useDispatch();
  const roomId = convers ? `conversation:${convers._id}` : null;
  useRoomSubscription(roomId);

  const messages = useSelector((state) =>
    selectPinnedMessagesByConversation(state, convers_id)
  );

  const { conversMedia } = useSelector((state) => state.conversMedia);

  // refetch pins tab
  useEffect(() => {
    if (activeTab === "pins") {
      pins_query.refetch();
    }
  }, [activeTab, pins_query]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pinnedMessageId = params.get("pinned_message");

    if (pinnedMessageId) {
      setActiveTab("messages");
    }
  }, [location.search]);

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
      const parentMessage = getParentMessageByPageId(convers_id);

      const existing = document.getElementById(`message-${parentMessage?._id}`);

      if (parentMessage && existing) {
        dispatch(
          openThreadPanel({
            threadID: getThreadPanelIdByPageId(convers_id),
            parentMessage,
            type: "threadPanel",
            page_id: convers_id,
          })
        );
      } else {
        RemoveFromOpenedThreadPanelItems(convers_id);
        dispatch(closeChatPanel());
      }
    } else {
      dispatch(closeChatPanel());
    }
    // reset active tab
    setActiveTab("messages");
  }, [convers_id, dispatch]);

  if (convers_query.isLoading || message_query.isLoading)
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

  if (message_query.isError)
    return (
      <div className={`${styles.status} ${styles.error}`}>
        {message_query.error}
      </div>
    );

  if (!convers) return;
  return (
    <PageContent>
      <div className={styles.page_content}>
        <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "messages" ? (
          <>
            <DmBody />
            <TypingIndicator roomId={roomId} />
            {isEditing && !isInThread ? <EditMessageInput /> : <MessageInput />}
          </>
        ) : activeTab === "pins" ? (
          <PinnedContainer
            messages={messages}
            isLoading={pins_query.isLoading}
            isError={pins_query.isError}
            error={pins_query.error}
            fetchNextPage={pins_query.fetchNextPage}
            hasNextPage={pins_query.hasNextPage}
            media={media_query?.data?.media}
          />
        ) : (
          <FilesContainer
            media={conversMedia}
            isLoading={media_query.isLoading}
            isError={media_query.isError}
            error={media_query.error}
          />
        )}
      </div>
      <div className={styles.record_overlay}></div>
      <Panel />
    </PageContent>
  );
}

export default DmPage;
