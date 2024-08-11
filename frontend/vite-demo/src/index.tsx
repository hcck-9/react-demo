import ReactDOM from "react-dom/client";
import router from "@/router/RouteConfig";
// 引入reducer
import { store } from "@/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
// 引入Ant Design中文语言包
import zhCN from "antd/locale/zh_CN";
import "@/common/styles/app.css";
import "./mock";
import "virtual:uno.css";
import { globalConfig } from "./globalConfig";
// import "./setupProxy";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);
