import Post from "./Post/Post";
import { useSelector } from "react-redux";
const Posts = () => {
  const posts = useSelector((state: any) => state.posts);

  return !posts.length ? (
    <p> Loading..</p>
  ) : (
    <div>
      {posts.map((post: any) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
