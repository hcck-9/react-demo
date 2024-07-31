import { theme } from "antd";
import "@/common/layout/editor/canvas.scss";

const { useToken } = theme;

const Editor = () => {
  // 获取主题token设置
  const { token } = useToken();

  return (
    <div
      className="canvas"
      style={{
        color: token.colorText,
      }}
    >
      Canvas
    </div>
  );
};

export default Editor;
