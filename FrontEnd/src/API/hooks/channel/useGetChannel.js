import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getChannelData } from "../../services/channelService";
import { setChannel } from "../../redux_toolkit/api_data/channelSlice";


const useGetChannel = (channel_id) => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["channel", { channel_id }],
    queryFn: () => getChannelData(channel_id),
    enabled: !!channel_id,
    retry:1
  });

  useEffect(() => {
    if (query.data?.channel) {
      dispatch(setChannel(query.data.channel));
    }
  }, [query.data, dispatch]);

  return query;
};

// const useGetChannel = (channel_id) => {
//   const dispatch = useDispatch();

//   const query = useQuery({
//     queryKey: ["channel", { channel_id }],
//     queryFn: async () => {
//       try {
//         return await getChannelData(channel_id);
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.warn("❌ Channel not found (404):", channel_id);
//         }
//         throw error;
//       }
//     },
//     enabled: !!channel_id,
//     retry: 1,
//     onError: (error) => {
//       console.error("Error fetching channel:", error?.message || error);
//     }
//   });

//   useEffect(() => {
//     if (query.data?.channel) {
//       dispatch(setChannel(query.data.channel));
//     }
//   }, [query.data, dispatch]);

//   return query;
// };


export default useGetChannel;
