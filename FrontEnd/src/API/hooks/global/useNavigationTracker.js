import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pushToHistory } from "../../redux_toolkit/ui/historySlice";

const useNavigationTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentIndex, history } = useSelector(
    (state) => state.navigationHistory
  );

  useEffect(() => {
    // لو الـ history فاضي أو آخر عنصر مش نفس الـ path الحالي → ضيفه
    if (history.length === 0 || history[currentIndex] !== location.pathname) {
      dispatch(pushToHistory(location.pathname));
    }
  }, [location.pathname]);
};

export default useNavigationTracker;
