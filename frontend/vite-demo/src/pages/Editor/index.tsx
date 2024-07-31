import { theme, Button, Card } from "antd";
import "@/common/layout/editor/editor.scss";
import Left from "./Left/index";
import Right from "./Right/index";
import Canvas from "./Canvas/index";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const { useToken } = theme;

const Editor = () => {
  // 获取主题token设置
  const { token } = useToken();

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
          <header>
            <Button>123</Button>
          </header>
        </Card>
        <Card style={{ width: "100%", flex: 1 }}>
          <main className="main">
            <Left />
            <Canvas />
            <Right />
          </main>
        </Card>
      </div>
    </DndProvider>
  );
};

export default Editor;
