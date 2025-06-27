// import PropTypes from "prop-types";
// import styles from "./Reactions.module.css";
// import { MdOutlineAddReaction } from "react-icons/md";
// import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
// import { useDispatch, useSelector } from "react-redux";
// import React, { useRef } from "react";
// import useGetMessageReactions from "../../../API/hooks/reactions/useGetMessageReactions";
// import { getEmojiPickerPosition } from "../../../utils/modalsUtils";
// import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";
// import { Tooltip } from "react-tooltip";


// function Reactions({ messageId }) {
//   const dispatch = useDispatch();
//   const add_react_ref = useRef(null);
//   const { mutate: toggleThisReact } = useToggleReaction();
//   const { data, isLoading, isError } = useGetMessageReactions(messageId);
//   const reactionsObj = data?.groupedReactions || {};
//   const { workspace } = useSelector((state) => state.workspace);
//   const myId = JSON.parse(localStorage.getItem('currentUser'))._id;


//   function openEmojies() {
//     const rect = add_react_ref.current.getBoundingClientRect();
//     const position = getEmojiPickerPosition(rect);
//     dispatch(
//       openEmojiPicker({
//         position,
//         messageId: messageId,
//       })
//     );
//   }

//   function removeThisReact(emoji) {
//     toggleThisReact({
//       messageId,
//       emoji: emoji,
//     });
//   }

//   if (isLoading || isError) return null;
//   const reactions = Object.entries(reactionsObj);
//   return (
//     <>
//       {reactions.length !== 0 && (
//         <div className={styles.reactions}>
//           {reactions.map(([emoji, { count, UserProfiles }]) => {
//             const memberNames = UserProfiles.map(
//               ({ id }) =>
//                 workspace.members.find((member) => member.user === id)?.userName
//             )
//               .filter(Boolean)
//               .join(" , ");
//             return (
//               <React.Fragment key={emoji}>
//                 <div
//                   data-tooltip-id={`reaction-${emoji}`}
//                   className={`${styles.react} ${
//                     UserProfiles.some((user) => user.id === myId)
//                       ? styles.myReact
//                       : ""
//                   }`}
//                   onClick={() => removeThisReact(emoji)}
//                 >
//                   <div className={styles.react_emoji}>
//                     <img src={emoji} alt="" />
//                   </div>
//                   <div className={styles.react_count}>{count}</div>
//                 </div>

//                 <Tooltip
//                   id={`reaction-${emoji}`}
//                   place="top"
//                   className="custom-tooltip"
//                   content={
//                     <div className={styles.toolTip}>
//                       <div className={styles.react_image}>
//                         <img src={emoji} alt=" " />
//                       </div>
//                       <div className={styles.names}>
//                         {memberNames || "No one yet"}
//                       </div>
//                     </div>
//                   }
//                 />
//               </React.Fragment>
//             );
//           })}

//           <div
//             className={styles.add_react}
//             onClick={openEmojies}
//             ref={add_react_ref}
//           >
//             <MdOutlineAddReaction />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// Reactions.propTypes = {
//   messageId: PropTypes.any.isRequired,
//   reactions: PropTypes.any,
// };

// export default Reactions;


import PropTypes from "prop-types";
import styles from "./Reactions.module.css";
import { MdOutlineAddReaction } from "react-icons/md";
import { openEmojiPicker } from "../../../API/redux_toolkit/modals/emojiPickerSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from "react";
import useGetMessageReactions from "../../../API/hooks/reactions/useGetMessageReactions";
import { getEmojiPickerPosition } from "../../../utils/modalsUtils";
import useToggleReaction from "../../../API/hooks/reactions/useToggleReaction";
import { Tooltip } from "react-tooltip";

function Reactions({ messageId }) {
  const dispatch = useDispatch();
  const add_react_ref = useRef(null);
  const { mutate: toggleThisReact } = useToggleReaction();
  const { data, isLoading, isError } = useGetMessageReactions(messageId);
  const reactionsObj = data?.groupedReactions || {};
  const { workspace } = useSelector((state) => state.workspace);
  const myId = JSON.parse(localStorage.getItem("currentUser"))._id;

  function openEmojies() {
    const rect = add_react_ref.current.getBoundingClientRect();
    const position = getEmojiPickerPosition(rect);
    dispatch(
      openEmojiPicker({
        position,
        messageId,
      })
    );
  }

  function toggleReaction(emoji) {
    toggleThisReact({ messageId, emoji });
  }

  if (isLoading || isError) return null;
  // const reactions = Object.entries(reactionsObj);
  const reactions = Object.entries(reactionsObj).filter(
    ([, value]) => value?.count > 0 && value?.userIds?.length > 0
  );

  return (
    <>
      {reactions.length > 0 && (
        <div className={styles.reactions}>
          {reactions.map(([emoji, { count, userIds }]) => {
            const memberNames = (userIds || [])
              .map((id) => {
                const member = workspace.members.find(
                  (m) => m.user === id || m.user?._id === id
                );
                return member?.userName;
              })
              .filter(Boolean)
              .join(" , ");

            return (
              <React.Fragment key={emoji}>
                <div
                  data-tooltip-id={`reaction-${emoji}`}
                  className={`${styles.react} ${
                    (userIds || []).includes(myId) ? styles.myReact : ""
                  }`}
                  onClick={() => toggleReaction(emoji)}
                >
                  <div className={styles.react_emoji}>
                    <img src={emoji} alt="" />
                  </div>
                  <div className={styles.react_count}>{count}</div>
                </div>

                <Tooltip
                  id={`reaction-${emoji}`}
                  place="top"
                  className="custom-tooltip"
                  content={
                    <div className={styles.toolTip}>
                      <div className={styles.react_image}>
                        <img src={emoji} alt=" " />
                      </div>
                      <div className={styles.names}>
                        {memberNames || "No one yet"}
                      </div>
                    </div>
                  }
                />
              </React.Fragment>
            );
          })}

          <div
            className={styles.add_react}
            onClick={openEmojies}
            ref={add_react_ref}
          >
            <MdOutlineAddReaction />
          </div>
        </div>
      )}
    </>
  );
}

Reactions.propTypes = {
  messageId: PropTypes.any.isRequired,
};

export default Reactions;
