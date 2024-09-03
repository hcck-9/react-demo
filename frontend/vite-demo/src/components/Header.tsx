import { FC, useState } from "react";
import { Button, Card } from "antd";

import SunOutlined from "@/assets/svgs/sun.svg";
import MoonOutlined from "@/assets/svgs/moon.svg";
import ThemeOutlined from "@/assets/svgs/theme.svg";
// 引入Redux
// useDispatch用于写入store库，调用store里定义的方法。
// useSelector用于读取store库里的变量值。
import { useSelector, useDispatch } from "react-redux";
import { setDark } from "@/store/slices/theme";
import type { RootState } from "@/store";
import ThemeModal from "./ThemeModal";
import { globalConfig } from "@/globalConfig";
import "@/common/layout/header.scss";
import img from "@/assets/images/3.jpg";

type PropsType = {
  title: string;
  info?: () => void;
};
const Header: FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);
  const userInfo = useSelector((state: RootState) => state.userinfo);

  const { title, info } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  info && info();
  return (
    <Card className="header">
      <div className="header-wrapper">
        <div className="logo-con">Header:{title}</div>
        <div className="opt-con">
          {theme.dark ? (
            <Button
              icon={<SunOutlined />}
              shape="circle"
              onClick={() => {
                dispatch(setDark(false));
              }}
            ></Button>
          ) : (
            <Button
              icon={<MoonOutlined />}
              shape="circle"
              onClick={() => {
                dispatch(setDark(true));
              }}
            ></Button>
          )}
          {globalConfig.customColorPrimarys?.length && (
            <Button
              icon={<ThemeOutlined />}
              shape="circle"
              onClick={() => {
                setIsModalOpen(true);
              }}
            ></Button>
          )}
          <div className="info">
            <img src={img} alt="" />
            <span>{userInfo.nickname}</span>
          </div>
        </div>
      </div>
      {/* 展示主题色切换对话框 */}
      {isModalOpen && (
        <ThemeModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </Card>
  );
};

export default Header;
