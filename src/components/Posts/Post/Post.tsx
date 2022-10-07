import moment from "moment";

const Post = ({ post }: { post: any }) => {
  return (
    <>
      <div>
        <p> {post.creator}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      <div>
        <button onClick={() => {}}>Edit</button>
      </div>
      <div>
        <p>{post.tags.map((tag: any) => tag)}</p>
      </div>
      <div>
        <p> {post.message}</p>
      </div>
      <div>
        <button>Like {post.likeCount}</button>
        <button>Delete </button>
      </div>
    </>
  );
};

export default Post;
