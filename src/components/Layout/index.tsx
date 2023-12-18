import React, { ReactNode } from "react";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout as AntdLayout, Menu, Dropdown, Space } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./index.module.css";

const { Header, Content, Footer, Sider } = AntdLayout;

const ITEM = [
  {
    // icon: React.createElement(icon),
    label: "图书管理",
    key: "book",

    children: [
      { label: "图书列表", key: "book" },
      { label: "图书添加", key: "/book/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "借阅管理",
    key: "borrow",

    children: [
      { label: "借阅列表", key: "user" },
      { label: "借阅添加", key: "/borrow/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "分类管理",
    key: "category",

    children: [
      { label: "分类列表", key: "category" },
      { label: "分类添加", key: "/category/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "用户管理",
    key: "user",

    children: [
      { label: "用户列表", key: "user" },
      { label: "用户添加", key: "/user/add" },
    ],
  },
];

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  return (
    <AntdLayout>
      <Header className={styles.header}>
        <Image
          src="/actual.svg"
          width={30}
          height={30}
          alt=" "
          className={styles.logo}
        />
        图书管理系统
        <span className={styles.user}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                用户名
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
      <AntdLayout className={styles.sectionInner}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/book"]}
            defaultOpenKeys={["book"]}
            style={{ height: "100%" }}
            items={ITEM}
            onClick={handleMenuClick}
          />
        </Sider>
        <AntdLayout className={styles.sectionContent}>
          <Content className={styles.content}>{children}</Content>
        </AntdLayout>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </AntdLayout>
    </AntdLayout>
  );
}
