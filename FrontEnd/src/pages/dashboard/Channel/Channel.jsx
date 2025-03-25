import { useParams } from "react-router-dom";
import mockChannels from "../../../API/services/mockChannels";  // ✅ [جديد] جلب البيانات
import styles from "./Channel.module.css";

const Channel = () => {
  const { id } = useParams();  // ✅ [جديد] جلب الـ ID من الـ URL
  const channel = mockChannels.find((ch) => ch.id === parseInt(id));

  if (!channel) {
    return <h2 className={styles.notFound}>Channel not found!</h2>;
  }

  return (
    <div className={styles.channelContent}>
      <h1 className={styles.channelName}>{channel.name}</h1>
      <p className={styles.channelDescription}>{channel.description}</p>
      <div className={styles.messages}>
        {channel.messages.map((msg) => (
          <div key={msg.id} className={styles.message}>
            <strong>{msg.sender}:</strong> {msg.text}
            <span className={styles.timestamp}>{msg.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
