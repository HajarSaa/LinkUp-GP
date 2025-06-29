/* eslint-disable react-hooks/exhaustive-deps */
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import Header from "../../components/UI/Channel/Header/Header";
import ChannelBody from "../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../components/Layout/PageContent/PageContnet";
import { useLocation, useParams } from "react-router-dom";
import styles from "./dashboard.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Panel from "../../components/Layout/Panel/Panel";
import useGetChannel from "../../API/hooks/channel/useGetChannel";
import useGetChannelMessages from "../../API/hooks/messages/useGetChannelMessage";
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
import { isAChannelMember } from "../../utils/channelUtils";
import ChannelAuth from "../../components/UI/Channel/ChannelAuth/ChannelAuth";
import PrivateChAuth from "../../components/UI/Channel/ChannelAuth/PrivateChAuth";
import EditMessageInput from "../../components/UI/InputField/MessageInput/EditMessageInput";
import FilesContainer from "../../components/UI/FilesContainer/FilesContainer";
import useGetChannelMedia from "../../API/hooks/channel/useGetChannelMedia";
import useRoomSubscription from "../../API/hooks/socket/useRoomSubscription";
import TypingIndicator from "../../components/Chat/TypingIndicator/TypingIndicator";
import PinnedContainer from "../../components/UI/PinnedContainer/PinnedContainer";
import useGetChannelPinnedMessages from "../../API/hooks/messages/useGetChannelPinnedMessages";

function ChannelPage() {
  const { channel } = useSelector((state) => state.channel);
  // const channel = useSelector((state) => state.channel.channel);
  const roomId = channel ? `channel:${channel._id}` : null;
  const { workspace } = useSelector((state) => state.workspace);
  const { isEditing, isInThread } = useSelector((state) => state.editMessage);
  const { id: channel_id } = useParams();
  const channel_query = useGetChannel(channel_id);
  const message_query = useGetChannelMessages(channel_id);
  const media_query = useGetChannelMedia(channel_id);
  const pins_query = useGetChannelPinnedMessages(channel_id);

  const isMember =
    channel && workspace ? isAChannelMember(workspace, channel) : false;
  const [activeTab, setActiveTab] = useState("messages");
  const dispatch = useDispatch();

  useRoomSubscription(roomId);


  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pinnedMessageId = params.get("pinned_message");

    if (pinnedMessageId) {
      setActiveTab("messages");
    }
  }, [location.search]);


  // handle opened Panels
  useEffect(() => {
    const isUserPanel = isIdInOpenedUserPanelItems(channel_id);
    const isThreadPanel = isIdInOpenedThreadPanelItems(channel_id);
    if (isUserPanel) {
      dispatch(
        openUserPanel({
          type: "userPanel",
          panel_id: getUserPanelIdByPageId(channel_id),
          page_id: channel_id,
        })
      );
    } else if (isThreadPanel) {
      const parentMessage = getParentMessageByPageId(channel_id);

      const existing = document.getElementById(`message-${parentMessage?._id}`);

      if (parentMessage && existing) {
        dispatch(
          openThreadPanel({
            threadID: getThreadPanelIdByPageId(channel_id),
            parentMessage,
            type: "threadPanel",
            page_id: channel_id,
          })
        );
      } else {
        RemoveFromOpenedThreadPanelItems(channel_id);
        dispatch(closeChatPanel());
      }
    } else {
      dispatch(closeChatPanel());
    }
    // reset active tab
    setActiveTab("messages");
  }, [channel_id, dispatch]);

  useEffect(() => {
    if (activeTab === "pins" && !pins_query.isFetching) {
      pins_query.refetch();
    }
  }, [activeTab]);


  if (channel_query.isLoading || message_query.isLoading)
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
  if (channel_query.isError)
    return (
      <div className={`${styles.status} ${styles.error}`}>
        {channel_query.error}
      </div>
    );
  if (message_query.isError)
    return (
      <div className={`${styles.status} ${styles.error}`}>
        {message_query.error}
      </div>
    );

  if (!channel) return;

  return (
    <PageContent>
      {channel?.type === "private" && !isMember ? (
        <PrivateChAuth />
      ) : (
        <>
          <div className={styles.page_content}>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "messages" ? (
              <>
                <ChannelBody />
                <TypingIndicator roomId={roomId} />
                {isMember ? (
                  isEditing && !isInThread ? (
                    <EditMessageInput />
                  ) : (
                    <MessageInput channelName={channel?.name} />
                  )
                ) : (
                  <ChannelAuth channel={channel} />
                )}
              </>
            ) : activeTab === "pins" ? (
              <PinnedContainer
                pins={pins_query.data?.pages?.flatMap(
                  (page) => page.data.messages
                )}
                isLoading={pins_query.isLoading}
                isError={pins_query.isError}
                error={pins_query.error}
                fetchNextPage={pins_query.fetchNextPage}
                hasNextPage={pins_query.hasNextPage}
                media={media_query?.data?.media}
              />
            ) : (
              <FilesContainer
                files={media_query?.data?.media}
                isLoading={media_query.isLoading}
                isError={media_query.isError}
                error={media_query.error}
              />
            )}
          </div>
          <Panel />
        </>
      )}
    </PageContent>
  );
}

export default ChannelPage;
