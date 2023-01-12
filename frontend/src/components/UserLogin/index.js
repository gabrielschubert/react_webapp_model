import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import login from "../../actions/login";
import styles from "./login.module.css";
import { useSelector } from "react-redux";
import logo from "../../mgn-logo.png"
// import { axiosClient } from "../../apiClient";

export default function UserLogin(props) {
  // const { Text, Link } = Typography;
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const authentication = useSelector((state) => state.authentication);
  const [loginData, setLoginData] = useState({
    username: false,
    password: false,
    submitted: false,
  });

  function onFinish(values) {
    setSending(true);
    setLoginData({
      ...loginData,
      submitted: true,
      username: values.username,
      password: values.password,
    });
  }

  useEffect(() => {
    if (loginData.username && loginData.password) {
      login(
        loginData.password,
        loginData.username
      );
    }
  }, [loginData]);

  useEffect(() => {
    if (authentication.wrongPass) {
      setSending(false);
      form.setFields([
        {
          name: "password",
          errors: ["Senha incorreta"],
        },
      ]);
    }

    if (authentication.wrongUser) {
      setSending(false);
      form.setFields([
        {
          name: "username",
          errors: ["Usuário não encontrado"],
        },
      ]);
    }
  }, [authentication]);

  return (
    <div className={styles["cont"]}>
      <img
        className={styles["img-logo"]}
        src={logo}
        alt=""
      ></img>
      <Form
        form={form}
        scrollToFirstError={true}
        name="normal_login"
        className={styles["login-form"]}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <>
        <h1 className={styles["top-text"]}>Beamline Items Catalog</h1>
          <h3 className={styles["top-text"]}>Faça o login para continuar</h3>

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Nome de usuário obrigatório",
              },
            ]}
          >
            <Input
              type="string"
              prefix={
                <UserOutlined className={styles["site-form-item-icon"]} />
              }
              placeholder="Nome de usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Senha obrigatória",
              },
            ]}
          >
            <Input.Password
              placeholder="Senha"
              prefix={
                <LockOutlined className={styles["site-form-item-icon"]} />
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-form-button"]}
              loading={sending}
            >
              Entrar
            </Button>
          </Form.Item>
        </>
      </Form>
    </div>
  );
}
