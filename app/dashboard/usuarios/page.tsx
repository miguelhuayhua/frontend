"use client";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Informacion from "./components/informacion";
const Usuarios = () => {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="usuario1.2"
            defaultOpenKeys={["usuario1"]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content style={{ padding: "0 50px" }}>
                <Informacion></Informacion>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default Usuarios;
