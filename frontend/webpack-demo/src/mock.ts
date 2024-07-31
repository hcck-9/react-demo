import Mock from "mockjs";

const domain = "/api/";
Mock.setup({
  timeout: "1000-3000", //表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。
});
// 模拟login接口
Mock.mock(domain + "login", function () {
  const result = {
    code: 200,
    message: "OK",
    data: {
      loginUid: 10000,
      nickname: "兔子先生",
      token: "hh123",
      avaUrl: "/src/assets/images/6.jpg",
    },
  };
  return result;
});

Mock.mock(domain + "getAnalysisData", "get", function () {
  const result = {
    code: 200,
    message: "OK",
    data: {
      date: new Date(),
    },
  };
  return result;
});

Mock.mock(domain + "getUserList", "get", () => {
  const res = [];
  for (let i = 0; i < 50; i++) {
    res.push({
      key: i,
      name: "ZS" + Math.random().toString().slice(-3),
      age: Math.random().toString().slice(-2),
      address: "China Beijing",
      createAt: new Date(),
    });
  }
  const result = {
    code: 200,
    message: "OK",
    data: res,
  };
  return result;
});
