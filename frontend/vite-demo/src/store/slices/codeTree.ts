import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import { traverse, traverseUp } from "@/utils/index";
import { FieldNode } from "@/pages/Editor/schema/types";
import { isParentNode } from "@/pages/Editor/schema/utils";

export interface FieldNodeSchema extends FieldNode {
  id: string;
  props: Record<string, any>;
  children: FieldNodeSchema[];
}

export interface State extends FieldNodeSchema {
  focusId?: string;
}

const initialState: State = {
  props: {},
  id: "root",
  type: "div",
  children: [],
};

export const codeTreeSlice = createSlice({
  name: "codeTree",
  initialState,
  reducers: {
    append: (state, action) => {
      const focusId = uuid();
      state.focusId = focusId;
      state.children.push({
        ...action.payload,
        id: focusId,
      });
    },
    appendCom: (state, action) => {
      const { data, item, hoverParentId, hoverIndex, positionDown } =
        action.payload;

      const focusId = uuid();
      // 递归查找父级节点
      traverse(state, (sub) => {
        //非嵌套标签往父层插入，目前只有div、form、grid、form.item支持嵌套
        // 不是嵌套标签，并且找到了对应的父节点
        if (!isParentNode(data.type) && sub.id === hoverParentId) {
          // 插入位置在当前索引前还是后
          if (positionDown) {
            sub.children.splice(hoverIndex + 1, 0, { ...item, id: focusId });
          } else {
            sub.children.splice(hoverIndex, 0, { ...item, id: focusId });
          }
          return false;
        }
        // 如果是嵌套标签并且找到了对应的父节点
        if (isParentNode(data.type) && sub.id === data.id) {
          if (sub.children && sub.children.length > 0) {
            sub.children.push({
              ...item,
              id: focusId,
            });
          } else {
            sub.children = [{ ...item, id: focusId }];
          }

          return false;
        }
        return true;
      });
      state.focusId = focusId;
    },
    moveCom: (state, action) => {
      console.log("action", state, action);

      const {
        data: hoverData,
        item: dragData,
        hoverParentId: hId,
        hoverIndex: hIndex,
        dragParentId,
        dragIndex,
        positionDown,
      } = action.payload;
      // 如果拖拽的元素和悬停的元素相同，则不进行任何操作
      if (hoverData.id === dragData.id) return state;
      //在子节点中不拖拽
      let hoverInDragData = false;

      traverse(dragData, (sub) => {
        if (sub.id === hoverData.id) {
          hoverInDragData = true;
          return false;
        }
        return true;
      });
      // 如果悬停的元素在拖拽的元素中，不进行任何操作
      if (hoverInDragData) return state;

      const focusId = uuid();
      // 从原来的位置删除拖拽的元素
      traverse(state, (sub) => {
        if (sub.id === dragParentId) {
          sub.children.splice(dragIndex, 1);
          return false;
        }
        return true;
      });
      // 拖拽的元素插入新的位置
      traverse(state, (sub) => {
        if (!isParentNode(hoverData.type) && sub.id === hId) {
          if (positionDown) {
            sub.children.splice(hIndex + 1, 0, { ...dragData, id: focusId });
          } else {
            sub.children.splice(hIndex, 0, { ...dragData, id: focusId });
          }
          return false;
        }
        //非嵌套标签往父层插入，顶层元素
        if (isParentNode(hoverData.type) && sub.id === hoverData.id) {
          if (sub.children) {
            sub.children.push({
              ...dragData,
              id: focusId,
            });
          } else {
            sub.children = [{ ...dragData, id: focusId }];
          }
          return false;
        }
        return true;
      });

      state.focusId = focusId;
    },
    setFocus: (state, action) => {
      const { focusId } = action.payload;
      state.focusId = focusId;
    },
    removeCom: (state, action) => {
      const { id, parentId } = action.payload;
      traverse(state, (sub) => {
        if (sub.id === parentId) {
          sub.children = sub.children.filter((child) => child.id !== id);
          return false;
        }
        return true;
      });
    },
    updateTree: (state, action) => {
      const { focusId } = state;
      const { key, value } = action.payload;
      traverse(state, (sub) => {
        if (sub.id === focusId) {
          sub.props[key] = value;
          return false;
        }
        return true;
      });
    },
  },
});

export const { append, appendCom, moveCom, setFocus, removeCom, updateTree } =
  codeTreeSlice.actions;

export default codeTreeSlice.reducer;
