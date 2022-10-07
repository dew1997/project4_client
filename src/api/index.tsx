import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

const url = `${SERVER}posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: any) => axios.post(url, newPost);
