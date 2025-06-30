import { useMutation } from "@tanstack/react-query";
import { addMember } from "../../services/channelService";


export const useAddMember = () => {
  return useMutation({
    mutationFn: ({ channel_id, email }) => addMember(channel_id, email),
  });
};
