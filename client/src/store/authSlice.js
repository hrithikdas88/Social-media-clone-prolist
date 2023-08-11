import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  users: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // state.user = null;
      
      state.token = null;
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    setPosts: (state, action) => {
      console.log(action.payload+"jhghfjhflhgfhlf");
      state.posts = action.payload.posts;
    },
    setUserPosts: (state, action) => {
      console.log(action.payload+"jhghfjhflhgfhlf");
       state.posts = [...action.payload];
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setDeletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setUsers: (state, action) => {
      state.users = action.payload.users;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setDeletePost,
  setUsers,
  setUserPosts
} = authSlice.actions;
export default authSlice.reducer;
