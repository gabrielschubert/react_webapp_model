import React, { useEffect, useCallback } from "react";
import { SearchOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import styles from "./search.module.css";
import { Input } from "antd";
import { axiosClient } from "../../apiClient";
import { debounce } from "lodash";

export default function Search() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const perPage = useSelector((state) => state.pagination.perPage);
  const pageUpdated = useSelector((state) => state.pagination.pageUpdated);
  const searchTermValue = useSelector((state) => state.searchState.searchTerm);

  const updateSearch = async (
    page,
    perPage,
    searchTerm,
    resetPage,
  ) => {
    try {
      dispatch({ type: "SET_LOADING", loading: true });
      var postData = {
        search: searchTerm,
        page: resetPage ? 1 : page,
        perPage: perPage,
      };
      const results = await axiosClient.post("/items/search", postData, {
        withCredentials: true,
      });
      console.log(results)

      dispatch({ type: "SET_LIST", list: results.data });
      dispatch({ type: "SET_LOADING", loading: false });
      window.scrollTo(0, 0);
    } catch (error) {}
  };

  const updateSearchHandler = useCallback(debounce(updateSearch, 500), []);

  const handleSearchChange = async (e) => {
    dispatch({ type: "SEARCH_TERM", searchTerm: e.target.value });
  };

  useEffect(() => {
    updateSearchHandler(
      page,
      perPage,
      searchTermValue,
      true,
    );
  }, [searchTermValue,  perPage]);

  useEffect(() => {
    !pageUpdated &&
      updateSearchHandler(page, perPage, searchTermValue, false);
  }, [page]);

  return (
    <div className={styles["search-container"]}>
      <Input
        defaultValue={searchTermValue}
        allowClear
        type="text"
        prefix={<SearchOutlined />}
        placeholder="Name, code or description..."
        onChange={handleSearchChange}
        onFocus={(e) => dispatch({ type: "SET_SEARCH_FOCUS", onFocus: true })}
        onBlur={(e) => dispatch({ type: "SET_SEARCH_FOCUS", onFocus: false })}
      />
    </div>
  );
}
