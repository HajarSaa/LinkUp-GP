import { useParams } from "react-router-dom";
import PageContent from "../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../components/UI/UserDM/UserCard";
import UserNavbar from "../../components/UI/UserDM/Userbar";
import useCurrentConvers from "../../API/hooks/useCurrentConvers";

function DmPage() {
  const { id } = useParams();
  const { convers, loading, error } = useCurrentConvers(id);
  if (!loading) console.log(convers, loading, error);
  return (
    <PageContent>
      <UserNavbar />
      <UserCard />
      <MessageInput />
    </PageContent>
  );
}

export default DmPage;
