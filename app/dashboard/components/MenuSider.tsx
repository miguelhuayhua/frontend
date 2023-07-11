"use client";
import { Button, Menu, MenuProps } from "antd";
import "moment/locale/es";
import { useRouter } from "next/navigation";
//estilos
import React, { useState } from "react";

interface Props {
  defaultOpenKeys: string;
  defaultSelectedKey: string;
}

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  BankOutlined,
  EyeOutlined,
  PlusOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import "./estilos.scss";
import { NextPage } from "next";
import Sider from "antd/es/layout/Sider";
const MenuSider: NextPage<Props> = (props) => {
  const router = useRouter();
  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <BarChartOutlined />,
      onClick: () => {
        router.push("/dashboard");
      },
    },
    {
      key: "caso1",
      label: "Casos",
      icon: <BankOutlined />,
      children: [
        {
          label: "Agregar Caso",
          key: "caso1.1",
          icon: <PlusOutlined />,
          onClick: () => {
            router.push("/dashboard/nuevocaso");
          },
        },
        {
          label: "Ver Casos",
          key: "caso1.2",
          icon: <EyeOutlined />,
          onClick: () => {
            router.push("/dashboard/casos");
          },
        },
      ],
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sider
        breakpoint="md"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        defaultCollapsed={true}
        style={{
          overflow: "auto",
          height: "100vh",
          width: 200,
          position: "sticky",
          left: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[props.defaultSelectedKey]}
          mode="inline"
          defaultOpenKeys={[props.defaultOpenKeys]}
          items={items}
        />
      </Sider>
    </>
  );
};

export default MenuSider;
