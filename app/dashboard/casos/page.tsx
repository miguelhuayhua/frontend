"use client";
import { Affix, Button, Col, Layout, MenuProps, Row } from "antd";
import "moment/locale/es";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
import { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
//env
import dotenv from "dotenv";
dotenv.config();
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import Informacion from "./components/informacion";
import { Caso } from "./data";
import axios from "axios";
import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
export default function NuevoCaso() {
  const router = useRouter();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    {
      key: 1,
      label: "Casos",
      children: [
        {
          label: "Agregar Caso",
          key: 1.1,
          icon: <UserOutlined />,
          onClick: () => {
            router.push("/dashboard/nuevocaso");
          },
        },
        {
          label: "Ver Casos",
          key: 1.2,
          icon: <UserOutlined />,
          onClick: () => {
            router.push("/dashboard/casos");
          },
        },
      ],
    },
  ];
  const [collapsed, setCollapsed] = useState(false);

  //cargado de casos desde la API

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys="caso1"
            defaultSelectedKey="caso1.2"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>

            <Layout>
              <Content
                className="site-layout"
                style={{ padding: "0 50px", position: "relative" }}
              >
                <Informacion></Informacion>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
