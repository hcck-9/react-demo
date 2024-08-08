import React, { ReactElement, useState } from "react";
import { message, Modal, Input } from "antd";
import { useForm } from "react-hook-form";
import { useAsyncFn } from "react-use";
import cl from "classnames";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { State } from "@/store/slices/codeTree";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

interface Props {}

export interface ComponentData {
  name: string;
  code: string;
  data?: string;
}

export default function SaveBtn({}: Props): ReactElement {
  const [visible, setVisible] = useState(false);
  const codeTreeState = useSelector<RootState>(
    (state) => state.codeTree
  ) as State;

  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "组件",
      code: "Component",
    },
  });

  const navigate = useNavigate();
  const [state, doFetch] = useAsyncFn(async (data) => {
    const res = await axios.post("/api/component", {
      ...data,
      data: JSON.stringify(codeTreeState),
    });
    return res.data;
  }, []);

  const onSubmit = async (data: ComponentData) => {
    const res = await doFetch(data);
    if (res.success) {
      messageApi.success("保存成功！");
      // router.push("/component");
      navigate("/account");
    }
  };
  return (
    <>
      {contextHolder}
      <button onClick={() => setVisible(true)} className="btn btn-primary ml-2">
        save
      </button>
      <Modal
        footer={false}
        onCancel={() => setVisible(false)}
        title="组件"
        open={visible}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-5 text-gray-700">
              名称
            </label>
            <div className="mt-1">
              <Input name="name" type="text" value="editor" />
            </div>
          </div>
          {errors.name?.type === "required" && (
            <div className="mt-1 text-red-600">name is required</div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Code
            </label>
            <div className="mt-1">
              <Input name="code" type="text" value="component" />
            </div>
          </div>
          {errors.code && (
            <div className="mt-1 text-red-600">Code is required</div>
          )}
          <div className="mt-6">
            <button
              disabled={state.loading}
              type="submit"
              className={cl("btn w-full btn-primary btn-lg", {
                "opacity-50": state.loading,
              })}
            >
              {state.loading ? "loading" : "提交"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
