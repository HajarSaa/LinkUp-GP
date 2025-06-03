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
  const { id: channel_id } = useParams();
  const {
    isLoading: channel_loading,
    isError: channel_error,
    ch_error,
  } = useGetChannel(channel_id);
  const {
    isLoading: messages_loading,
    isError: channel_ms_error,
    ch_ms_error,
  } = useGetChannelMessages(channel_id);

  const channel = useSelector((state) => state.channel.channel);

  if (channel_loading || messages_loading)
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
  if (channel_error)
    return <div className={`${styles.status} ${styles.error}`}>{ch_error}</div>;
  if (channel_ms_error)
    return (
      <div className={`${styles.status} ${styles.error}`}>{ch_ms_error}</div>
    );

  return (
    <PageContent>
      <div className={styles.page_content}>
        <Header />
        <ChannelBody/>
        <MessageInput channelName={channel?.name} />
      </div>
      <Panel />
    </PageContent>
  );
}

export default ChannelPage;
