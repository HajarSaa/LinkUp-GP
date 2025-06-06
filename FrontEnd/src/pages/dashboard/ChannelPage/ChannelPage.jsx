import MessageInput from "../../../components/UI/InputField/MessageInput/MessageInput";
import Header from "../../../components/UI/Channel/Header/Header";
import ChannelBody from "../../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import { useParams } from "react-router-dom";
import styles from "../dashboard.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Panel from "../../../components/Layout/Panel/Panel";
import useGetChannel from "../../../API/hooks/channel/useGetChannel";
import useGetChannelMessages from "../../../API/hooks/messages/useGetChannelMessage";
import { useSelector } from "react-redux";

function ChannelPage() {
  const { channel } = useSelector((state) => state.channel);
  const { id: channel_id } = useParams();
  const channel_query = useGetChannel(channel_id);
  const message_query = useGetChannelMessages(channel_id);

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
      <div className={styles.page_content}>
        <Header />
        <ChannelBody />
        <MessageInput channelName={channel?.name} />
      </div>
      <Panel />
    </PageContent>
  );
}

export default ChannelPage;
