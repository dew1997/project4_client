import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./actions/posts";
function App() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Posts />
      </div>
      <div>
        <Form />
      </div>
      hello
    </div>
  );
}

export default App;
