import Mock from "mockjs";

const domain = "/api/";
// 加上这个就有个redux初始值没渲染的问题
// Mock.setup({
//   timeout: "100-300", //表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。
// });
// 模拟login接口
Mock.mock(domain + "login", function () {
  let result = {
    code: 200,
    message: "OK",
    data: {
      loginUid: 10000,
      nickname: "兔子女士",
      token: "hh123",
      avaUrl: "/src/assets/images/6.jpg",
    },
  };
  return result;
});

Mock.mock(domain + "getAnalysisData", "get", function () {
  let result = {
    code: 200,
    message: "OK",
    data: {
      date: new Date(),
    },
  };
  return result;
});

interface userInfo {
  key: number;
  name: string;
  age: string;
  address: string;
  createAt: Date;
}

Mock.mock(domain + "getUserList", "get", () => {
  const res: userInfo[] = [];
  for (let i = 0; i < 50; i++) {
    const user: userInfo = {
      key: i,
      name: "ZS" + Math.random().toString().slice(-3),
      age: Math.random().toString().slice(-2),
      address: "China Beijing",
      createAt: new Date(),
    };

    res.push(user);
  }
  const result = {
    code: 200,
    message: "OK",
    data: res,
  };
  return result;
});

Mock.mock(domain + "component", "post", (req) => {
  let result = {
    code: 0,
    success: true,
    data: req.body,
  };
  return result;
});
