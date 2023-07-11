"use client";
import { Affix, Col, Layout, Menu, MenuProps, Row } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
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

import MenuSider from "./components/MenuSider";
import Navbar from "./components/Navbar";
export default function Dashboard() {
  const router = useRouter();

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
        <Layout hasSider>
          <Affix>
            <MenuSider
              defaultSelectedKey="dashboard"
              defaultOpenKeys="null"
            ></MenuSider>
          </Affix>
          <Content>
            <Row>
              <Col
                span={23}
                style={{
                  margin: "7.5px auto",
                  borderRadius: 10,
                }}
              >
                <Navbar></Navbar>
              </Col>
            </Row>
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
