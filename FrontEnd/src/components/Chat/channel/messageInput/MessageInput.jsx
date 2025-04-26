/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import styles from "./MessageInput.module.css";
import {
    FaBold, FaItalic, FaLink, FaListUl, FaListOl, FaSmile, FaAt,
    FaPaperPlane, FaPlus, FaVideo, FaMicrophone
} from "react-icons/fa";
// import TextareaAutosize from "react-textarea-autosize";
// import Markdown from "react-markdown";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (!message.trim()) return;
        console.log("Message Sent:", message);
        setMessage("");
        const textarea = textareaRef.current;
        textarea.style.height = "40px";
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handlInputHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    return (
        <div className={styles.messageInputContainer}>
            <div className={styles.inputBox}>
                <div className={styles.toolbar}>
                    <FaBold />
                    <FaItalic />
                    <FaLink />
                    <FaListUl />
                    <FaListOl />
                </div>

                <textarea
                    name="messageBox"
                    ref={textareaRef}
                    className={styles.textarea}
                    placeholder="write your message ..."
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onInput={handlInputHeight}
                />

                <div className={styles.actions}>
                    <div className={styles.icons}>
                        <FaPlus />
                        <FaSmile />
                        <FaAt />
                        <FaMicrophone />
                    </div>
                    <button className={message.trim() ? styles.sendButton : styles.disabled} onClick={handleSend}>
                        <FaPaperPlane />
                    </button>

                </div>
            </div>
            <div className={styles.newLineHint}>
                <span className={`${styles.hintText} ${message.trim() ? styles.showHint : styles.hideHint}`}>
                    Shift + Enter for new line
                </span>
            </div>
        </div>
    );
};

export default MessageInput;
