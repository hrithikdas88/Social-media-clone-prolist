import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../store/authSlice";

const useFriendList = ({ userId }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state?.user?.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return friends;
};

export default useFriendList;
