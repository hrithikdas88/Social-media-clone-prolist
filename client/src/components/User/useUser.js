import { useNavigate } from "react-router-dom";

const useUser = ({ userId }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${userId}`);
    navigate(0);
  };

  return {
    handleUserClick
  };
};

export default useUser;