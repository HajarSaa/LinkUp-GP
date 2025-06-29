import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import styles from "./PinnedContainer.module.css";
import MessageItem from "../../Chat/ChatMessage/MessageItem";
import { useLocation, useNavigate} from "react-router-dom";

function PinnedContainer({
  messages,
  isLoading,
  isError,
  error,
  fetchNextPage,
  hasNextPage,
  media,
}) {
  const containerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();


  console.log(messages);

  // loading more messages
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container || !hasNextPage || isLoading) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      // لما يقرب من الآخر
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchNextPage();
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isLoading, fetchNextPage]);


  const handleNavigate = (message) => {
    const params = new URLSearchParams(location.search);
    params.set("pinned_message", message._id);

    let path = "";

    if (message.channelId) {
      path = `/channels/${message.channelId}`;
    } else if (message.conversationId) {
      path = `/conversations/${message.conversationId}`;
    }

    navigate(`${path}?${params.toString()}`);
  };



  if (isLoading && (!messages || messages.length === 0))
    return (
      <div className={styles.status}>
        <Spinner width={60} height={60} color="var(--primary-color)" />
      </div>
    );
  if (isError) return <div className={styles.status}>{error?.message}</div>;

  if (messages.length === 0)
    return (
      <div className={styles.status}>
        <p>No pinned messages yet</p>
      </div>
    );
    return (
      <>
        <div className={styles.title}>Pinned messages</div>
        <div className={styles.pinnedContainer}>
          <div ref={containerRef} className={styles.pins_list}>
            {messages.map((pin, index) => (
              <div
                key={index}
                className={styles.message_container}
                onClick={() => {
                  handleNavigate(pin);
                }}
              >
                <MessageItem message={pin} isPinnedTap={true} media={media} />
              </div>
            ))}
          </div>
          {isLoading && <div>Loading more...</div>}
        </div>
      </>
    );
}
PinnedContainer.propTypes = {
  messages:PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object,
  fetchNextPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  media: PropTypes.any,
};

export default PinnedContainer;
