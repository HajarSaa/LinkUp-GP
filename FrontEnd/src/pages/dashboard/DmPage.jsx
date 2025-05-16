import { useParams } from "react-router-dom";
import PageContent from "../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../components/UI/UserDM/UserCard";
import UserNavbar from "../../components/UI/UserDM/Userbar";
import useCurrentConvers from "../../API/hooks/useCurrentConvers";
import Spinner from "../../routes/Spinner/Spinner";
import styles from "./dashboard.module.css";

function DmPage() {
  const { id:convers_id } = useParams();
  const {loading, error } = useCurrentConvers(convers_id);
  if (loading)
    return (
      <div className={styles.status}>
        <Spinner width={70} height={70} border={3} color="var(--primary-color)" />
      </div>
    );
  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>;
  return (
    <PageContent>
      <UserNavbar />
      <UserCard />
      <MessageInput />
    </PageContent>
  );
}

export default DmPage;
