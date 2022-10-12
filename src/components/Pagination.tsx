import { Pagination, PaginationItem } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";
import { useAppDispatch, useAppSelector } from "../hooks";
const Paginate = ({ page }: { page: number }) => {
  const data = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  type Person2 = {
    [key: string]: any; // 👈️ variable keys
    name: string;
  };

  return (
    <Pagination
      // @ts-ignore
      count={data.numberOfPages}
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
