import { theme, Card, Switch } from "antd";
import "@/common/layout/editor/editor.scss";
import Left from "./Left/index";
import Right from "./Right/index";
import Canvas from "./Canvas/index";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import cl from "classnames";
import Computer from "@/assets/svgs/computer.svg?react";
import Phone from "@/assets/svgs/phone.svg?react";
import SaveBtn from "./SaveBtn";
import ShowCodeBtn from "./ShowCodeBtn";

const { useToken } = theme;

const Editor = () => {
  // 获取主题token设置
  const { token } = useToken();

  const [checked, setChecked] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="editor"
        style={{
          color: token.colorText,
          height: "100%",
        }}
      >
        <Card style={{ width: "100%", marginBottom: 10 }}>
          <header className="flex my-3 justify-end">
            <div className="inline-flex justify-center items-center">
              <div className="inline-flex justify-center items-center">
                <Computer
                  className={cl("w-6 h-6 mr-1", {
                    "text-indigo-600": !checked,
                    "text-gray-500": checked,
                  })}
                />
                <Switch checked={checked} onChange={(c) => setChecked(c)} />
                <Phone
                  className={cl("w-6 h-6 mr-1", {
                    "text-indigo-600": checked,
                    "text-gray-500": !checked,
                  })}
                />
              </div>
              <ShowCodeBtn />
              <SaveBtn />
            </div>
          </header>
        </Card>
        <Card style={{ width: "100%", flex: 1 }}>
          <main className="main">
            <Left />
            <Canvas mobile={checked} />
            <Right />
          </main>
        </Card>
      </div>
    </DndProvider>
  );
};

export default Editor;
