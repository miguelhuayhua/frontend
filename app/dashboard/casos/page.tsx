"use client";
import { Layout } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
//estilos
import "./estilos.scss";
//env
import dotenv from "dotenv";
dotenv.config();
import React from "react";

import Informacion from "./components/informacion";
import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
export default function NuevoCaso() {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["caso1"]}
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
