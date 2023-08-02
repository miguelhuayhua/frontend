"use client";
import {
  Affix,
  Avatar,
  Card,
  Col,
  Layout,
  List,
  Menu,
  MenuProps,
  Row,
} from "antd";
import { getSession, useSession } from "next-auth/react";
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
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
} from "recharts";

import MenuSider from "./components/MenuSider";
import Navbar from "./components/Navbar";
export default function Dashboard() {
  const data2 = [
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

  const data3 = [
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

  const data4 = [
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

  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];

  const dataTiny = [
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

  const dataList = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="dashboard"
            defaultOpenKeys={[]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <Row>
                    <Col span={24} lg={{ span: 18 }}>
                      <Row>
                        <Col span={8}>
                          <Card
                            title="Card title"
                            bordered={false}
                            className="card-styled"
                          >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            title="Card title"
                            bordered={false}
                            className="card-styled"
                          >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            title="Card title"
                            bordered={false}
                            className="card-styled"
                          >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                          </Card>
                        </Col>

                        <Col span={24}>
                          <Card
                            title="Card title"
                            bordered={false}
                            className="card-styled"
                          >
                            <Row>
                              <Col span={24}>
                                <ResponsiveContainer
                                  width={"100%"}
                                  height={350}
                                >
                                  <LineChart
                                    className="w-100"
                                    data={data2}
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
                                    <Line
                                      type="monotone"
                                      dataKey="uv"
                                      stroke="#82ca9d"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>

                    <Col span={24} lg={{ span: 6 }}>
                      <Card
                        title="Card title"
                        bordered={false}
                        className="card-styled"
                      >
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={data01}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={50}
                              fill="#8884d8"
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <List
                          itemLayout="horizontal"
                          dataSource={dataList}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                  />
                                }
                                title={
                                  <a href="https://ant.design">{item.title}</a>
                                }
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>

                    <Col span={24} lg={{ span: 16 }}>
                      <Card
                        title="Card title"
                        bordered={false}
                        className="card-styled"
                      >
                        <Row>
                          <Col span={8}>
                            <Card
                              title="Card title"
                              bordered={false}
                              className="card-styled"
                            >
                              <p>Card content</p>
                              <p>Card content</p>
                              <p>Card content</p>
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card
                              title="Card title"
                              bordered={false}
                              className="card-styled"
                            >
                              <p>Card content</p>
                              <p>Card content</p>
                              <p>Card content</p>
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card
                              title="Card title"
                              bordered={false}
                              className="card-styled"
                            >
                              <p>Card content</p>
                              <p>Card content</p>
                              <p>Card content</p>
                            </Card>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={24} lg={{ span: 8 }}>
                      <Card
                        title="Card title"
                        bordered={false}
                        className="card-styled"
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={dataList}
                          renderItem={(item, index) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                  />
                                }
                                title={
                                  <a href="https://ant.design">{item.title}</a>
                                }
                                description={
                                  <>
                                    <Row>
                                      <Col span={12}></Col>
                                      <Col span={12}>
                                        <ResponsiveContainer
                                          width="100%"
                                          height={100}
                                        >
                                          <AreaChart
                                            width={200}
                                            height={60}
                                            data={dataTiny}
                                            margin={{
                                              top: 5,
                                              right: 0,
                                              left: 0,
                                              bottom: 5,
                                            }}
                                          >
                                            <defs>
                                              <linearGradient
                                                id="colorUv"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                              >
                                                <stop
                                                  offset="5%"
                                                  stopColor="#129a74"
                                                  stopOpacity={0.1}
                                                />
                                                <stop
                                                  offset="95%"
                                                  stopColor="#FFFFFF"
                                                  stopOpacity={0.1}
                                                />
                                              </linearGradient>
                                            </defs>
                                            <Area
                                              strokeWidth={2}
                                              fillOpacity={1}
                                              fill="url(#colorUv)"
                                              type="linear"
                                              dataKey="uv"
                                              stroke="#8884d8"
                                            />
                                          </AreaChart>
                                        </ResponsiveContainer>
                                      </Col>
                                    </Row>
                                  </>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={data3}
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
                          <Bar dataKey="pv" fill="#8884d8" />
                          <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={data4}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="uv"
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                          <Area
                            type="monotone"
                            dataKey="pv"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                          />
                          <Area
                            type="monotone"
                            dataKey="amt"
                            stackId="1"
                            stroke="#ffc658"
                            fill="#ffc658"
                          />
                        </AreaChart>
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
