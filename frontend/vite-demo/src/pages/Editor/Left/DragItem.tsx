import React from "react";
import cl from "classnames";
import { CRAD } from "../ItemTypes";
import { useDrag } from "react-dnd";
import { v1 as uuid } from "uuid";
import { getEmptyImage } from "react-dnd-html5-backend";
import { FieldNodeSchema } from "@/store/slices/codeTree";
import { FieldNode } from "../schema/types";

export default function DragItem({
  data,
}: {
  data: FieldNodeSchema | FieldNode;
}) {
  const [{ isDragging }, dragRef, connectDragPreview] = useDrag(() => {
    const { type } = data;
    let children: any[] = [];
    // if (type === "Grid") {
    //   children = new Array(4).fill("1").map(() => ({
    //     id: uuid(),
    //     type: "div",
    //     props: {
    //       className: "",
    //     },
    //   }));
    // }
    if (type === "Form") {
      children = new Array(1).fill("1").map((it, i) => ({
        id: uuid(),
        type: "Form.Item",
        props: {
          name: "field" + i,
          label: "field" + i,
        },
        children: [
          {
            type: "Input",
            id: uuid(),
            module: "antd",
            props: {},
          },
        ],
      }));
    }

    return {
      type: CRAD,
      // 对象的话是描述被拖动数据的普通 JavaScript 对象。
      // 函数的话，会在拖动操作开始时触发，并返回一个代表拖动操作的对象。如果返回 null，拖动操作将被取消。
      item: { data: { ...data, children } },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, []);

  // 隐藏浏览器绘制的拖动预览
  connectDragPreview(getEmptyImage());

  return (
    <div
      ref={dragRef}
      className={cl(
        "mb-1 p-2 border border-solid border-gray-400 text-center text-gray-600 shadow-sm rounded-sm bg-gray-50 cursor-move hover:bg-gray-100 hover:text-gray-900 hover:border-indigo-500",
        {
          "opacity-50": isDragging,
        }
      )}
    >
      {data.type}
    </div>
  );
}
