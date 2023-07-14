"use client";
import { Affix, Button, Menu, MenuProps } from "antd";
import "moment/locale/es";
import { useRouter } from "next/navigation";
//estilos
import React, { useState } from "react";

interface Props {
  defaultOpenKeys: string[];
  defaultSelectedKey: string;
}

type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  BankOutlined,
  EyeOutlined,
  PlusOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  UserOutlined,
  TeamOutlined,
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
            router.push("/dashboard/casos/nuevocaso");
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
        {
          label: "Personas Adultas",
          key: "caso1.3",
          icon: <EyeOutlined />,
          onClick: () => {
            router.push("/dashboard/adultos");
          },
          children: [
            {
              label: "Ver Adultos",
              key: "caso1.3.1",
              icon: <EyeOutlined />,
              onClick: () => {
                router.push("/dashboard/adultos");
              },
            },
            {
              label: "Ver Hijos",
              key: "caso1.3.2",
              icon: <EyeOutlined />,
              onClick: () => {
                router.push("/dashboard/hijos");
              },
            },
          ],
        },
        {
          label: "Ver Denunciados",
          key: "caso1.4",
          icon: <EyeOutlined />,
          onClick: () => {
            router.push("/dashboard/denunciados");
          },
        },
      ],
    },
    {
      key: "personal",
      label: "Personal",
      icon: <TeamOutlined />,
      children: [
        {
          label: "Registrar Personal",
          key: "personal1.1",
          icon: <UsergroupAddOutlined />,
          onClick: () => {
            router.push("/dashboard/agregarpersonal");
          },
        },
        {
          label: "Ver Personal",
          key: "personal1.2",
          icon: <EyeOutlined />,
          onClick: () => {
            router.push("/dashboard/personal");
          },
        },
        {
          label: "Usuarios",
          key: "usuarios",
          icon: <UserOutlined />,
          children: [
            {
              label: "Registrar Usuario",
              key: "usuario1.1",
              icon: <UserAddOutlined />,
              onClick: () => {
                router.push("/dashboard/agregarusuario");
              },
            },
            {
              label: "Ver Usuarios",
              key: "usuario1.2",
              icon: <EyeOutlined />,
              onClick: () => {
                router.push("/dashboard/usuarios");
              },
            },
          ],
        },
      ],
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Affix>
        <Sider
          breakpoint="md"
          collapsible
          width={250}
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
            defaultOpenKeys={props.defaultOpenKeys}
            items={items}
          />
        </Sider>
      </Affix>
    </>
  );
};

export default MenuSider;
