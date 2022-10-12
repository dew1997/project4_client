import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination";
import { Paper, AppBar, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useAppDispatch } from "../../hooks";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  let page: number | number = Number(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  if (page === null) {
    page = 1;
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleChange = (tag: string[]) => {
    setTags(tag);
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <Posts setCurrentId={setCurrentId} />
      </div>
      <div>
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
      <AppBar position="static" color="inherit">
        <TextField
          name="search"
          variant="outlined"
          label="Search"
          fullWidth
          onKeyPress={handleKeyPress}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MuiChipsInput value={tags} onChange={handleChange} />
        <button onClick={searchPost}>Search</button>
      </AppBar>
      <div>
        {!searchQuery && !tags.length && (
          <Paper>
            <Paginate page={page} />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default Home;
