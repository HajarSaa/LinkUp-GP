// // import styles from "./HuddlesSidebar.module.css";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// // //   endCall,
// //   resetCall,
// //   toggleMute,
// //   toggleVideo,
// //   toggleScreenShare,
// //   endCall,
// // } from "../../../../API/redux_toolkit/api_data/callSlice";
// // import UserImage from "../../../UI/User/UserImage";
// // import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
// // import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
// // import { IoMdCloseCircle } from "react-icons/io";
// // import socket from "../../../../API/sockets/socketService";

// // const HuddleSidebar = () => {
// //   const dispatch = useDispatch();
// //   const {
// //     callStatus,
// //     // fromUser,
// //     conversationId,
// //     muted,
// //     videoEnabled,
// //     screenSharing,
// //   } = useSelector((state) => state.call);

// //   const chatMate = useSelector((state) => state.convers.chatMate);

// //   if (callStatus !== "in-call" && callStatus !== "incoming") return null;

// //   const handleToggleMute = () => {
// //     const newMute = !muted;
// //     dispatch(toggleMute(newMute));
// //     socket.emit("toggleMute", { conversationId, muted: newMute });
// //   };

// //   const handleToggleVideo = () => {
// //     const newVideo = !videoEnabled;
// //     dispatch(toggleVideo(newVideo));
// //     socket.emit("toggleVideo", { conversationId, videoEnabled: newVideo });
// //   };

// //   const handleToggleScreen = () => {
// //     const newShare = !screenSharing;
// //     dispatch(toggleScreenShare(newShare));
// //     socket.emit("toggleScreenShare", { conversationId, screenSharing: newShare });
// //   };

// //   const handleLeave = () => {
// //   socket.emit("call:ended", {
// //     to: chatMate?._id,
// //     conversationId,
// //   });
// //   dispatch(endCall());   // يحول الحالة لـ "ended"
// //   dispatch(resetCall()); // يمسح بيانات الاتصال
// // };


// //   return (
// //     <div className={styles.sidebar}>
// //       <div className={styles.header}>
// //         <UserImage src={chatMate?.photo} alt={chatMate?.userName} />
// //         <span className={styles.name}>{chatMate?.userName}</span>
// //         <span className={styles.status}>LIVE</span>
// //       </div>
// //       <div className={styles.controls}>
// //         <button onClick={handleToggleMute} title={muted ? "Unmute" : "Mute"}>
// //           {muted ? <FiMicOff /> : <FiMic />} {muted ? "Unmute" : "Mute"}
// //         </button>

// //         <button onClick={handleToggleVideo} title={videoEnabled ? "Stop Video" : "Start Video"}>
// //           {videoEnabled ? <FiVideo /> : <FiVideoOff />} Video
// //         </button>

// //         <button onClick={handleToggleScreen} title={screenSharing ? "Stop Share" : "Share Screen"}>
// //           {screenSharing ? <LuScreenShareOff /> : <LuScreenShare />} Share
// //         </button>

// //         <button className={styles.leave} onClick={handleLeave}>
// //           <IoMdCloseCircle /> Leave
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HuddleSidebar;


// import styles from "./HuddlesSidebar.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   resetCall,
//   toggleMute,
//   toggleVideo,
//   toggleScreenShare,
//   endCall,
// } from "../../../../API/redux_toolkit/api_data/callSlice";
// import UserImage from "../../../UI/User/UserImage";
// import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
// import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
// import { IoMdCloseCircle } from "react-icons/io";
// import socket from "../../../../API/sockets/socketService";

// const HuddleSidebar = () => {
//   const dispatch = useDispatch();
//   const {
//     callStatus,
//     conversationId,
//     muted,
//     videoEnabled,
//     screenSharing,
//   } = useSelector((state) => state.call);

//   const chatMate = useSelector((state) => state.convers.chatMate);

//   if (callStatus !== "in-call" && callStatus !== "incoming") return null;

//   const handleToggleMute = () => {
//     const newMute = !muted;
//     dispatch(toggleMute(newMute));
//     socket.emit("toggleMute", { conversationId, muted: newMute });
//   };

//   const handleToggleVideo = () => {
//     const newVideo = !videoEnabled;
//     dispatch(toggleVideo(newVideo));
//     socket.emit("toggleVideo", { conversationId, videoEnabled: newVideo });
//   };

//   const handleToggleScreen = () => {
//     const newShare = !screenSharing;
//     dispatch(toggleScreenShare(newShare));
//     socket.emit("toggleScreenShare", { conversationId, screenSharing: newShare });
//   };

//   const handleLeave = () => {
//     socket.emit("call:ended", {
//       to: chatMate?._id,
//       conversationId,
//     });
//     console.log("📴 You ended the call");
//     dispatch(endCall());
//     dispatch(resetCall());
//   };

