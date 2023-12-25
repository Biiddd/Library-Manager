import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { calc } from "antd/es/theme/internal";
import Image from "next/image";
import { bookAdd } from "@/api/book";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function BootFOrm() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [preview, setPreview] = useState();
  const [form] = Form.useForm();

  const handleFinish = (values : any) => {
    bookAdd(values)
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入名称",
            },
          ]}
        >
          <Input placeholder={"请输入"} />
        </Form.Item>
        <Form.Item
          label="作者"
          name="author"
          rules={[
            {
              required: true,
              message: "请输入作者",
            },
          ]}
        >
          <Input placeholder={"请输入"} />
          <Input />
        </Form.Item>
        <Form.Item
          label="分类"
          name={"category"}
          rules={[
            {
              required: true,
              message: "请选择分类",
            },
          ]}
        >
          <Input placeholder={"请选择"} />
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="封面" name={"cover"}>
          <Input.Group>
            <Input
              placeholder={"请输入"}
              style={{ width: "calc(100%-100px)" }}
              onChange={(e) => {
                form.setPreviewValue("cover", e.target.value);
              }}
            />
            <Button
              type={"primary"}
              onClick={(e) => {
                setPreview(form.getFieldsValue().cover);
              }}
            >
              预览
            </Button>
          </Input.Group>
          <Input />
        </Form.Item>

        {preview && (
          <Form.Item label={" "} colon={false}>
            <Image src={preview} width={100} height={100} alt={"无封面"}/>
          </Form.Item>
        )}

        <Form.Item label="出版日期" name={"publishAt"}>
          <Input placeholder={"请选择"} />
          <DatePicker />
        </Form.Item>

        <Form.Item label="库存" name={"stock"}>
          <Input placeholder={"请输入"} />
          <InputNumber />
        </Form.Item>

        <Form.Item label="描述" name={"description"}>
          <Input placeholder={"请输入"} />
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="创建">
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </>
  );
}
