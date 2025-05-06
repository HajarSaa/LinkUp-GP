import { useParams } from "react-router-dom";
import mockChannels from "../../API/services/mockChannels";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
// import ChatMessage from "../../components/Chat/ChatMessage/ChatMessage";
// import ContentPage from "./ContentPage/ContentPage";
import Header from "../../components/UI/Channel/Header/Header";
import ChannelBody from "../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../components/Layout/PageContent/PageContnet";


function ChannelPage() {
  const { id } = useParams();
  const channel = mockChannels.find((ch) => ch.id === +id);

  return (
    <PageContent>
      <Header channel={channel} />
      <ChannelBody />
      <MessageInput />
    </PageContent>
  );
}

export default ChannelPage;
