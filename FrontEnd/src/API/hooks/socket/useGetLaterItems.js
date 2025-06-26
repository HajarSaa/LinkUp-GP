import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../sockets/socketService";
import {
  setLaterItems,
  setLoading,
  setError,
} from "../../redux_toolkit/api_data/messages/laterItemsSlice";

export const useGetLaterItems = (statusFilter = null) => {
  const dispatch = useDispatch();

  const { loading = false, laterItems = [], error = null } = useSelector(
    (state) => state.laterItems || {}
  );

//   useEffect(() => {
//     if (!socket) return;

//     // Start loading
//     dispatch(setLoading(true));
//     dispatch(setError(null));

//     // Emit event to get later items with optional status filter
//     socket.emit(
//       "getLaterItems",
//       statusFilter ? { status: statusFilter } : {},
//       (response) => {
//         if (response?.success) {
//           // Save items to slice
//           dispatch(setLaterItems(response.items));
//           dispatch(setLoading(false));
//         } else {
//           // Handle error response
//           dispatch(setError("Failed to load later items"));
//           dispatch(setLoading(false));
//         }
//       }
//     );
//   }, [dispatch, statusFilter]);
useEffect(() => {
  console.log("📡 Sending getLaterItems event...");
  if (!socket) return;

  dispatch(setLoading(true));
  dispatch(setError(null));

  socket.emit(
    "getLaterItems",
    statusFilter ? { status: statusFilter } : {},
    (response) => {
      console.log("📬 getLaterItems response:", response);
      if (response?.success) {
        // Map the incoming items into shape expected by the slice
        const formattedItems = response.items.map((item) => ({
          messageId: item.messageId,
          message: item.message,
          status: item.status,
          reminderAt: item.reminderAt || null,
          reminderStatus: item.reminderStatus || null,
          reminderDelta: item.reminderDelta || null,
          savedAt: item.savedAt || null,
        }));

        dispatch(setLaterItems(formattedItems));
        dispatch(setLoading(false));
      } else {
        dispatch(setError("Failed to load later items"));
        dispatch(setLoading(false));
      }
    }
  );
}, [dispatch, statusFilter]);


  return { laterItems, loading, error };
};
    