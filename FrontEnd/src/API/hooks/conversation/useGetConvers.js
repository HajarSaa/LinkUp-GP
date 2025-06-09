import { useDispatch, useSelector } from "react-redux";
import { setChatMat, setConvers } from "../../redux_toolkit/api_data/conversSlice";
import { getConversData } from "../../services/coversService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { chatMate } from "../../../utils/conversUtils";

const useGetConvers = (convers_id) => {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);
  const { currentUser } = useSelector((state) => state.currentUser);

  const query = useQuery({
    queryKey: ["convers", { convers_id }],
    queryFn: () => getConversData(convers_id),
    enabled: !!convers_id,
    retry: 1,
  });

  useEffect(() => {
    if (query.data?.conversation) {
      dispatch(setConvers(query.data?.conversation));
      const mate = chatMate(
        query.data?.conversation,
        workspace.members,
        currentUser
      );
          dispatch(setChatMat(mate));
    }
  }, [query.data, dispatch, workspace.members, currentUser]);
  
  return query;
};

export default useGetConvers;
