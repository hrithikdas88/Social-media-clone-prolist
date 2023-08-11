import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../store/authSlice";

const useFriendInteractionLogic = ({ friendId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  const isSelf = loggedInUserId === friendId; // Check if the friendId matches the logged-in user's _id

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${loggedInUserId}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const handleClick = () => {
    navigate(`/profile/${friendId}`);
    navigate(0);
  };

  return {
    isFriend,
    isSelf,
    patchFriend,
    handleClick,
  };
};

export default useFriendInteractionLogic;
