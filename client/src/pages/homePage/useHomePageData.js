// useHomePageData.js
import { useSelector } from "react-redux";

const useHomePageData = () => {
  const user = useSelector((state) => state.user);

  return { user };
};

export default useHomePageData;
