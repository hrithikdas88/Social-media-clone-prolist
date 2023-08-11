import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const useNavbarLogic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const [showNavbar, setShowNavbar] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogout = () => {
    dispatch(setLogout({ token: null }));
    setShowNavbar(false);
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleNavigate = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/home");
      setIsNavigating(false);
    }, 500);
  };

  return {
    fullName,
    showNavbar,
    isNavigating,
    handleLogout,
    handleNavigate,
  };
};

export default useNavbarLogic;
