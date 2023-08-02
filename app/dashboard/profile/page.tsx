"use client";
import { Layout } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
import React from "react";
import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";

export default function Profile() {
  const router = useRouter();

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["none"]}
            defaultSelectedKey="none"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content
                className="site-layout"
                style={{ padding: "0 20px" }}
              ></Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
