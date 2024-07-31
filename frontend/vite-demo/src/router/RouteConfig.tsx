import { createHashRouter, Navigate } from "react-router-dom";
// import { lazy } from "react";
// const Login = lazy(() => import("@/pages/Login"));
// const Home = lazy(() => import("@/pages/Home"));
// const Account = lazy(() => import("@/pages/Account"));
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Account from "@/pages/Account";
import Entry from "@/components/Entry";
import Analysis from "@/pages/Analysis";
import UserList from "@/pages/UserList";
import Setting from "@/pages/Setting";
import WorkBench from "@/pages/Workbench";

const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Entry />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/workBench",
        element: <WorkBench />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/analysis",
        element: <Analysis />,
      },
      {
        path: "/userList",
        element: <UserList />,
      },
      {
        path: "/about",
        element: <Setting />,
      },
      {
        // 如果URL没有"#路由"，跳转analysis页面
        path: "/",
        element: <Navigate to="/analysis" />,
      },
      // 未匹配，，跳转Login页面
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export default router;
