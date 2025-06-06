import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/userProfileService";
import { useEffect } from "react";
import { setUserProfile } from "../../redux_toolkit/api_data/userProfileSlice";
import { useDispatch } from "react-redux";

function useGetUserProfile(profile_id) {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["userProfile", { profile_id }],
    queryFn: () => getUserProfile(profile_id),
    enabled: !!profile_id,
    retry: 1,
  });

  useEffect(() => {
    if (query?.data?.userProfile) {
      dispatch(setUserProfile(query?.data?.userProfile));
    }
  }, [query.data, dispatch]);
  return query;
}

export default useGetUserProfile;
