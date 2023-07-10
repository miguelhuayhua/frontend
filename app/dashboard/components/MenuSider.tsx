"use client";
import { Menu, MenuProps } from "antd";
import "moment/locale/es";
import { useRouter } from "next/navigation";
//estilos
import React from "react";

interface Props {
  defaultOpenKeys: string;
  defaultSelectedKey: string;
}

type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  BankOutlined,
  EyeOutlined,
  PlusOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { NextPage } from "next";
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

  return (
    <>
      <Menu
        theme="dark"
        selectedKeys={[props.defaultSelectedKey]}
        mode="inline"
        defaultOpenKeys={[props.defaultOpenKeys]}
        items={items}
      />
    </>
  );
};

export default MenuSider;
