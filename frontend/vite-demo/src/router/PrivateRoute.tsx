import { Navigate } from "react-router-dom";
import { globalConfig } from "@/globalConfig";
import { FC, ReactElement } from "react";

type PropsType = {
  children: ReactElement;
};
// 简易路由守卫
const PrivateRoute: FC<PropsType> = (props) => {
  return window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
