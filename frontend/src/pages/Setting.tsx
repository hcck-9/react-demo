import { Descriptions, Layout } from "antd";
import "@/common/layout/setting.scss";
import { useEffect, useState } from "react";
import config from "../..//package.json";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const { Header } = Layout;

const Setting: React.FC = () => {
  const [dependencies, setDependencies] = useState([]);
  const [devDependencies, setDevDependencies] = useState([]);

  useEffect(() => {
    const depArray: any = Object.entries(config.dependencies).map(
      ([name, version]) => ({
        label: name,
        children: version,
      })
    );
    const devDepArray: any = Object.entries(config.devDependencies).map(
      ([name, version]) => ({ label: name, children: version })
    );
    setDependencies(depArray);
    setDevDependencies(devDepArray);
  }, []);

  const globalTheme = useSelector((state: RootState) => state.theme);

  return (
    <div className="setting">
      <Header
        style={{
          backgroundColor: globalTheme.dark ? "#000" : "#fff",
        }}
      >
        <h3>关于</h3>
        <span>这是一个React + Ant Design + Redux 的一个练手Demo。</span>
      </Header>
      <div
        className="devSetting"
        style={{
          backgroundColor: globalTheme.dark ? "#000" : "#fff",
        }}
      >
        <p>生产环境依赖</p>
        <Descriptions
          bordered
          column={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={dependencies}
        />
      </div>
      <div className="devSetting">
        <p>开发环境依赖</p>
        <Descriptions
          bordered
          column={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 4, xxl: 4 }}
          items={devDependencies}
        />
      </div>
    </div>
  );
};

export default Setting;
