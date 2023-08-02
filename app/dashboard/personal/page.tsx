"use client";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import Informacion from "./components/informacion";
const Personal = () => {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="personal1.2"
            defaultOpenKeys={["personal"]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content style={{ padding: "0 50px" }}>
                <Informacion></Informacion>{" "}
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default Personal;
