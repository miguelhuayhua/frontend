"use client";
import { Layout } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
//estilos
import React from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";

export default function Reportes() {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["adulto1"]}
            defaultSelectedKey="adulto1.3"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>

            <Layout>
              <Content
                className="site-layout"
                style={{ padding: "0 50px", position: "relative" }}
              >
                lugar para los reportes
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
