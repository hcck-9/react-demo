import { isArray, isString, map } from "lodash";
// import { State } from "../../../app/codeTreeSlice";
import { State } from "@/store/slices/codeTree";

const getChildrenCode = (sub: State) => {
  if (sub.type === "select") {
    return map(
      sub.props.children,
      (item) => `<option value="${item.value}">${item.label}</option>`
    ).join("");
  }
  if (isString(sub.props.children)) {
    return sub.props.children;
  }
  return "";
};

export const generateCode = (state: State) => {
  let module: Record<string, string[]> = {};

  function render(sub: State): string {
    // 导入一些外置的包，例如ant-design的一些包，或者是画图所需要的一些包
    if (sub.module) {
      if (module[sub.module] && module[sub.module].indexOf(sub.type) === -1) {
        module[sub.module] = [...module[sub.module], sub.type];
      }
      if (!module[sub.module]) {
        module[sub.module] = [sub.type];
      }
    }

    let props = "";
    if (sub.props) {
      Object.keys(sub.props).forEach((key) => {
        if (key !== "children" && sub.props[key]) {
          const value = isArray(sub.props[key])
            ? `{${JSON.stringify(sub.props[key])}}`
            : `'${sub.props[key]}'`;

          props = `${props} ${key}=${value}`;
        }
      });
    }

    const children =
      sub.children && sub.children.length > 0
        ? map(sub.children, render).join("")
        : getChildrenCode(sub);
    if (children) {
      return `<${sub.type}${props}>
        ${children}
      </${sub.type}>`;
    } else {
      return `<${sub.type}${props}/>`;
    }
  }

  const code = render(state);

  let moduleCode = "";
  Object.keys(module).forEach((m) => {
    moduleCode += `import {${module[m].join(",")}} from '${m}';`;
  });

  return `import React from 'react';
${moduleCode}

function App() {
    return (
        ${code}
    );
}

export default App;`;
};
