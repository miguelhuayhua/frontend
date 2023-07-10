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
import Navbar from "../components/Navbar";
import MenuSider from "../components/MenuSider";
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

  const [collapsed, setCollapsed] = useState(false);
  return (
    <main>
      <Layout>
        <Navbar></Navbar>
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
              <MenuSider
                defaultOpenKeys="caso1"
                defaultSelectedKey="caso1.1"
              ></MenuSider>
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
