import { useEffect, useState } from "react";
import styles from "./MI.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { HiMiniBold } from "react-icons/hi2";
import { FiItalic } from "react-icons/fi";
import { AiOutlineStrikethrough, AiOutlineAudio } from "react-icons/ai";
import { PiLinkBold, PiCodeBlockBold } from "react-icons/pi";
import {
  MdOutlineFormatListNumbered,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { RiQuoteText } from "react-icons/ri";
import { IoCodeSlash, IoVideocamOutline, IoSend } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { FaPlus } from "react-icons/fa6";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { BsEmojiSmile } from "react-icons/bs";
import { GoMention } from "react-icons/go";
import { CgShortcut } from "react-icons/cg";

import PropTypes from "prop-types";

const MI = ({ isThread, channelName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
  });

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strike: false,
    underline: false,
    bullet: false,
    ordered: false,
    blockquote: false,
    code: false,
    codeBlock: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.focus();
    }
  }, [editor]);

  const handleSend = async () => {
    const message = editor?.getHTML() || "";
    if (!message || message === "<p></p>") return;

    console.log(message);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggle = (format) => {
    if (!editor) return;

    switch (format) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        setActiveFormats((prev) => ({
          ...prev,
          bold: editor.isActive("bold"),
        }));
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        setActiveFormats((prev) => ({
          ...prev,
          italic: editor.isActive("italic"),
        }));
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        setActiveFormats((prev) => ({
          ...prev,
          strike: editor.isActive("strike"),
        }));
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        setActiveFormats((prev) => ({
          ...prev,
          underline: editor.isActive("underline"),
        }));
        break;
      case "bullet":
        editor.chain().focus().toggleBulletList().run();
        setActiveFormats((prev) => ({
          ...prev,
          bullet: editor.isActive("bulletList"),
        }));
        break;
      case "ordered":
        editor.chain().focus().toggleOrderedList().run();
        setActiveFormats((prev) => ({
          ...prev,
          ordered: editor.isActive("orderedList"),
        }));
        break;
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run();
        setActiveFormats((prev) => ({
          ...prev,
          blockquote: editor.isActive("blockquote"),
        }));
        break;
      case "code":
        editor.chain().focus().toggleCode().run();
        setActiveFormats((prev) => ({
          ...prev,
          code: editor.isActive("code"),
        }));
        break;
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run();
        setActiveFormats((prev) => ({
          ...prev,
          codeBlock: editor.isActive("codeBlock"),
        }));
        break;
      default:
        break;
    }
  };



  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.input_field}>
        <div className={styles.upper_row_icons}>
          <span
            onClick={() => toggle("bold")}
            className={`${styles.upper_icons} ${
              activeFormats.bold ? styles.activeIcon : ""
            }`}
          >
            <HiMiniBold />
          </span>

          <span
            onClick={() => toggle("italic")}
            className={`${styles.upper_icons} ${
              activeFormats.italic ? styles.activeIcon : ""
            }`}
          >
            <FiItalic />
          </span>

          <span
            onClick={() => toggle("strike")}
            className={`${styles.upper_icons} ${
              activeFormats.strike ? styles.activeIcon : ""
            }`}
          >
            <AiOutlineStrikethrough />
          </span>

          <span className={styles.upper_icons}>
            <PiLinkBold />
          </span>

          <span
            onClick={() => toggle("ordered")}
            className={`${styles.upper_icons} ${
              activeFormats.ordered ? styles.activeIcon : ""
            }`}
          >
            <MdOutlineFormatListNumbered />
          </span>

          <span
            onClick={() => toggle("bullet")}
            className={`${styles.upper_icons} ${
              activeFormats.bullet ? styles.activeIcon : ""
            }`}
          >
            <MdOutlineFormatListBulleted />
          </span>

          <span
            onClick={() => toggle("blockquote")}
            className={`${styles.upper_icons} ${
              activeFormats.blockquote ? styles.activeIcon : ""
            }`}
          >
            <RiQuoteText />
          </span>

          <span
            onClick={() => toggle("code")}
            className={`${styles.upper_icons} ${
              activeFormats.code ? styles.activeIcon : ""
            }`}
          >
            <IoCodeSlash />
          </span>

          <span
            onClick={() => toggle("codeBlock")}
            className={`${styles.upper_icons} ${
              activeFormats.codeBlock ? styles.activeIcon : ""
            }`}
          >
            <PiCodeBlockBold />
          </span>
        </div>

        <EditorContent
          editor={editor}
          className={styles.textarea}
          onKeyDown={handleKeyDown}
        />

        {isThread && (
          <label className={styles.checkBox}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className={styles.checkBox_input}
            />
            <span className={styles.checkBox_text}>Also send to</span>
            {channelName && (
              <span className={styles.checkBox_channelName}>{channelName}</span>
            )}
          </label>
        )}

        <div className={styles.lower_row_icons}>
          <div className={styles.left_icons}>
            <FaPlus className={styles.lower_icon_style} />
            <RxLetterCaseCapitalize className={styles.lower_icon_style} />
            <BsEmojiSmile className={styles.lower_icon_style} />
            <GoMention className={styles.lower_icon_style} />
            <IoVideocamOutline className={styles.lower_icon_style} />
            <AiOutlineAudio className={styles.lower_icon_style} />
            <CgShortcut className={styles.lower_icon_style} />
          </div>
          <div
            className={`${styles.right_icons} ${
              editor?.getText().trim() && styles.activeSend
            }`}
          >
            <div
              className={`${styles.sendBtns} ${styles.sendBtns_send}`}
              onClick={handleSend}
            >
              <IoSend />
            </div>
            <div className={styles.box11}></div>
            <div className={`${styles.sendBtns} ${styles.sendBtns_dropdown}`}>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${styles.newLineHint} ${
          !editor?.getText().trim() && styles.hidden
        }`}
      >
        <span
          className={`${styles.hintText} ${
            editor?.getText().trim() ? styles.showHint : styles.hideHint
          }`}
        >
          Shift + Enter for new line
        </span>
      </div>
    </div>
  );
};

MI.propTypes = {
  channelName: PropTypes.string,
  isThread: PropTypes.bool,
};

export default MI;
