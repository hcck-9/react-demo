import { theme } from "antd";
import "@/common/layout/editor/right.scss";
import { FieldNodeSchema, State, updateTree } from "@/store/slices/codeTree";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { traverse } from "@/utils";
import editFields from "../schema/edit";
import { Field } from "../schema/types";
import { fields } from "./fields";

const { useToken } = theme;

const Right = () => {
  // 获取主题token设置
  const { token } = useToken();

  const state: State = useSelector<RootState>(
    (state) => state.codeTree
  ) as State;

  const dispatch = useDispatch<AppDispatch>();

  let focusComponent: FieldNodeSchema | undefined;

  traverse(state, (sub) => {
    if (sub.id === state.focusId) {
      focusComponent = sub;
      return false;
    }
    return true;
  });

  const handleChange = (value: any, key: string) => {
    dispatch(
      updateTree({
        key,
        value,
      })
    );
  };

  const renderField = (item: Field) => {
    const { key, name, type, ...other } = item;
    if (type === "Table") {
      const Table = fields[type];
      return (
        <Table
          columns={focusComponent?.props.columns}
          value={focusComponent?.props[key]}
          onChange={(value: any) => handleChange(value, key)}
        />
      );
    }
    if (type === "Select") {
      const Select = fields[type];
      return (
        <Select
          style={{ width: "100%" }}
          options={other.options}
          value={focusComponent?.props[key]}
          onChange={(value: any) => handleChange(value, key)}
        />
      );
    }
    const Field = fields[type] as any;
    return (
      <Field
        {...other}
        value={focusComponent?.props[key]}
        onChange={(value: any) => handleChange(value, key)}
      />
    );
  };

  return (
    <div className="min-w-75 overflow-y-scroll border-l border-0 border-gray-200 space-y-2 border-solid flex flex-col">
      <div className="flex-shrink-0 h-10 leading-10 px-3 border-0 text-indigo-600 border-b border-solid  border-gray-200 font-medium">
        属性设置
      </div>
      <div className="p-2 flex-1">
        {focusComponent ? (
          // schema 下 edit 里面的数据
          editFields[focusComponent.type].map((item) => {
            // console.log("item", item);

            const { key, name, type, ...other } = item;
            return (
              <div className="" key={key}>
                <div>{name}:</div>
                <div className="mt-1">{renderField(item)}</div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            请在左侧画布中选择节点
          </div>
        )}
      </div>
    </div>
  );
};

export default Right;
