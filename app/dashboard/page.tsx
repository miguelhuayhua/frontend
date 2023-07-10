"use client";
import {
  Affix,
  Breadcrumb,
  Button,
  Col,
  Layout,
  Menu,
  MenuProps,
  Row,
  Tabs,
} from "antd";
import "moment/locale/es";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuSider from "./components/MenuSider";
import Navbar from "./components/Navbar";
export default function Dashboard() {
  const router = useRouter();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    url?: string,
    children?: MenuItem[]
  ): MenuItem {
    return {
      onClick: () => {
        router.push(url!);
      },
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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main>
      <Layout>
        <Navbar></Navbar>
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
              <MenuSider
                defaultOpenKeys="null"
                defaultSelectedKey="dashboard"
              ></MenuSider>
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
                  <Row>
                    <Col span={24} md={{ span: 12 }}>
                      <ResponsiveContainer width={"100%"} height={500}>
                        <LineChart
                          className="w-100"
                          data={data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </Col>
                  </Row>
                </Content>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
