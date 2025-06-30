import { useSelector } from "react-redux";
import styles from "./LaterSideBar.module.css";
import PropTypes from "prop-types";
import { findMemberById } from "../../../../utils/workspaceUtils";
import UserImage from "../../../UI/User/UserImage";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";
import ChannelType from "../../../UI/Channel/ChannelType/ChannelType";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import useToggleLaterItem from "../../../../API/hooks/Later/useToggleLaterItem";
import { LuClock3 } from "react-icons/lu";
import { MdDone } from "react-icons/md";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const LaterItem = ({ laterData }) => {
  const { workspace } = useSelector((state) => state.workspace);
  const member = findMemberById(workspace, laterData.userProfile);
  const conversations = useGetSidebarConvers(workspace);
  const navigate = useNavigate();
  const { mutate: toggleLater } = useToggleLaterItem();

  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());

  let source = null;
  if (laterData?.message?.channelId)
    source = workspace.channels.find(
      (channel) => channel.id === laterData?.message?.channelId
    );
  else if (laterData?.message?.conversationId)
    source = conversations.find(
      (convers) => convers.conversationId === laterData?.message?.conversationId
    );

  const source_name = laterData?.message?.channelId ? (
    <div>
      <ChannelType type={source.type} />
      <span>{source.name}</span>
    </div>
  ) : source?.isMe ? (
    "Your chat"
  ) : (
    source?.member?.userName + " chat"
  );

  function handleNavigate() {
    if (laterData?.message?.channelId)
      navigate(
        `later/channels/${laterData?.message?.channelId}?later_message=${laterData?.message._id}`
      );
    else if (laterData?.message?.conversationId)
      navigate(
        `later/conversations/${laterData?.message?.conversationId}?later_message=${laterData?.message._id}`
      );
  }

  function handleRemoveLater() {
    toggleLater(laterData?.message._id);
  }

  function handleSetReminder() {
    setReminderOpen(true);
  }

  function handleComplete() {
    console.log("complete");
  }

  function handleReset() {
    setReminderDate(new Date());
  }

  function handleSaveReminder() {
    const iso = reminderDate.toISOString();
    console.log("Reminder At:", iso);
    setReminderOpen(false);
  }

  return (
    <>
      <div className={styles.item} onClick={handleNavigate}>
        <div className={styles.tags}>
          {laterData.tag && <div className={styles.tag}>{laterData.tag}</div>}
          <div className={styles.message_source}>in {source_name}</div>
        </div>
        <div className={styles.item_header}>
          <div className={styles.avatar}>
            <UserImage src={member?.photo} />
          </div>
          <div className={styles.item_texts}>
            <span className={styles.username}>{member?.userName}</span>
            <span className={styles.message}>
              {laterData?.message?.content}
            </span>
          </div>
        </div>

        <div
          className={styles.item_actions}
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className={styles.action_icon}
            data-tooltip-id={"complete_later"}
            data-tooltip-content={"Mark as Complete"}
            onClick={handleComplete}
          >
            <MdDone />
          </span>
          <Tooltip
            id={"complete_later"}
            place={"top"}
            className={`custom-tooltip`}
          />

          <span
            className={styles.action_icon}
            data-tooltip-id={"remind_later"}
            data-tooltip-content={"Set reminder"}
            onClick={handleSetReminder}
          >
            <LuClock3 />
          </span>
          <Tooltip
            id={"remind_later"}
            place={"top"}
            className={`custom-tooltip`}
          />

          <span
            className={`${styles.action_icon} ${styles.remove}`}
            data-tooltip-id={"delete_later"}
            data-tooltip-content={"Remove"}
            onClick={handleRemoveLater}
          >
            <FiTrash2 />
          </span>
          <Tooltip
            id={"delete_later"}
            place={"top"}
            className={`custom-tooltip`}
          />
        </div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog
          open={reminderOpen}
          onClose={() => setReminderOpen(false)}
          fullWidth
          maxWidth="xs"
          scroll="paper"
          PaperProps={{
            style: {
              maxHeight: "90vh",
              overflow: "auto",
              borderRadius: "12px",
            },
          }}
          slotProps={{
            backdrop: {
              sx: {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
          <DialogTitle sx={{ paddingTop: "20px" }}>Set Reminder</DialogTitle>
          <DialogContent sx={{ paddingTop: 1 }}>
            <DateTimePicker
              value={reminderDate}
              onChange={(newValue) => setReminderDate(newValue)}
              slotProps={{
                popper: {
                  sx: {
                    "&.MuiPopper-root": {
                      position: "absolute !important",
                      top: "50% !important",
                      left: "50% !important",
                      transform: "translate(-50%, -50%) !important",
                      zIndex: 1500,
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ paddingX: 3, paddingBottom: 2 }}>
            <Button onClick={() => setReminderOpen(false)}>Cancel</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleSaveReminder} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
};

LaterItem.propTypes = {
  laterData: PropTypes.any.isRequired,
};

export default LaterItem;
