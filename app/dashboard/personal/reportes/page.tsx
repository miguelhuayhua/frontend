"use client";
import { Layout } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
//estilos
//env
import dotenv from "dotenv";
dotenv.config();
import React from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";

export default function Reportes() {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["personal1"]}
            defaultSelectedKey="personal1.3"
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
