import { useParams } from "react-router-dom";
import mockChannels from "../../API/services/mockChannels";
import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import ChatMessage from "../../components/Chat/ChatMessage/ChatMessage";
import ContentPage from "./ContentPage/ContentPage";
import Header from "../../components/Chat/channel/Header/Header";

function ChannelPage() {
  const { id } = useParams();
  const channel = mockChannels.find((ch) => ch.id === +id);
  return (
    <ContentPage>
      <Header channel={channel} />
      <ChatMessage messages={channel.messages} />
      <MessageInput />
    </ContentPage>
  );
}

export default ChannelPage;
