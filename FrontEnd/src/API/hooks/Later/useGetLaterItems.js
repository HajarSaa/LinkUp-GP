import { useQuery } from "@tanstack/react-query";
import { getGetLaterItems } from "../../services/laterService";

const useGetLaterItems = () => {

  const query = useQuery({
    queryKey: ["later_items"],
    queryFn: () => getGetLaterItems(),
    retry: 1,
    refetchInterval: 400,
  });


  return query;
};
export default useGetLaterItems;
