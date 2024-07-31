import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setColorPrimary } from "@/store/slices/theme";
import { globalConfig } from "@/globalConfig";
import "@/common/layout/themeModal.scss";
import { CheckCircleOutlined } from "@ant-design/icons";

type PropsType = {
  onClose: () => void;
};
const ThemeModal: React.FC<PropsType> = (props) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme);

  return (
    <Modal
      className="themeModal"
      title="主题切换"
      open={true}
      onCancel={() => onClose()}
      footer={null}
    >
      <div className="color-list">
        {globalConfig &&
          globalConfig.customColorPrimarys.map((item, index) => {
            return (
              <div
                className="color-item"
                style={{
                  backgroundColor: item,
                }}
                key={index}
                onClick={() => {
                  dispatch(setColorPrimary(item));
                  onClose();
                }}
              >
                {theme.colorPrimary === item && (
                  <CheckCircleOutlined
                    style={{
                      fontSize: 28,
                      color: "#FFF",
                    }}
                  />
                )}
              </div>
            );
          })}
      </div>
    </Modal>
  );
};

export default ThemeModal;
