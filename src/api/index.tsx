import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

const API = axios.create({ baseURL: SERVER });

const url = `${SERVER}posts`;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    // @ts-ignore
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "").token
    }`;
  }
  return req;
});

export const fetchPost = (id: number) => API.get(`/posts/${id}`);

export const fetchPosts = (page: number) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery: any) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    } `
  );

export const createPost = (newPost: any) => API.post("/posts", newPost);

export const updatePost = (id: number, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id: number) => API.delete(`/posts/${id}`);

export const likePost = (id: number) => API.patch(`/posts/${id}/likePost`);

export const comment = (value: any, id: number) =>
  API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (values: { email: string; password: string }) =>
  API.post("/users/signin", values);

export const signUp = (values: { email: string; password: string }) =>
  API.post("/users/signup", values);
