import { Field } from "../types";

const editFields: Record<string, Field[]> = {
  div: [
    // 别的属性可以在这里添加，可以在这里添加一些类似于平台的唯一编码，不过这里添加的是key
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
  ],
  h1: [
    {
      key: "children",
      name: "内容",
      type: "Text",
    },
  ],
  span: [
    {
      key: "children",
      name: "内容",
      type: "Text",
    },
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
  ],
  img: [
    {
      key: "src",
      name: "图片地址",
      type: "Text",
    },
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
    {
      key: "width",
      name: "宽度",
      type: "Number",
    },
    {
      key: "height",
      name: "高度",
      type: "Number",
    },
  ],
  button: [
    {
      key: "children",
      name: "内容",
      type: "Text",
    },
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
  ],
  input: [
    {
      key: "type",
      name: "类型",
      type: "Text",
    },
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
    {
      key: "placeholder",
      name: "提示",
      type: "Text",
    },
  ],
  select: [
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
    {
      key: "placeholder",
      name: "提示",
      type: "Text",
    },
    {
      key: "children",
      name: "选项",
      type: "EditableTable",
      columns: [
        {
          title: "显示值",
          dataIndex: "label",
          editable: true,
          width: "40%",
        },
        {
          title: "选项值",
          dataIndex: "value",
          editable: true,
          width: "40%",
        },
      ],
    },
  ],
  Link: [
    {
      key: "className",
      name: "样式",
      type: "Text",
    },
    {
      key: "to",
      name: "链接",
      type: "Text",
    },
    {
      key: "children",
      name: "内容",
      type: "Text",
    },
  ],
};

export default editFields;
