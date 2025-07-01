// import { useDispatch, useSelector } from "react-redux";
// import Modal from "../Modal";
// import styles from "./IncomingCallModal.module.css";
// import { acceptCall, rejectCall, resetCall } from "../../../../API/redux_toolkit/api_data/callSlice";
// import { FaPhoneAlt, FaPhoneSlash } from "react-icons/fa";
// import UserImage from "../../User/UserImage";
// import socket from "../../../../API/sockets/socketService";

// const IncomingCallModal = () => {
//   const dispatch = useDispatch();
//   const { callStatus, fromUser, conversationId } = useSelector((state) => state.call);
//   const rawMembers = useSelector((state) => state.workspace.workspace?.members);
// const members = rawMembers || [];
// const caller = Array.isArray(members)
//   ? members.find((user) => user._id === fromUser)
//   : null;


//   const handleAccept = () => {
//     socket.emit("acceptCall", { from: fromUser, conversationId });
//     dispatch(acceptCall());
//   };

//   const handleReject = () => {
//   socket.emit("rejectCall", {
//     to: fromUser,
//     conversationId,
//   });
//   dispatch(rejectCall()); // يغيّر الحالة لـ idle أو rejected
//   dispatch(resetCall()); // يمسح الداتا
// };


//   return (
//     <Modal isOpen={callStatus === "incoming"} onClose={handleReject} title="Incoming Call">
//       <div className={styles.container}>
//         <UserImage src={caller?.photo} alt={caller?.userName} size="80px" />
//         <h3>{caller?.userName} is calling you...</h3>
//         <div className={styles.actions}>
//           <button className={styles.accept} onClick={handleAccept}>
//             <FaPhoneAlt /> Accept
//           </button>
//           <button className={styles.reject} onClick={handleReject}>
//             <FaPhoneSlash /> Reject
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default IncomingCallModal;


import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import styles from "./IncomingCallModal.module.css";
import { acceptCall, rejectCall, resetCall } from "../../../../API/redux_toolkit/api_data/callSlice";
import { FaPhoneAlt, FaPhoneSlash } from "react-icons/fa";
import UserImage from "../../User/UserImage";
import socket from "../../../../API/sockets/socketService";
import useWebRTC from "../../../../API/hooks/socket/useWebRTC";

const IncomingCallModal = () => {
  const dispatch = useDispatch();
  const { callStatus, fromUser, conversationId } = useSelector((state) => state.call);
  const rawMembers = useSelector((state) => state.workspace.workspace?.members);
  const members = rawMembers || [];
  const caller = Array.isArray(members)
    ? members.find((user) => user._id === fromUser)
    : null;

  // استخدم الـ useWebRTC من البداية
  const {
    initCall,
    createAnswer,
  } = useWebRTC(conversationId, (stream) => {
    console.log("✅ Remote stream received in modal:", stream);
  });

  const handleAccept = async () => {
    try {
      const incoming = window.__incomingOffer__;
      if (!incoming) return;

      // نحتفظ بـ conversationId للطرف التاني عشان يستقبل الـ answer
      window.__conversationId__ = incoming.conversationId;

      await initCall();
      await createAnswer(incoming.offer);

      socket.emit("acceptCall", {
        from: incoming.from,
        conversationId: incoming.conversationId,
      });

      console.log("📞 You accepted the call from:", incoming.from);
      dispatch(acceptCall());
    } catch (err) {
      console.error("❌ Failed to accept call:", err);
    }
  };

  const handleReject = () => {
    socket.emit("rejectCall", {
      to: fromUser,
      conversationId,
    });
    console.log("❌ You rejected the call from:", fromUser);
    dispatch(rejectCall());
    dispatch(resetCall());
  };

  return (
    <Modal isOpen={callStatus === "incoming"} onClose={handleReject} title="Incoming Call">
      <div className={styles.container}>
        <UserImage src={caller?.photo} alt={caller?.userName} size="80px" />
        <h3>{caller?.userName} is calling you...</h3>
        <div className={styles.actions}>
          <button className={styles.accept} onClick={handleAccept}>
            <FaPhoneAlt /> Accept
          </button>
          <button className={styles.reject} onClick={handleReject}>
            <FaPhoneSlash /> Reject
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default IncomingCallModal;
