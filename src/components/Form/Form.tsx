import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Form = ({
  currentId,
  setCurrentId,
}: {
  currentId: number;
  setCurrentId: any;
}) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });

  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  const post = useAppSelector((state) =>
    currentId
      ? state.posts.posts.find((message: any) => message._id === currentId)
      : null
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));

      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
      navigate(`/`);
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [""],
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div>
        <p>Please Sign In to create your own post and like others post</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p> {currentId ? "Edit" : "Create"} post </p>

        <input
          placeholder="Title"
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></input>
        <input
          placeholder="Message"
          name="message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></input>
        <input
          placeholder="Tags"
          name="tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        ></input>
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: { base64: any }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button>Submit</button>
        <button onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default Form;
