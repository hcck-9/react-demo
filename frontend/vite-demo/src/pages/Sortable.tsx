import { Button, theme, Modal, Form, Input, Radio, Progress } from "antd";
import "@/common/layout/account.scss";
import { useNavigate } from "react-router-dom";
import cl from "classnames";
import { ReactSortable } from "react-sortablejs";
import { useState } from "react";

interface elementType {
  id: number;
  fieldKey: string;
  fieldLabel: string;
  fieldConfig?: Object;
}

interface visitorType {
  id: string;
  deion: string;
  title: string;
  value: string;
  type: string;
}

const Sortable = () => {
  const { TextArea } = Input;

  const fieldList: elementType[] = [
    {
      id: 1,
      fieldKey: "Input",
      fieldLabel: "单行输入",
      fieldConfig: {},
    },
    {
      id: 2,
      fieldKey: "TextArea",
      fieldLabel: "多行输入",
      fieldConfig: {},
    },
    {
      id: 3,
      fieldKey: "DatePicker",
      fieldLabel: "日期",
    },
    {
      id: 4,
      fieldKey: "Radio",
      fieldLabel: "单选框",
      fieldConfig: {},
    },
    {
      id: 5,
      fieldKey: "Checkbox",
      fieldLabel: "多选框",
      fieldConfig: {},
    },
  ];

  const [staticVisitorElements, setStaticVisitorElements] = useState<
    visitorType[]
  >([
    {
      id: "visitor-00000000-0",
      deion: "请输入",
      title: "访客姓名",
      value: "",
      type: "Input",
    },
    {
      id: "visitor-00000000-1",
      deion: "请输入",
      title: "访客电话",
      value: "",
      type: "Input",
    },
  ]);

  return (
    <div className="account flex flex-row h-full">
      <aside className="w-15 h-full">
        <ReactSortable
          list={fieldList}
          animation={200}
          group={{
            name: "sort-field",
            pull: "clone",
            put: false,
          }}
          setList={() => {}}
          sort={false}
          style={{ overflow: "auto" }}
          preventOnFilter={true}
        >
          {fieldList.map((item) => {
            return (
              <div
                className="w-15 h-15 hover:bg-gray text-center line-height-15 bg-white"
                key={item?.fieldKey}
              >
                {item?.fieldLabel}
              </div>
            );
          })}
        </ReactSortable>
      </aside>
      <main className="flex-1 bg-white ml-5">
        <ReactSortable
          list={staticVisitorElements}
          setList={setStaticVisitorElements}
          ghostClass="bg-red"
        >
          {staticVisitorElements.map((item: visitorType) => {
            return <TemplateElement {...item}></TemplateElement>;
          })}
        </ReactSortable>
      </main>
    </div>
  );
};

const TemplateElement = (props: visitorType) => {
  let el;
  const type = props.type;
  switch (type) {
    case "Input":
      el = (
        <div className="w-full flex p-2.5">
          <div className="w-30 mr-5 text-right line-height-6.5">
            {props.title}：
          </div>
          <Input value={props.value}></Input>
        </div>
      );
  }
  return <>{el}</>;
};

export default Sortable;
