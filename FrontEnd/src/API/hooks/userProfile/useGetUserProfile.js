import { useEffect } from "react";
import { setUserProfile } from "../../redux_toolkit/api_data/userProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  findMemberById,
  findMemberByUserId,
} from "../../../utils/workspaceUtils";

function useGetUserProfile(profile_id) {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);

  useEffect(() => {
    if (!profile_id || !workspace) return;

    const userData = findMemberById(workspace, profile_id);
    const me = findMemberByUserId(workspace);

    if (!userData || !me) return;

    const isMe = userData._id === me._id;

    dispatch(setUserProfile({ ...userData, isMe }));
  }, [workspace, profile_id, dispatch]);
}

export default useGetUserProfile;


// import { useEffect } from "react";
// import { setUserProfile } from "../../redux_toolkit/api_data/userProfileSlice";
// import { useDispatch, useSelector } from "react-redux";
// import socket from "../../sockets/socketService";

// function useGetUserProfile(profile_id) {
//   const dispatch = useDispatch();
//   const { workspace } = useSelector((state) => state.workspace);

//   useEffect(() => {
//     if (!profile_id || !socket.connected) return;

//     socket.emit("userProfile:get", { profileId: profile_id }, (response) => {
//       if (!response?.success || !response.profile) return;

//       const currentProfile = response.profile;
//       const me = workspace?.members?.find((m) => m.user === socket.userId);
//       const isMe = me?._id === profile_id;

//       dispatch(setUserProfile({ ...currentProfile, isMe }));
//     });
//   }, [workspace, profile_id, dispatch]);
// }

// export default useGetUserProfile;
