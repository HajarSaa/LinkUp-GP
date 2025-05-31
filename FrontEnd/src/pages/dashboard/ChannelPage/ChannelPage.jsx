import MessageInput from "../../../components/UI/InputField/MessageInput/MessageInput";
import Header from "../../../components/UI/Channel/Header/Header";
import ChannelBody from "../../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import { useParams } from "react-router-dom";
import styles from "../dashboard.module.css";
import Spinner from "../../../routes/Spinner/Spinner";
import Panel from "../../../components/Layout/Panel/Panel";
import useGetChannel from "../../../API/hooks/useGetChannel";
import { useSelector } from "react-redux";

function ChannelPage() {
  const { id: channel_id } = useParams();
  const {isLoading,isError, error } = useGetChannel(channel_id);
  const channel = useSelector((state) => state.channel.channel);

  if (isLoading)
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
  if (isError)
    return <div className={`${styles.status} ${styles.error}`}>{error}</div>;

    return (
      <PageContent>
        <div className={styles.page_content}>
          <Header channel={channel} />
          <ChannelBody channel={channel} />
          <MessageInput channelName={channel?.name} />
        </div>
        <Panel />
      </PageContent>
    );
}

export default ChannelPage;
