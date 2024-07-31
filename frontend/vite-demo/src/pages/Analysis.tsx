import { Card, Col, Row, Tag, Tabs } from "antd";
import "@/common/layout/analysis.scss";
import { useEffect, useState } from "react";
import { apiRequest } from "@/api";
import type { TabsProps } from "antd";
import LineChartComPonent from "./charts/LineChart";
import BarChartComPonent from "./charts/BarChart";

const Analysis: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest({
      url: "/api/getAnalysisData",
      method: "get",
      done: () => {
        setLoading(false);
      },
    });
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "流量趋势",
      children: <LineChartComPonent />,
    },
    {
      key: "2",
      label: "访问量",
      children: <BarChartComPonent />,
    },
  ];

  return (
    <div className="analysis">
      <div className="topInfo">
        <Row gutter={16}>
          <Col span={6}>
            <Card
              title="访问数"
              bordered={false}
              extra={<Tag color="success">月</Tag>}
              loading={loading}
            >
              <div className="top">
                <span>$2000</span>
                <img
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
                  alt=""
                />
              </div>
              <div className="bottom">
                <span>总访问数</span>
                <span>$12000</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="成交额"
              bordered={false}
              extra={<Tag color="blue">月</Tag>}
              loading={loading}
            >
              <div className="top">
                <span>$20000</span>
                <img
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
                  alt=""
                />
              </div>
              <div className="bottom">
                <span>总成交额</span>
                <span>$500000</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="下载数"
              bordered={false}
              extra={<Tag color="warning">周</Tag>}
              loading={loading}
            >
              <div className="top">
                <span>$2000</span>
                <img
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=4"
                  alt=""
                />
              </div>
              <div className="bottom">
                <span>总下载数</span>
                <span>$12000</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="成交数"
              bordered={false}
              extra={<Tag color="magenta">年</Tag>}
              loading={loading}
            >
              <div className="top">
                <span>$2000</span>
                <img
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=6"
                  alt=""
                />
              </div>
              <div className="bottom">
                <span>总成交数</span>
                <span>$1200000</span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="contentChart">
        <Card bordered={false} loading={loading}>
          <Tabs defaultActiveKey="1" items={items} />
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
