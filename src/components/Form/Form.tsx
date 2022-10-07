import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";
import { AppDispatch } from "../../main";
const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const useAppDispatch: () => AppDispatch = useDispatch;
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // dispatch(createPost(postData));

    console.log("submit");
  };

  const clear = () => {
    console.log("clear");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Creator"
          name="creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        ></input>
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
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
