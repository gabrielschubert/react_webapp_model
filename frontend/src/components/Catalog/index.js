import React, { useLayoutEffect, useState, useEffect } from "react";
import { Skeleton, Empty, Button, Table, Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { axiosClient } from "../../apiClient";

import Search from "../Search";

import styles from "./catalog.module.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function Catalog() {
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const itemsList = useSelector((state) => state.itemsList);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axiosClient
  //     .get("/items/list", { withCredentials: true })
  //     .then((response) => {
  //       console.log(response.data)
  //       setData(response.data);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
  }, []);

  useEffect(() => {
    console.log(itemsList.list)
    setData(itemsList.list);
    setLoading(false);
  }, [[itemsList.list]]);


  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      render: (text) => <>{text}</>,
      responsive: ["sm"],
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <> {text} </>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <>{text}</>,
      responsive: ["lg"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => <>{text}</>,
      responsive: ["sm"],
    },
    {
      title: "User Access?",
      dataIndex: "user_access",
      render: (text) =>
        <>
          {
            (text == true ?
              <Tag color={"green"} key={"yes"}>
                {`YES`}
              </Tag> :
              <Tag color={"red"} key={"no"}>
                {`NO`}
              </Tag>
            )
          }
        </>,
      responsive: ["sm"],
    },
  ];

  return (
    <>
      <Search />
      <Table
        columns={columns}
        dataSource={loading ? [] : data}
        rowKey="id"
        locale={{
          emptyText: loading ? <Skeleton active={true} /> : <Empty />,
        }}
        style={{ cursor: !loading ? "pointer" : "auto" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => { },
          };
        }}
      />
    </>
  );
};