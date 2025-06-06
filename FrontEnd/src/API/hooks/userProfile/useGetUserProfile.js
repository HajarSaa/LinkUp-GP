import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/userProfileService";

function useGetUserProfile(profile_id) {
  const query = useQuery({
    queryKey: ["userProfile", { profile_id }],
    queryFn: () => getUserProfile(profile_id),
    enabled: !!profile_id,
    retry: 1,
  });
  return query;
}

export default useGetUserProfile;
