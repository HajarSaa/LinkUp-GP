// // src/API/hooks/notifications/useGetNotifications.js
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   setAllNotifications,
//   setMentionNotifications,
//   setThreadNotifications,
//   setReactionNotifications,
//   setNotificationsLoading,
//   setNotificationsError,
// } from "../../../API/redux_toolkit/api_data/notificationSlice";
// import { fetchNotifications } from "../../services/notificationService";

// export const useGetNotifications = (type = "") => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     let isMounted = true;

//     const fetchData = async () => {
//       dispatch(setNotificationsLoading(true));
//       try {
//         const data = await fetchNotifications(type);
//         if (!isMounted) return;

//         if (type === "mention") dispatch(setMentionNotifications(data));
//         else if (type === "reply") dispatch(setThreadNotifications(data));
//         else if (type === "reaction") dispatch(setReactionNotifications(data));
//         else dispatch(setAllNotifications(data));
//       } catch (err) {
//         dispatch(setNotificationsError(err.message || "Failed to fetch notifications"));
//       } finally {
//         dispatch(setNotificationsLoading(false));
//       }
//     };

//     fetchData();
//     return () => {
//       isMounted = false;
//     };
//   }, [type, dispatch]);
// };


// src/API/hooks/notifications/useGetNotifications.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAllNotifications,
  setMentionNotifications,
  setThreadNotifications,
  setReactionNotifications,
  setNotificationsLoading,
  setNotificationsError,
} from "../../../API/redux_toolkit/api_data/notificationSlice";
import { fetchNotifications } from "../../services/notificationService";

export const useGetNotifications = (type = "") => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      dispatch(setNotificationsLoading(true));
      try {
        const backendType = type === "thread" ? "reply" : type;
        const data = await fetchNotifications(backendType);
        if (!isMounted) return;

        if (type === "mention") dispatch(setMentionNotifications(data));
        else if (type === "thread") dispatch(setThreadNotifications(data));
        else if (type === "reaction") dispatch(setReactionNotifications(data));
        else dispatch(setAllNotifications(data));
      } catch (err) {
        dispatch(setNotificationsError(err.message || "Failed to fetch notifications"));
      } finally {
        dispatch(setNotificationsLoading(false));
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [type, dispatch]);
};
