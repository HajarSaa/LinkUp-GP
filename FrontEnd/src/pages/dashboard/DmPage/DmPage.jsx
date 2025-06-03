import { useParams } from "react-router-dom";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../../components/UI/UserDM/UserCard";
import UserNavbar from "../../../components/UI/UserDM/Userbar";
import useGetConvers from "../../../API/hooks/conversation/useGetConvers";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "../dashboard.module.css";
import Panel from "../../../components/Layout/Panel/Panel";

function DmPage() {
  const { id: convers_id } = useParams();
  const { loading, error } = useGetConvers(convers_id);
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
        <UserNavbar />
        <UserCard />
        <MessageInput />
      </div>
      <Panel />
    </PageContent>
  );
}

export default DmPage;
