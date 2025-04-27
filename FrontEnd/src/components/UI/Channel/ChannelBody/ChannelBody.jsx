import { useParams } from "react-router-dom";
import mockChannels from "../../../../API/services/mockChannels";
import ChatMessage from "../../../Chat/ChatMessage/ChatMessage";
import ChannelIntro from "../ChannelIntro/ChannelIntro";
import { FiEdit2, FiUserPlus } from "react-icons/fi";
function ChannelBody() {
  const { id } = useParams();
  const channel = mockChannels.find((ch) => ch.id === +id);

    const actions = [
      {
        label: "Add description",
        icon: <FiEdit2 />,
        onClick: () => console.log("Add description clicked"),
      },
      {
        label: "Add people to channel",
        icon: <FiUserPlus />,
        onClick: () => console.log("Add people clicked"),
      },
    ];
  return (
    <div>
      <ChannelIntro
        title="#aaa"
        description="You created this channel on 22 March. This is the very beginning of the #aaa channel."
        actions={actions}
      />
      <ChatMessage messages={channel.messages} />
    </div>
  );
}

export default ChannelBody;
