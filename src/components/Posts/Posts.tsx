import Post from "./Post/Post";
import { useAppSelector } from "../../hooks";

const Posts = ({ setCurrentId }: { setCurrentId: any }) => {
  const { posts, isLoading } = useAppSelector((state) => state.posts);

  if (!posts.length && !isLoading) return <p>No posts</p>;

  if (isLoading) {
    return (
      <div>
        <p> Loading..</p>
      </div>
    );
  } else {
    return (
      <div>
        {posts.map((post: any) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    );
  }
};

export default Posts;
