"use client";
import {  Col, Layout, MenuProps, Row } from "antd";
import "moment/locale/es";
import { Content, Footer, Header } from "antd/es/layout/layout";
//estilos
import "./estilos.scss";
//env
import dotenv from "dotenv";
dotenv.config();
import React from "react";

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
            defaultOpenKeys={["caso1"]}
            defaultSelectedKey="caso1.4"
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
