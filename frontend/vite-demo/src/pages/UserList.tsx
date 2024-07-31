import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { apiRequest } from "@/api";
import { produce } from "immer";

const Setting: React.FC = () => {
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    createAt: Date;
  }

  const handleDelete = (id: React.Key) => {
    setUserList(
      produce(userList, (draft: DataType[]) => {
        const index = draft.findIndex((user) => user.key === id);
        if (index !== -1) draft.splice(index, 1);
      })
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "ID", dataIndex: "key", key: "name" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "CreateAt", dataIndex: "createAt", key: "createAt" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                handleDelete(record.key);
              }}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest({
      url: "/api/getUserList",
      method: "get",
      success: (res: any) => {
        if (res.code === 200) {
          setUserList(res.data);
        }
      },
      done: () => {
        setLoading(false);
      },
    });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.address}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={userList}
        loading={loading}
      />
    </>
  );
};

export default Setting;
