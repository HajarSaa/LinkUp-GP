import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/userProfileService";
import { useEffect } from "react";
import { setUserProfile } from "../../redux_toolkit/api_data/userProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { findMemberByUserId } from "../../../utils/workspaceUtils";

function useGetUserProfile(profile_id) {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);
  const query = useQuery({
    queryKey: ["userProfile", { profile_id }],
    queryFn: () => getUserProfile(profile_id),
    enabled: !!profile_id,
    retry: 1,
  });

  useEffect(() => {
    if (query?.data?.userProfile) {
      const userProfile = query?.data?.userProfile;
      const me = findMemberByUserId(workspace);
      if (userProfile._id === me._id)
        dispatch(setUserProfile({ ...userProfile, isMe: true }));
      else dispatch(setUserProfile({ ...userProfile, isMe: false }));
    }
  }, [query.data, dispatch, workspace]);
  return query;
}

export default useGetUserProfile;
