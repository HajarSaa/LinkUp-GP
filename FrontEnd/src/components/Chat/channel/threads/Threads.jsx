/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { openThread } from "../../../../API/redux/chat/channel/threadSlice";
import styles from "./Threads.module.css";
import { RiArrowRightSLine } from "react-icons/ri";

function Threads({ message, channel }) {
    const dispatch = useDispatch();
    return (
        <>
            {message.thread && message.thread.length > 0 && (
                <div className={styles.thread}>

                    <div className={styles.avatars}>
                        {message.thread.slice(0, 2).map((reply, index) => {
                            const avatarSrc = channel.members.find((m) => m.name === reply.sender)?.avatar;
                            return (
                                <img
                                    key={index}
                                    src={avatarSrc}
                                    alt={reply.sender}
                                    className={styles.threadAvatar}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.threadView}
                    onClick={() => dispatch(openThread(message))}>
                        <div className={styles.text}>
                            <span className={styles.replies}>{message.thread.length} replies</span>
                            <span className={styles.viewThread}>View thread</span>
                        </div>
                        <RiArrowRightSLine size={20} className={styles.threadIcon} />
                    </div>
                </div>
            )}

        </>
    )
}

export default Threads