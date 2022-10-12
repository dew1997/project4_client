import { useAppDispatch, useAppSelector } from "../../../hooks";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPost, getPostsBySearch } from "../../../actions/posts";
import CommentSection from "./CommentSection";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
const PostDetails = () => {
  // @ts-ignore
  const { post, posts, isLoading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // @ts-ignore
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return <p> Loading</p>;
  }

  const recommendedPosts = posts.filter(
    ({ id }: { id: number }) => id !== post._id
  );

  const openPost = (id: number) => navigate(`/posts/${id}`);
  return (
    <div className="mt-6 bg-gray-50">
      <div className=" px-10 py-6 mx-auto">
        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
          <img
            className="object-cover w-100 shadow-sm h-100"
            src={post.selectedFile}
          />
          <div className="flex items-center justify-start mt-4 mb-4">
            <p className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg hover:bg-gray-500 mr-4">
              {post.tags.map((tag: []) => `#${tag} `)}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <p> Title: {post?.title}</p>
        </div>
        <div className="font-light text-gray-600">
          <h1 className="font-bold text-gray-700 hover:underline">
            Created by: {post?.name} {moment(post?.createdAt).fromNow()}
          </h1>
        </div>
        <div className="max-w-4xl px-10  mx-auto text-2xl text-gray-700 mt-4 rounded bg-gray-100">
          <div>
            <p className="mt-2 p-8">{post?.message}</p>
          </div>
        </div>
      </div>

      <div>
        {recommendedPosts.length && (
          <div>
            <h2 className="text-2xl mt-4 text-gray-500 font-bold text-center">
              You might also like:
            </h2>

            {recommendedPosts.map((post: any, index: number) => (
              <div
                key={index}
                className="grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16"
              >
                <div className="grid grid-cols-12 col-span-12 gap-7">
                  <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <p
                      // @ts-ignore
                      onClick={() => openPost(id)}
                      className="block transition duration-200 ease-out transform hover:scale-110"
                    >
                      {post.selectedFile.length < 1 ? (
                        <img
                          className="object-cover w-full shadow-sm h-full"
                          src={
                            "https://www.firstcolonyfoundation.org/wp-content/uploads/2022/01/no-photo-available.jpeg"
                          }
                        />
                      ) : (
                        <img
                          className="object-cover w-full shadow-sm h-full"
                          src={post.selectedFile}
                          alt="img"
                        />
                      )}
                    </p>
                    <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                      <div className="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                        <span>{post.tags}</span>
                      </div>
                      <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                        {post.title}
                      </h2>
                      <h5>Posted By: {post.name}</h5>
                      <p> {post.message}</p>
                      <span>
                        Likes: {post.likes.length} &nbsp;{" "}
                        <BsFillHandThumbsUpFill />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <CommentSection post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
