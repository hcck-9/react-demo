import "@/common/layout/workBench.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.jpg";
import img3 from "@/assets/images/3.jpg";
import img4 from "@/assets/images/4.jpg";
import img5 from "@/assets/images/5.jpg";
import img6 from "@/assets/images/6.jpg";
import img7 from "@/assets/images/7.jpg";
import { Card } from "antd";
import {
  AlipayCircleOutlined,
  GithubOutlined,
  TaobaoCircleOutlined,
  TikTokOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";

const WorkBench = () => {
  const userinfo = useSelector((state: RootState) => state.userinfo);

  const data = [
    {
      key: 1,
      title: "Github",
      description: "不要等待机会，而要创造机会。",
      group: "开源组",
      date: "2021-04-01",
      src: img1,
    },
    {
      key: 2,
      title: "Vue",
      description: "现在的你决定将来的你。",
      group: "算法组",
      date: "2021-04-01",
      src: img4,
    },
    {
      key: 3,
      title: "Html5",
      description: "没有什么才能比努力更重要。",
      group: "上班摸鱼",
      date: "2021-04-01",
      src: img3,
    },
    {
      key: 4,
      title: "Angular",
      description: "热情和欲望可以突破一切难关。",
      group: "UI",
      date: "2021-04-01",
      src: img2,
    },
    {
      key: 5,
      title: "React",
      description: "健康的身体是实现目标的基石。",
      group: "技术牛",
      date: "2021-04-01",
      src: img5,
    },
    {
      key: 6,
      title: "Js",
      description: "路是走出来的，而不是空想出来的。",
      group: "架构组",
      date: "2021-04-01",
      src: img7,
    },
  ];

  const fastLink = [
    {
      key: 999,
      title: "首页",
      icon: <GithubOutlined twoToneColor="#eb2f96" />,
    },
    {
      key: 998,
      title: "仪表盘",
      icon: <WeiboCircleOutlined twoToneColor="#eb2f96" />,
    },
    {
      key: 997,
      title: "组件",
      icon: <TaobaoCircleOutlined twoToneColor="#eb2f96" />,
    },
    {
      key: 996,
      title: "系统设置",
      icon: <AlipayCircleOutlined twoToneColor="#eb2f96" />,
    },
    {
      key: 995,
      title: "权限管理",
      icon: <WechatOutlined twoToneColor="#eb2f96" />,
    },
    {
      key: 994,
      title: "图表",
      icon: <TikTokOutlined twoToneColor="#52c41a" />,
    },
  ];

  const globalTheme = useSelector((state: RootState) => state.theme);

  return (
    <div className="workBench">
      <div
        className="info"
        style={{
          backgroundColor: globalTheme.dark ? "#000" : "#fff",
        }}
      >
        <img src={img6} alt="" />
        <div className="promptInfo">
          <div className="top">
            早安, {userinfo.nickname}, 开始您一天的工作吧！
          </div>
          <div className="bottom">今日晴，20℃ - 32℃！</div>
        </div>
        <div className="workInfo">
          <div className="todo">
            <p>代办</p>
            <p className="number">2/10</p>
          </div>
          <div className="todo middle">
            <p>项目</p>
            <p className="number">8</p>
          </div>
          <div className="todo end">
            <p>团队</p>
            <p className="number">300</p>
          </div>
        </div>
      </div>
      <div className="shortcut">
        <div className="left">
          <Card
            title="项目"
            bordered={false}
            extra={
              <span
                style={{
                  cursor: "pointer",
                  color: "#0960bd",
                }}
              >
                更多
              </span>
            }
          >
            {data.map((item) => {
              return (
                <div className="projectInfo" key={item.key}>
                  <div className="logo">
                    <img src={item.src} alt="" />
                    <span>{item.title}</span>
                  </div>
                  <p
                    style={{
                      height: "40px",
                    }}
                  >
                    {item.description}
                  </p>
                  <p className="dateInfo">
                    <span>{item.group}</span>
                    <span>{item.date}</span>
                  </p>
                </div>
              );
            })}
          </Card>
        </div>
        <div className="right">
          <Card title="快捷方式" bordered={false}>
            {fastLink.map((item) => {
              return (
                <div className="projectInfo" key={item.key}>
                  {item.icon}
                  <span className="title">{item.title}</span>
                </div>
              );
            })}
          </Card>
          <Card
            style={{
              marginTop: "10px",
            }}
          >
            <img
              src="https://vben.vvbin.cn/assets/illustration-jTCqTCdW.svg"
              alt=""
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkBench;
