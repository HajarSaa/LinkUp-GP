import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import UserCard from "../../components/UI/UserDM/UserCard";
import UserNavbar from "../../components/UI/UserDM/Userbar";
import ContentPage from "./ContentPage/ContentPage";

function DmPage() {
  return (
    <ContentPage>
      <UserNavbar />
      <UserCard />
      <MessageInput />
    </ContentPage>
  );
}

export default DmPage;
