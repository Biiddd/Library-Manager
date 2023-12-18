import { Button, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig } from "antd";
import router, { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import styles from "/index.module.css"



const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "封面",
    dataIndex: "cover",
    key: "cover",
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "分类",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "创建时间",
    dataIndex: "creatAt",
    key: "creatAt",
  },
];

export default function Home() {
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
  });
  const handleSearchFinish = (value) => {
    console.log(value);
  };
  const handleSearchReset = () => {
    console.log("重置");
    form.resetFields();
  };

  const handleBookEdit = () => {
    console.log("编辑");
    router.push("/book/edit/id");
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const columns = [...COLUMNS,
    {
      title: "操作", key: "action", render: (:any, row:any) =>
  {
    return <>
      <Button type="link" onClick={handleBookEdit}>编辑</Button>
      <Button type="link" danger>删除</Button>
    </>
  }
}
]

  return (
    <>
      <Form
        name="search"
        form={form}
        layout="inline"
        onFinish={handleSearchFinish}
        initialValues={{ name: " ", author: " ", category: " " }}
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="author" label="作者">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="category" label="分类">
              <Select
                allowClear
                showSearch
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSearchReset}
                >
                  搜索
                </Button>
                <Button htmlType="submit">清空</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
<div className={styles.tableWrap}>
      <Table dataSource={dataSource}
             columns={columns}
             scroll={{ x: 1000 }}
             onChange={handleTableChange}
             pagination={{
               ...pagination,
               total:total,
               showTotal: () => `共 ${pagination.total} 条记录`,
             }}
      />
</div>
    </>

  );
}