//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.header}>
//         <UserImage src={chatMate?.photo} alt={chatMate?.userName} />
//         <span className={styles.name}>{chatMate?.userName}</span>
//         <span className={styles.status}>LIVE</span>
//       </div>
//       <div className={styles.controls}>
//         <button onClick={handleToggleMute} title={muted ? "Unmute" : "Mute"}>
//           {muted ? <FiMicOff /> : <FiMic />} {muted ? "Unmute" : "Mute"}
//         </button>

//         <button onClick={handleToggleVideo} title={videoEnabled ? "Stop Video" : "Start Video"}>
//           {videoEnabled ? <FiVideo /> : <FiVideoOff />} Video
//         </button>

//         <button onClick={handleToggleScreen} title={screenSharing ? "Stop Share" : "Share Screen"}>
//           {screenSharing ? <LuScreenShareOff /> : <LuScreenShare />} Share
//         </button>

//         <button className={styles.leave} onClick={handleLeave}>
//           <IoMdCloseCircle /> Leave
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HuddleSidebar;


import styles from "./HuddlesSidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCall,
  toggleMute,
  toggleVideo,
  toggleScreenShare,
  endCall,
} from "../../../../API/redux_toolkit/api_data/callSlice";
import UserImage from "../../../UI/User/UserImage";
import { FiMic, FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import socket from "../../../../API/sockets/socketService";

import { useEffect, useRef, useState } from "react";
import useWebRTC from "../../../../API/hooks/socket/useWebRTC";

const HuddleSidebar = () => {
  const dispatch = useDispatch();
  const {
    callStatus,
    conversationId,
    muted,
    videoEnabled,
    screenSharing,
  } = useSelector((state) => state.call);
  const chatMate = useSelector((state) => state.convers.chatMate);

  const [remoteStream, setRemoteStream] = useState(null);
  const videoRef = useRef(null);
  const remoteRef = useRef(null);

  const {
    getLocalStream,
    initCall,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    addIceCandidate,
    toggleTrack,
    replaceVideoTrack,
    stop,
    localStream,
  } = useWebRTC(conversationId, (stream) => setRemoteStream(stream));

  useEffect(() => {
    if (callStatus === "in-call") {
      initCall().then(() => {
        createOffer();
      }).catch(console.error);

      getLocalStream().then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }).catch(console.error);
    }
  }, [callStatus]);

  useEffect(() => {
    if (remoteStream && remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  if (callStatus !== "in-call" && callStatus !== "incoming") return null;

  const handleToggleMute = () => {
    const newMute = !muted;
    toggleTrack("audio", !newMute);
    dispatch(toggleMute(newMute));
    socket.emit("toggleMute", { conversationId, muted: newMute });
  };

  const handleToggleVideo = () => {
    const newVideo = !videoEnabled;
    toggleTrack("video", newVideo);
    dispatch(toggleVideo(newVideo));
    socket.emit("toggleVideo", { conversationId, videoEnabled: newVideo });
  };

  const handleToggleScreen = async () => {
    if (!localStream.current) {
      console.warn("Local stream not ready.");
      return;
    }

    try {
      if (!screenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        await replaceVideoTrack(screenTrack);

        screenTrack.onended = () => {
          const camTrack = localStream.current.getVideoTracks()[0];
          replaceVideoTrack(camTrack);
        };
      } else {
        const camTrack = localStream.current.getVideoTracks()[0];
        await replaceVideoTrack(camTrack);
      }

      const newShare = !screenSharing;
      dispatch(toggleScreenShare(newShare));
      socket.emit("toggleScreenShare", { conversationId, screenSharing: newShare });
    } catch (err) {
      console.error("❌ Screen sharing failed:", err);
    }
  };

  const handleLeave = () => {
    socket.emit("call:ended", {
      to: chatMate?._id,
      conversationId,
    });
    stop();
    dispatch(endCall());
    dispatch(resetCall());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <UserImage src={chatMate?.photo} alt={chatMate?.userName} />
        <span className={styles.name}>{chatMate?.userName}</span>
        <span className={styles.status}>LIVE</span>
      </div>

      <div className={styles.controls}>
        <button onClick={handleToggleMute} title={muted ? "Unmute" : "Mute"}>
          {muted ? <FiMicOff /> : <FiMic />} {muted ? "Unmute" : "Mute"}
        </button>

        <button onClick={handleToggleVideo} title={videoEnabled ? "Stop Video" : "Start Video"}>
          {videoEnabled ? <FiVideo /> : <FiVideoOff />} Video
        </button>

        <button onClick={handleToggleScreen} title={screenSharing ? "Stop Share" : "Share Screen"}>
          {screenSharing ? <LuScreenShareOff /> : <LuScreenShare />} Share
        </button>

        <button className={styles.leave} onClick={handleLeave}>
          <IoMdCloseCircle /> Leave
        </button>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%", borderRadius: 8, marginTop: 16 }}
      />
      <video
        ref={remoteRef}
        autoPlay
        playsInline
        style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
      />
    </div>
  );
};

export default HuddleSidebar;
