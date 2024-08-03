import React from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useSelector, useDispatch } from "react-redux";
import {
  append,
  moveCom,
  FieldNodeSchema,
  State,
} from "@/store/slices/codeTree";
import { theme } from "antd";
import "@/common/layout/editor/canvas.scss";
import { CRAD } from "../ItemTypes";
import { useDrop } from "react-dnd";
import cl from "classnames";
import Item from "./Item";
import CustomDragLayer from "./CustomDragLayer";
import { AppDispatch, RootState } from "@/store";

interface DragItem {
  type: string;
  data: FieldNodeSchema;
  dragParentId: string;
  dragIndex: number;
}
interface Props {
  mobile: boolean;
}

const { useToken } = theme;

const Canvas = ({ mobile }: Props) => {
  // 获取主题token设置
  const { token } = useToken();

  const state: State = useSelector<RootState>(
    (state) => state.codeTree
  ) as State;
  // console.log("canvas state", state);

  const dispatch = useDispatch<AppDispatch>();
  const [{ canDrop, isOver }, drop] = useDrop<
    DragItem,
    {},
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: CRAD,
    // 当拖拽物在这个拖放区域放下时触发,这个item就是拖拽物的item（拖拽物携带的数据）
    drop: (item, monitor) => {
      console.log("item", item);

      // monitor 记录了拖放区域内拖拽物状态信息
      // didDrop()	如果拖放区域执行drop()操作，返回true
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      // console.log(didDrop, item, monitor);
      if (didDrop) {
        return;
      }
      //没有id 是新增,有id是移动
      if (!item.data.id) {
        dispatch(append(item.data));
      } else {
        dispatch(
          moveCom({
            dragParentId: item.dragParentId,
            dragIndex: item.dragIndex,
            // 整个树型结构
            data: state,
            item: item.data,
          })
        );
      }
      return { name: "Dustbin" };
    },
    // 这个函数收集什么，上面的collect对象就返回什么
    collect: (monitor) => ({
      isOver: monitor.isOver({
        shallow: true,
      }),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className="flex-1 p-4 overflow-y-scroll bg-indigo-50">
      <div
        ref={drop}
        style={{ width: mobile ? 375 : "auto" }}
        className={cl(
          "space-y-1 bg-white border-gray-200 border border-solid m-auto min-h-full  transition-all duration-300 relative",
          {
            "p-5": !mobile,
            "p-2": mobile,
          }
        )}
      >
        {state?.children?.map((sub, index) => {
          return (
            <Item parentId={state.id} index={index} data={sub} key={sub.id} />
          );
        })}
        {!state?.children?.length ? (
          <div className="flex items-center justify-center text-gray-200 text-3xl absolute inset-0">
            拖动组件到这里
          </div>
        ) : null}
        {/* 在canvas上面并且可以放置的话 */}
        {isOver && canDrop ? (
          <div className="border-indigo-500 border border-solid my-1" />
        ) : null}
        <CustomDragLayer />
      </div>
    </div>
  );
};

export default Canvas;
