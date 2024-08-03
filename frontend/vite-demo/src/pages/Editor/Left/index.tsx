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
      className="w-50 flex"
      style={{
        color: token.colorText,
      }}
    >
      <div className="w-20 overscroll-y-auto flex flex-col items-center">
        {menus.map((menu) => {
          return (
            <div
              key={menu.key}
              className={cs(
                "py-5 cursor-pointer w-15 border-transparent border-r-4 hover:bg-indigo-50 text-align-center",
                {
                  "bg-indigo-50 shadow dark:bg-blue": type === menu.key,
                }
              )}
              onClick={() => setType(menu.key)}
            >
              {menu.key}
            </div>
          );
        })}
      </div>
      <div className="w-30 overscroll-y-auto p-2 space-y-2 border-r border-l border-gray-200">
        {fields?.panel}
      </div>
    </div>
  );
};

export default Left;
