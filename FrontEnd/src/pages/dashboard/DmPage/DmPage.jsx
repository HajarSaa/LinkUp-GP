import { useParams } from "react-router-dom";
import PageContent from "../../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../../components/UI/UserDM/UserCard";
import UserNavbar from "../../../components/UI/UserDM/Userbar";
import useGetConvers from "../../../API/hooks/conversation/useGetConvers";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "../dashboard.module.css";
import Panel from "../../../components/Layout/Panel/Panel";
import { useSelector } from "react-redux";

function DmPage() {
  const { convers } = useSelector((state) => state.convers);
  const { id: convers_id } = useParams();
  const convers_query = useGetConvers(convers_id);

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
        <UserNavbar />
        <UserCard />
        <MessageInput />
      </div>
      <Panel />
    </PageContent>
  );
}

export default DmPage;
