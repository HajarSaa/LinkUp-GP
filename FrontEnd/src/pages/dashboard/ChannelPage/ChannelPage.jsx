import MessageInput from "../../../components/UI/InputField/MessageInput/MessageInput";
import Header from "../../../components/UI/Channel/Header/Header";
import ChannelBody from "../../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import useCurrentChannel from "../../../API/hooks/useCurrentChannel";
import { useParams } from "react-router-dom";
import styles from "../dashboard.module.css";
import Spinner from "../../../routes/Spinner/Spinner";
import Panel from "../../../components/Layout/Panel/Panel";

function ChannelPage() {
  const { id: channel_id } = useParams();
  const { loading, error } = useCurrentChannel(channel_id);

  if (loading)
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
  if (error)
    return <div className={`${styles.status} ${styles.error}`}>{error}</div>;

  return (
    <PageContent>
      <div className={styles.page_content}>
        <Header/>
        <ChannelBody />
        <MessageInput />
      </div>
      <Panel />
    </PageContent>
  );
}

export default ChannelPage;
