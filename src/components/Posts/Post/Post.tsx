import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";
import { FiThumbsUp } from "react-icons/fi";
import { BsTrash, BsFillPencilFill, BsFillTagsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";

const Post = ({ post, setCurrentId }: { post: any; setCurrentId: any }) => {
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const userId = user?.result?._id;
  const hasLikedPost = post.likes.find((like: string) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id: number) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like: string) => like === user?.result?._id) ? (
        <>
          <FiThumbsUp fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FiThumbsUp fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <FiThumbsUp fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center md:text-left">
        <div className="flex flex-wrap mb-6">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
            <button
              onClick={openPost}
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              read more
            </button>
            <div
              className="relative overflow-hidden bg-no-repeat bg-cover  ripple shadow-lg rounded-lg mb-6"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {post.selectedFile.length < 1 ? (
                <img
                  className="w-full"
                  src={
                    "https://www.firstcolonyfoundation.org/wp-content/uploads/2022/01/no-photo-available.jpeg"
                  }
                />
              ) : (
                <img className="w-full" src={post.selectedFile} alt="img" />
              )}

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"></div>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
            <h5 className="text-lg font-bold mb-3">{post.title}</h5>
            <div className="mb-3 text-red-600 font-medium text-sm flex items-center justify-center md:justify-start">
              <BsFillTagsFill />
              {post.tags.map((tag: []) => `#${tag} `)}
            </div>
            <p className="text-gray-500 mb-6">
              <small>
                Published <u>{moment(post.createdAt).fromNow()}</u> by
                <a href="" className="text-gray-900">
                  {post.name}
                </a>
              </small>
            </p>
            <p className="text-gray-500">{post.message}</p>
            <button
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-black bg-white-700 rounded-lg hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
              disabled={!user?.result}
              onClick={handleLike}
            >
              <Likes />
            </button>
            {user?.result?._id === post?.creator && (
              <button
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <BsTrash />
                &nbsp; Delete
              </button>
            )}
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id);
                  }}
                >
                  <BsFillPencilFill />
                  &nbsp;Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Post;
