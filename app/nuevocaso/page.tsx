"use client";
import { Affix, Breadcrumb, Layout, Menu, MenuProps, Tabs } from "antd";
import "moment/locale/es";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
//estilos
import "./estilos.scss";
import Formulario from "./components/formulario";
import Detalles from "./components/detalles";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";

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
export default function NuevoCaso() {
  const [datos, setDatos] = useState<{
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    datosDenunciado: DatosDenunciado;
    descripcionHechos: string;
    descripcionPeticion: string;
    accionesRealizadas: string;
    datosDenuncia: DatosDenuncia;
  }>({
    datosGenerales: dataDatosGenerales,
    datosDenunciado: dataDatosDenunciado,
    datosUbicacion: dataDatosUbicacion,
    accionesRealizadas: "",
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
    accionesRealizadas: string;
    datosDenuncia: DatosDenuncia;
  }) => {
    console.log(data);
    setDatos(data);
  };
  const getPosicion = (posicion: number) => {
    setPosicion(posicion);
  };
  const router = useRouter();

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
                theme="light"
                mode="inline"
                items={[{ key: 1, title: "mike" }]}
              />
            </Sider>
          </Affix>
          <Content>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
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
