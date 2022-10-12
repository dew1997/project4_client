import { Pagination, PaginationItem } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";
import { useAppDispatch, useAppSelector } from "../hooks";
const Paginate = ({ page }) => {
  const data = useAppSelector((state) => state.posts);
  console.log(data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      count={2}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
