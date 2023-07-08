"use client";
import { Affix, Breadcrumb, Button, Layout, Menu, MenuProps, Tabs } from "antd";
import "moment/locale/es";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
import Formulario from "./components/formulario";
import Detalles from "./components/detalles";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
//env
import dotenv from "dotenv";
dotenv.config();
import React from "react";
import {
  AdultoMayor,
  DatosDenuncia,
  DatosDenunciado,
  DatosUbicacion,
  dataDatosDenuncia,
  dataDatosDenunciado,
  dataDatosGenerales,
  dataDatosUbicacion,
} from "./data";
type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
export default function NuevoCaso() {
  const [datos, setDatos] = useState<{
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    datosDenunciado: DatosDenunciado;
    descripcionHechos: string;
    descripcionPeticion: string;
    accionRealizada: string;
    datosDenuncia: DatosDenuncia;
  }>({
    datosGenerales: dataDatosGenerales,
    datosDenunciado: dataDatosDenunciado,
    datosUbicacion: dataDatosUbicacion,
    accionRealizada: "Apertura",
    descripcionHechos: "",
    descripcionPeticion: "",
    datosDenuncia: dataDatosDenuncia,
  });
  const [posicion, setPosicion] = useState(0);
  const getDatos = (data: {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    datosDenunciado: DatosDenunciado;
    descripcionHechos: string;
    descripcionPeticion: string;
    accionRealizada: string;
    datosDenuncia: DatosDenuncia;
  }) => {
    setDatos(data);
  };
  const getPosicion = (posicion: number) => {
    setPosicion(posicion);
  };
  const router = useRouter();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  return (
    <main>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
        <Layout hasSider>
          <Affix offsetTop={64}>
            <Sider
              breakpoint="md"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
              defaultCollapsed={true}
              style={{
                overflow: "auto",
                height: "100vh",
                width: 200,
                position: "sticky",
                left: 0,
                top: 65,
              }}
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: "white",
                  position: "absolute",

                  right: 0,
                  bottom: "4em",
                }}
              />
            </Sider>
          </Affix>
          <Content>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <div className={posicion == 0 ? "mostrar" : "ocultar"}>
                    <Formulario
                      getPosicion={getPosicion}
                      getDatos={getDatos}
                    ></Formulario>
                  </div>

                  <div className={posicion == 1 ? "mostrar" : "ocultar"}>
                    <Detalles
                      getPosicion={getPosicion}
                      datos={datos}
                      router={router}
                    ></Detalles>
                  </div>
                </Content>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
