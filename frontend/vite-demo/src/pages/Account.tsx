import { Button, theme, Modal, Form, Input, Radio, Progress } from "antd";
import { logout } from "@/api";
import "@/common/layout/account.scss";
import { useNavigate } from "react-router-dom";
import cl from "classnames";
// 引入二维码生成组件
import QRCode from "qrcode.react";

import { ReactSortable } from "react-sortablejs";
import { useState } from "react";

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
  interface ItemType {
    id: number;
    name: string;
  }

  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek" },
    { id: 2, name: "fiona" },
  ]);

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
      <Form.Item label="name">
        <Input placeholder="input name'" />
      </Form.Item>
      <Progress percent={30} type="line" />
      <QRCode
        id="qrCode"
        value="https://www.baidu.com"
        size={200} // 二维码的大小
        fgColor="#000000" // 二维码的颜色
        style={{ margin: "auto" }}
        imageSettings={{
          // 二维码中间的logo图片
          src: "logoUrl",
          height: 100,
          width: 100,
          excavate: true, // 中间图片所在的位置是否镂空
        }}
      />
      <ReactSortable list={state} setList={setState}>
        {state.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default Account;
