"use client";
import { Breadcrumb, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import Informacion from "./components/informacion";
import Link from "next/link";
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
            <Breadcrumb
              separator={<b style={{ fontSize: 18 }}>/</b>}
              className="mx-4 my-2"
              items={[
                {
                  href: "/dashboard",
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard/usuarios"}
                    >
                      Usuarios
                    </Link>
                  ),
                },
              ]}
            />
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
