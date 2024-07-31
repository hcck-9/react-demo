import { theme } from "antd";
import cs from "classnames";
import "@/common/layout/editor/left.scss";
import menus from "../schema/fields";
import { useState } from "react";

const { useToken } = theme;

const Left = () => {
  // 获取主题token设置
  const { token } = useToken();

  const [type, setType] = useState("basic");
  const fields = menus.find((menu) => menu.key === type);
  return (
    <div
      className="left"
      style={{
        color: token.colorText,
      }}
    >
      <div className="item-name">
        {menus.map((menu) => {
          return (
            <div
              key={menu.key}
              className={cs("item-name", {
                active: type === menu.key,
              })}
              onClick={() => setType(menu.key)}
            >
              {menu.key}
            </div>
          );
        })}
      </div>
      <div className="components">{fields?.panel}</div>
    </div>
  );
};

export default Left;
