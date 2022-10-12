import Post from "./Post/Post";
import { useAppSelector } from "../../hooks";
import { Puff } from "react-loading-icons";

const Posts = ({ setCurrentId }: { setCurrentId: any }) => {
  const { posts, isLoading } = useAppSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return (
      <div>
        <p>no posts found!</p>
      </div>
    );

  if (isLoading) {
    return (
      <div className="object-cover w-full shadow-sm h-full">
        <Puff stroke="#98ff98" strokeOpacity={0.125} />
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
