import antd from "./antd";
import basic from "./basic";
import components from "./components";
import DragPanel from "../../Left/DragPanel";
import TreePanel from "../../TreePanel";
import React, { ReactElement } from "react";

// 左侧编辑区域
const menus: {
  key: string;
  panel: ReactElement;
}[] = [
  {
    key: "tree",
    panel: <TreePanel />,
  },
  {
    key: "basic",
    panel: <DragPanel data={basic} />,
  },
  {
    key: "antd",
    panel: <DragPanel data={antd} />,
  },
  // // 后面三个都可以合并，合并为这个树形结构
  // {
  //   key: "basic",
  //   panel: <DragPanel data={basic} />,
  // },
  // {
  //   key: "components",
  //   panel: <DragPanel data={components} />,
  // },
];

export default menus;
