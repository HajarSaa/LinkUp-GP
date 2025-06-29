import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./ForwardMessageModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeForwardModal } from "../../../../API/redux_toolkit/modals/chat/forwardModal";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import ChannelType from "../../Channel/ChannelType/ChannelType";
import UserImage from "../../User/UserImage";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";

const ForwardMessageModal = () => {
  const { isOpen } = useSelector((state) => state.forwardModal);
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);

  const channels = workspace.channels || [];
  const conversations = useGetSidebarConvers(workspace) || [];

  const searchRef = useRef();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // تحويل الداتا لشكل موحد
  const targetItems = useMemo(() => {
    const convItems = conversations.map((conv) => ({
      id: conv.conversationId,
      type: "conversation",
      name: conv.member?.userName || "Unknown",
      image: conv.member?.photo || "",
    }));

    const channelItems = channels.map((ch) => ({
      id: ch._id,
      type: "channel",
      name: ch.name,
      channelType: ch.type,
    }));

    return [...convItems, ...channelItems];
  }, [conversations, channels]);

  // فلترة بالبحث
  const filteredItems = useMemo(() => {
    return targetItems.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, targetItems]);

  // التوجّه لما تختار أو تشيل اختيار
  const handleSelectChange = (item) => {
    const exists = selected.some(
      (s) => s.id === item.id && s.type === item.type
    );
    setSelected((prev) =>
      exists
        ? prev.filter((s) => !(s.id === item.id && s.type === item.type))
        : [...prev, { type: item.type, id: item.id }]
    );
  };

  const isChecked = (item) => {
    return selected.some((s) => s.id === item.id && s.type === item.type);
  };

  const handleClose = () => dispatch(closeForwardModal());

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleForward = () => {
    console.log("Selected Targets:", selected);
    // ابعت الرسالة هنا بقى...
    handleClose();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={handleCloseModal}>
      <div className={styles.forwardModal}>
        <div className={styles.modal_header}>
          <h2 className={styles.title}>Forward Message</h2>
          <CloseIcon closeEvent={handleClose} />
        </div>

        <div className={styles.container}>
          <input
            ref={searchRef}
            name="forward_search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchBox}
          />

          <div className={styles.list}>
            {filteredItems.map((item) => (
              <label key={`${item.type}-${item.id}`} className={styles.item}>
                <input
                  type="checkbox"
                  checked={isChecked(item)}
                  onChange={() => handleSelectChange(item)}
                />
                {item.type === "channel" ? (
                  <div className={styles.channelTag}>
                    <ChannelType type={item.channelType} />
                    <span>{item.name}</span>
                  </div>
                ) : (
                  <div className={styles.dmInfo}>
                    <div className={styles.dmInfo_image}>
                      <UserImage src={item.image} alt={item.name} />
                    </div>
                    <span>{item.name}</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.btns}>
          <button className={styles.btn} onClick={handleClose}>
            Cancel
          </button>
          <button
            className={`${styles.btn} ${styles.forward_btn}`}
            onClick={handleForward}
          >
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardMessageModal;
