import React from "react";
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

// 本demo主要使用react18 + redux + antd + react-router 搭建的一个demo，主要是学习一些相关技术的基础用法。总体架构类似于后台管理系统。
// 路由分为两个一级路由页面 login和 entry，其余页面路由均为entry的子路由，使用outlet作为路由占位符，根据路由进行页面之间的切换。
// 持久化数据存储有两个分库，一个是关于用户信息的slice，另一个是关于本demo中的暗黑模式和主题色配置。redux主要分为，name，initState，reducers。然后将这个分库注册到总库中，使用时可以在任意页面进行导入并传递数据，可以实现页面之间的通信。
// 整体构建大部分是使用antd的中组件来进行页面之间的搭建
// 后端请求时使用mock来进行模拟后端数据的返回。
