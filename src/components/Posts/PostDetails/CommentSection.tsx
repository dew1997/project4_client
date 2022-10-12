import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { commentPost } from "../../../actions/posts";
import { useAppDispatch } from "../../../hooks";
const CommentSection = ({ post }) => {
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();
  const handleClick = async () => {
    const finalComment = `${user.result.name}:${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {user?.result?.name && (
        <div className="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
          <div className="w-full mt-16 md:mt-0 ">
            <form className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
              <h3 className="mb-6 text-2xl font-medium text-center">
                Write a comment
              </h3>
              <textarea
                name="comment"
                className="w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                placeholder="Write your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                className=" text-white px-4 py-3 bg-blue-500  rounded-lg"
                disabled={!comment}
                onClick={handleClick}
              >
                Comment
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <div className="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay  px-0 px-8 mx-auto sm:px-12 xl:px-5">
          <p className="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
            All comments on this post
          </p>
          <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
            {comments.map((c, index) => (
              <div key={index}>
                <p>
                  {c.split(":")[0]} {c.split(":")[1]}
                </p>
              </div>
            ))}
          </div>

          <div ref={commentsRef} />
        </div>
      </div>
    </>
  );
};

export default CommentSection;
