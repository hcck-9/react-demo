import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { apiReqs } from "@/api";

import imgLogo from "@/logo.svg";
import "@/common/layout/login.scss";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("123456");
  const [password, setPassword] = useState("123456");

  const login = () => {
    apiReqs.signIn({
      data: {
        account,
        password,
      },
      success: (res: any) => {
        console.log(res);
        navigate("/analysis");
      },
    });
  };

  return (
    <div className="login">
      <img src={imgLogo} alt="" className="logo" />
      <div className="ipt-con">
        <Input
          placeholder="账号"
          defaultValue={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        />
      </div>
      <div className="ipt-con">
        <Input.Password
          placeholder="密码"
          defaultValue={password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="ipt-con">
        <Button type="primary" block={true} onClick={login}>
          登录
        </Button>
      </div>
    </div>
  );
};

export default Login;
