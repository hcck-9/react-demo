import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { ConfigProvider, theme, Layout, Menu, MenuProps } from "antd";
import "@/common/layout/entry.scss";
import { RootState } from "@/store";
import PrivateRoute from "@/router/PrivateRoute";

import {
  BarChartOutlined,
  AppstoreOutlined,
  UserOutlined,
  InfoCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import React, { ReactNode, useRef } from "react";

const { Content, Footer, Sider } = Layout;

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme;

const Entry: React.FC = () => {
  // 路由钩子
  const location = useLocation();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  // 获取列表数据
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    path: ReactNode,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      path,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("分析报表", "1", "/analysis", <BarChartOutlined />),
    getItem("工作台", "2", "/workbench", <AppstoreOutlined />),
    getItem("用户列表", "3", "/userList", <UserOutlined />),
    getItem("关于", "4", "/about", <InfoCircleOutlined />),
    getItem("账户", "5", "/account", <SmileOutlined />),
  ];

  const defaultIndex = useRef(localStorage.getItem("routerPath") || "1");
  localStorage.setItem("routerPath", defaultIndex.current);

  // 路由切换
  const handleClick: MenuProps["onClick"] = (e) => {
    const selectItem = items.find((item) => item?.key === e.key);
    // @ts-ignore
    defaultIndex.current = selectItem.key;
    // @ts-ignore
    localStorage.setItem("routerPath", selectItem.key);
    // @ts-ignore
    selectItem && navigate(selectItem.path);
  };

  // 获取store中的主题配置
  const globalTheme = useSelector((state: RootState) => state.theme);

  // 主题设置
  let antdTheme = {
    // 亮色暗色设计
    algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    token: globalTheme.colorPrimary
      ? {
          colorPrimary: globalTheme.colorPrimary,
        }
      : {},
  };
  return (
    <PrivateRoute>
      <ConfigProvider theme={antdTheme}>
        <Layout className="entry">
          <Header title={location.pathname}></Header>
          <Layout>
            <Sider>
              <Menu
                className="menu"
                defaultSelectedKeys={[defaultIndex.current]}
                items={items}
                onClick={handleClick}
              ></Menu>
            </Sider>
            <Content className="container">
              <Outlet />
              <Footer className="footer">
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </PrivateRoute>
  );
};

export default Entry;

// 主题切换，是antd提供了ConfigProvider组件，提供了theme参数来配置主题。使用这个组件包裹我们的需要进行主题配置的页面及其子页面即可实现主题和主题色的切换。通过配置算法来切换主题，通过配置token中的colorPrimary参数实现primary按钮组件颜色的切换...，没有进行配置的会继承上级组件的主题
