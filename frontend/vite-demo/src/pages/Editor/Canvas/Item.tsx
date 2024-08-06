import React, { useRef, useState } from "react";
// import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import previewFields from "../schema/preview";
import cl from "classnames";
import {
  appendCom,
  moveCom,
  setFocus,
  removeCom,
  FieldNodeSchema,
  State,
} from "@/store/slices/codeTree";
import { CRAD } from "../ItemTypes";
import { isParentNode } from "../schema/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface Props {
  data: FieldNodeSchema;
  parentId: string;
  index: number;
}

interface DragData {
  data: FieldNodeSchema;
  dragIndex: number;
  dragParentId: string;
}

interface CollectedProps {
  canDrop: boolean;
  isOver: boolean;
}

export default function Item({ data, parentId, index }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [positionDown, setPosition] = useState(true);

  const state = useSelector<RootState>((state) => state.codeTree) as State;
  const dispatch = useDispatch();
  const [{ canDrop, isOver }, drop] = useDrop<DragData, {}, CollectedProps>(
    () => ({
      accept: CRAD,
      drop: (item, monitor) => {
        if (monitor.didDrop()) {
          return;
        }
        //没有id 是新增,有id是移动
        if (!item.data.id) {
          dispatch(
            appendCom({
              hoverParentId: parentId,
              hoverIndex: index,
              data,
              item: item.data,
              positionDown,
            })
          );
        } else {
          dispatch(
            moveCom({
              hoverParentId: parentId,
              hoverIndex: index,
              dragParentId: item.dragParentId,
              dragIndex: item.dragIndex,
              data,
              item: item.data,
              positionDown,
            })
          );
        }

        return undefined;
      },
      hover: (item, monitor) => {
        // 定义了当拖拽项悬停在该组件上时的行为，主要用于设置 positionDown，以决定插入位置。
        // 只检查被hover的最小元素
        const didHover = monitor.isOver({ shallow: true });
        if (didHover && ref.current) {
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          // Determine mouse position

          const clientOffset = monitor.getClientOffset();
          //const dragOffset = monitor.getSourceClientOffset()

          if (clientOffset) {
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards

            if (hoverClientY <= hoverMiddleY) {
              setPosition(false);
            }
            // Dragging upwards
            if (hoverClientY > hoverMiddleY) {
              setPosition(true);
            }
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({
          shallow: true,
        }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [data, parentId, positionDown, index]
  );

  const [{ isDragging }, drag, connectDragPreview] = useDrag(() => {
    const dragData: DragData = {
      data,
      dragIndex: index,
      dragParentId: parentId,
    };
    return {
      type: CRAD,
      item: dragData,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    };
  }, [data, index, parentId]);

  connectDragPreview(getEmptyImage());
  drag(drop(ref));

  const CurrentTag = previewFields[data.type] as any;

  const handleFocus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(
      setFocus({
        focusId: data.id,
      })
    );
  };
  const handleRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(
      removeCom({
        parentId,
        id: data.id,
      })
    );
  };
  const current = <CurrentTag {...data.props} />;

  // 这是当前聚焦的元素的classname
  const className = cl(
    "min-h-7.5 p-1 border m-y-1 border-blue border-dashed relative",
    {
      "border-opacity-2": isDragging,
      "outline-solid outline-#4f46e5 border-opacity-1 border-0":
        state.focusId === data.id,
      "inline-block": ["a", "span", "button", "b", "i"].includes(
        current.type.name
      ),
    }
  );

  const action = (
    <span
      onClick={handleRemove}
      className="px-2 py-1 text-white bg-indigo-600 opacity-75 absolute right-0 top-0 z-10 cursor-pointer"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </span>
  );

  const renderChildren = (data: any) => {
    if (!isParentNode(data.type)) {
      return data.props.children;
    }
    return (
      data.children &&
      data.children.map((sub: any, index: number) => (
        <Item parentId={data.id} index={index} data={sub} key={sub.id} />
      ))
    );
  };

  const upAndDownItem = (
    <>
      {state.focusId === data.id && action}
      {/* 上面的是这个 */}
      {isOver && canDrop && !positionDown ? (
        <div className="border-indigo-600 border border-solid" />
      ) : null}
      {/* 渲染当前元素的标签，传入所有属性 */}
      {/* 如果不是父节点，直接渲染其子节点 */}
      {/* 如果是父节点，则递归渲染其子节点 */}
      {data.type !== "div" ? (
        <CurrentTag {...data.props}>{renderChildren(data)}</CurrentTag>
      ) : (
        renderChildren(data)
      )}
      {isOver && canDrop && positionDown ? (
        <div className="border-red-600 border border-solid" />
      ) : null}
    </>
  );

  return data.type !== "div" ? (
    <div onClick={handleFocus} className={className} ref={ref}>
      {upAndDownItem}
    </div>
  ) : (
    <div
      onClick={handleFocus}
      ref={ref}
      {...data.props}
      className={cl(className, data.props?.className)}
    >
      {upAndDownItem}
    </div>
  );
}
