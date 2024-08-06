import { Button, theme, Modal } from "antd";
import { logout } from "@/api";
import "@/common/layout/account.scss";
import { useNavigate } from "react-router-dom";
import cl from "classnames";

const { useToken } = theme;

const Account = () => {
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

  const ReturnDiv = (props): any => {
    console.log(props);

    return <div {...props} />;
  };

  const obj = {
    className: "bg-red",
    title: "div",
  };

  const data = {
    content: "h1",
    children: [],
  };
  return (
    <div className="account">
      {contextHolder}
      <h1
        style={{
          color: token.colorText,
        }}
      >
        Account Page
      </h1>
      <div className="ipt-con">
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          跳转至home页面
        </Button>
      </div>
      <div className="ipt-con">
        <Button type="primary" onClick={exit}>
          返回登录
        </Button>
      </div>
      <ReturnDiv {...data} className={cl(obj?.className, "bg-sky")}>
        {data.content}
      </ReturnDiv>
    </div>
  );
};

export default Account;
