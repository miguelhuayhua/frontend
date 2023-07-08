"use client";
import {
  Affix,
  AutoComplete,
  Breadcrumb,
  Button,
  Input,
  Layout,
  Menu,
  MenuProps,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
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
  DesktopOutlined,
  FileOutlined,
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
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);

  //cargado de casos desde la API
 
  return (
    <main>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
        <Layout hasSider>
          <Affix offsetTop={64}>
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
                top: 65,
              }}
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: "white",
                  position: "absolute",

                  right: 0,
                  bottom: "4em",
                }}
              />
            </Sider>
          </Affix>
          <Content>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <Informacion></Informacion>
                </Content>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
