import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./ForwardMessageModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Spinner/Spinner";
import { closeForwardModal } from "../../../../API/redux_toolkit/modals/chat/forwardModal";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import ChannelType from "../../Channel/ChannelType/ChannelType";
import UserImage from "../../User/UserImage";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";

const ForwardMessageModal = () => {
  const { isOpen } = useSelector((state) => state.forwardModal);
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);

  const channels = workspace.channels;
  const conversations = useGetSidebarConvers(workspace);
  const targetItems = [...conversations, ...channels];

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const searchRef = useRef();

  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  // داتا تجريبية
  const items = [
    { id: "ch1", type: "channel", name: "general" },
    { id: "ch2", type: "channel", name: "random" },
    { id: "dm1", type: "dm", name: "أحمد سامي", image: "/avatars/ahmed.jpg" },
    { id: "dm2", type: "dm", name: "الاء", image: "/avatars/alaa.jpg" },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleClose = () => {
    dispatch(closeForwardModal());
  };

  const handleSelectChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  function handleCloseModal(e) {
    if (e.target === e.currentTarget) handleClose();
  }

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
              <label key={item.id} className={styles.item}>
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleSelectChange(item.id)}
                />
                {item.type === "channel" ? (
                  <div className={styles.channelTag}>
                    <ChannelType type={"public"} />
                    <span>name</span>
                  </div>
                ) : (
                  <div className={styles.dmInfo}>
                    {/* <UserImage src={} /> */}
                    <span>{item.name}</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>
        <div className={styles.btns}>
          <button className={`${styles.btn}`}>Cancel</button>
          <button className={`${styles.btn} ${styles.forward_btn}`}>
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardMessageModal;
