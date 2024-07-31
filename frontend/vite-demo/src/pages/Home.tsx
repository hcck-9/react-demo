import { Button, theme, Modal } from "antd";
import { goto, logout } from "@/api";
import "@/common/layout/home.scss";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

const Home = () => {
  // 获取主题token设置
  const { token } = useToken();

  const navigate = useNavigate();

  const [modal, contextHolder] = Modal.useModal();

  const exit = () => {
    modal.confirm({
      title: "是否退出登录？",
      onOk() {
        logout();
      },
    });
  };

  return (
    <div className="home">
      {/* 一个包含modal的react元素，放在这里确保可以被渲染 */}
      {contextHolder}
      <h1
        style={{
          color: token.colorText,
        }}
      >
        Home Page
      </h1>
      <div className="ipt-con">
        <Button
          onClick={() => {
            goto("/login");
          }}
        >
          组件外跳转
        </Button>
      </div>
      <div className="ipt-con">
        <Button
          onClick={() => {
            navigate("/account");
          }}
        >
          跳转至account页面
        </Button>
      </div>
      <div className="ipt-con">
        <Button type="primary" onClick={exit}>
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default Home;
