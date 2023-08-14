import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "components/LoadingAnimation/LoadingAnimation";

const useProfileData = () => {
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const handleNavigate = async () => {
    setIsLoggingOut(true); // Start the animation

    // Simulate an animation delay (you can adjust the duration as needed)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Perform the actual navigation
    navigate("/home");

    setIsLoggingOut(false); // End the animation
  };


  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { user, handleNavigate, userId , isLoggingOut };
};

export default useProfileData;
