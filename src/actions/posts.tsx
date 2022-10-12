import {
  COMMENT,
  FETCH_POST,
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api";

//Action creators

export const getPost = (id: number) => async (dispatch: any) => {
  try {
    // dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    // dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page: number) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost =
  (post: {}, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);

      navigate(`/posts/${data._id}`);
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const updatePost = (id: number, post: any) => async (dispatch: any) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id: number) => async (dispatch: any) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost =
  (value: any, id: number) => async (dispatch: any) => {
    try {
      const { data } = await api.comment(value, id);
      console.log(data);
      dispatch({ type: COMMENT, payload: data });
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };
