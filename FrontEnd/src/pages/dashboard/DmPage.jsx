import PageContent from "../../components/Layout/PageContent/PageContnet";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../components/UI/UserDM/UserCard";
import UserNavbar from "../../components/UI/UserDM/Userbar";
// import ContentPage from "./ContentPage/ContentPage";

function DmPage() {
  return (
    <PageContent>
      <UserNavbar />
      <UserCard />
      <MessageInput />
    </PageContent>
  );
}

export default DmPage;
