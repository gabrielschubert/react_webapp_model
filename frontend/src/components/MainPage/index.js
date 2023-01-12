import React, { useLayoutEffect, useState, useEffect } from "react";
import { axiosClient } from "../../apiClient";

import styles from "./mainpage.module.css";
import Catalog from "../Catalog"

import { NotificationOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Button, Layout, theme } from 'antd';


const { Header, Content, Footer } = Layout;
const { Title } = Typography;

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

export default function MainPage() {
  const [width, height] = useWindowSize();

  const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2 = [
    {
      key: `Teste`,
      icon: React.createElement(UserOutlined),
      label: `Teste`,
    },
    {
      key: `Teste 2`,
      icon: React.createElement(NotificationOutlined),
      label: `Teste 2`,
      children: [{
        key: `Teste 2 - Child`,
        label: `Teste 2 - Child`,
      }]
    }
  ]

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        // className={styles["site-layout-sub-header-background"]}
        style={{
          backgroundColor: "white",
        }}
      >
        {/* <a href={"/"}>
            <img
              src={logo}
              alt=""
              className={styles["img-logo"]}
            ></img>
          </a> */}
        <Row>
          <Col span={12}>
            <Title style={{
              float: "left",
              marginTop: "13px",
              marginBottom: "13px",
              marginLeft: "13px",
              marginRight: "0",
            }}
              level={4}>
              Items Catalog
            </Title>
          </Col>
          <Col span={4} offset={8}>
            <Button
              style={{
                float: "right",
                marginTop: "13px",
                marginBottom: "13px",
                marginLeft: "0",
                marginRight: "13px",
              }}
              key="logout"
              icon={<LogoutOutlined />}
              onClick={() => {
                axiosClient
                  .get("/auth/logout", { withCredentials: true })
                  .then((response) => {
                    if (response.data.logout) {
                      window.location.href = "/";
                    }
                  });
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            margin: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >

            <Catalog />

          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Items Catalog ©2023 Created by Mogno Beamline
      </Footer>
    </Layout>
  );
};
