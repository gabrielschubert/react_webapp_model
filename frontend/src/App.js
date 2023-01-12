import React, { useState, useEffect } from "react";
import { useSelector, Provider } from "react-redux";
import { Spin, message } from "antd";
import store from "./store";
import login from "./actions/login";

import UserLogin from "./components/UserLogin";
import MainPage from "./components/MainPage"

message.config({
  maxCount: 2,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  const logged = useSelector((state) => state.authentication.logged);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    (logged != 'notChecked') && setLoading(false)
  }, [logged]);


  return (
    <>
      {loading == true ?
        <Spin style={{ marginTop: "60px" }} tip="Loading" size="large">
          <div className="content" />
        </Spin>
        : (logged == true) ? (
          <MainPage />
        ) : (
          <UserLogin />
        )}

    </>
  );
}

export default AppWrapper