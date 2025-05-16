import MessageInput from "../../components/UI/InputField/MessageInput/MessageInput";
import Header from "../../components/UI/Channel/Header/Header";
import ChannelBody from "../../components/UI/Channel/ChannelBody/ChannelBody";
import PageContent from "../../components/Layout/PageContent/PageContnet";
import useCurrentChannel from "../../API/hooks/useCurrentChannel";
import { useParams } from "react-router-dom";

function ChannelPage() {
  const {id} = useParams()
  const { channel: channel_2, loading, error } = useCurrentChannel(id);
  if (!loading)
    console.log(channel_2, loading, error);

  const channel = {
    id: 1,
    name: "general",
    description: "General discussions and updates",
    topic: "Announcements and team updates",
    isPrivate: false,
    isActive: true,
    hasUnread: true,
    createdBy: "Ahmed",
    createdAt: "2025-03-01T10:00:00Z",
    pinnedMessages: [
      {
        id: 1,
        text: "Remember to submit your reports by Friday.",
        sender: "Hajar",
        timestamp: "2025-03-02T08:00:00Z",
      },
    ],
    members: [
      {
        id: 1,
        name: "Ahmed",
        role: "Admin",
        status: "Online",
        avatar: "/public/assets/avatars/ahmed.png",
        displayName: "AYmoon",
      },
      {
        id: 2,
        name: "Omar",
        role: "Member",
        status: "Away",
        avatar: "/assets/avatars/omar.png",
        displayName: "Mans",
      },
      {
        id: 3,
        name: "Alaa",
        role: "Member",
        status: "Offline",
        avatar: "/assets/avatars/alaa.png",
        displayName: "alaa",
      },
    ],
    messages: [
      {
        id: 1,
        sender: "Ahmed",
        text: "Welcome to the general channel!",
        timestamp: "2025-03-10T10:00:00Z",
        editedAt: "2025-03-10T10:05:00Z",
        reactions: [
          { emoji: "👍", count: 3 },
          { emoji: "❤️", count: 1 },
        ],
        attachments: [
          {
            type: "image",
            url: "/assets/images/note.png",
          },
        ],
        thread: [
          {
            id: 1,
            sender: "Omar",
            text: "Thanks, Ahmed!",
            timestamp: "2025-03-04T10:05:00Z",
          },
          {
            id: 2,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 3,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 4,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
          {
            id: 5,
            sender: "Ahmed",
            text: "You're welcome!",
            timestamp: "2025-03-04T10:05:15Z",
          },
        ],
      },
      {
        id: 2,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 3,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
      {
        id: 4,
        sender: "Alaa",
        text: "Any updates on the project?",
        timestamp: "2025-03-04T11:00:00Z",
        reactions: [{ emoji: "🤔", count: 2 }],
        thread: [],
      },
    ],
  };

  return (
    <PageContent>
      <Header channel={channel} />
      <ChannelBody />
      <MessageInput />
      {/* <div>
        hello
      </div> */}
    </PageContent>
  );
}

export default ChannelPage;
