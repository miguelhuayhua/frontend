"use client";
import { Affix, Button, Col, Layout, MenuProps, Row } from "antd";
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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import Informacion from "./components/informacion";
export default function NuevoCaso() {
  //cargado de casos desde la API

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["adultos1"]}
            defaultSelectedKey="adultos1.2"
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
