import { Button, Col, Form, Input, Row, Select, Space, Table, TablePaginationConfig, Tooltip } from "antd";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "/index.module.css"
import Image from "next/image";
import dayjs from "dayjs";
import { getBookList } from "@/api/book";
import { BookQueryType } from "@/types";

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
    width: 200,
  },
  {
    title: "封面",
    dataIndex: "cover",
    key: "cover",
    width: 120,
    render: (text: string)=>{
      return<Image
        width={80}
        src={text}
        alt=""
        />
    }
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
    width: 120,
  },
  {
    title: "分类",
    dataIndex: "category",
    key: "category",
    width: 80,
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 200,
    render: (text: string)=>{
      return <Tooltip title={text} placement={"topLeft"}>
        {text}
      </Tooltip>
    }
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
    width: 80,
  },
  {
    title: "创建时间",
    dataIndex: "creatAt",
    key: "creatAt",
    width: 130,
    render: (text: string) => {
      dayjs(text).format("YYYY-MM-DD");
    },
  },
];

export default function Home() {
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const router = useRouter();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await getBookList({ current: 1, pageSize: pagination.pageSize })
      const { data } = res
      setData(data)
    }

    fetchData()
  }, [])


    const handleSearchFinish = async (values:BookQueryType) => {
      const res =await getBookList(...values, current: 1, pageSize: pagination.pageSize)
      setData(res.data)
      setPagination(...pagination, current: 1, total: res.total)
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
      setPagination(pagination)
      const query = form.getFieldsValue()
      getBookList({
        current: pagination.current,
        pageSize: pagination.pageSize,
        ...query
    })
    };

    const columns = [...COLUMNS,
      {
        title: "操作", key: "action", render: (_: any, row: any) => {
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
                   showTotal: () => `共 ${pagination.total} 条记录`,
                 }}
          />
        </div>
      </>
    );
  }
