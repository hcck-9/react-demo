import { theme } from "antd";
import "@/common/layout/editor/right.scss";

const { useToken } = theme;

const Editor = () => {
  // 获取主题token设置
  const { token } = useToken();

  return (
    <div
      className="right"
      style={{
        color: token.colorText,
      }}
    >
      Tree
    </div>
  );
};

export default Editor;
