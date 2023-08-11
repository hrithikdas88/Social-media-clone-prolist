import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../store/authSlice";
import { shuffleArray } from "utilities/utilities";

const useUserList = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const friends = useSelector((state) => state.user.friends);
  const loggedInUserId = useSelector((state) => state.user?._id);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const filteredUsers = users.filter(
      (user) =>
        user?._id !== loggedInUserId &&
        !friends.some((friend) => friend._id === user?._id)
    );

    const shuffledUsers = shuffleArray(filteredUsers);
    const firstFiveUsers = shuffledUsers.slice(0, 5);

    setDisplayedUsers(firstFiveUsers);
  }, [users, friends, loggedInUserId]);

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      const filteredUsers = data.filter(
        (user) =>
          user?._id !== loggedInUserId &&
          !friends.some((friend) => friend._id === user?._id)
      );

      dispatch(setUsers({ users: filteredUsers }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    displayedUsers,
  };
};

export default useUserList;
