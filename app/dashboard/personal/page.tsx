"use client";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
const Personal = () => {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="personal1.1"
            defaultOpenKeys={["personal"]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content></Content>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default Personal;
