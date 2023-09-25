"use client";
import { Button, Card, Col, DatePicker, Form, Input, Layout, List, Modal, Row, Skeleton, Tooltip } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import isBeetwen from "dayjs/plugin/isBetween";
import { Content } from "antd/es/layout/layout";
//estilos
//env
import React, { useEffect, useState } from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";
import './estilos.scss';
//iconos

import { AiFillCalendar, AiFillFilePdf } from 'react-icons/ai';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { MdWork, MdElderly } from 'react-icons/md';
import { Persona, dataPersona } from "../../personal/agregar/data";
import { Usuario, dataUsuario } from "../../usuarios/data";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Caso, datosCaso } from "../data";
import { AdultoMayor2, dataDatosGenerales, dias, meses } from "../nuevocaso/data";
import dayjs from "dayjs";
import { now } from "moment";
export default function Reportes() {
  //open
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  //cargado de datos desde la API
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  //cargado de datos desde la API
  const { data } = useSession();
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [casos, setCasos] = useState<Caso[]>([]);
  const [displayCasos, setDisplayCasos] = useState<Caso[]>([]);
  const [adultoMayor, setAdultoMayor] =
    useState<AdultoMayor2>(dataDatosGenerales);
  const [adultos, setAdultos] = useState<AdultoMayor2[]>([]);
  const [displayAdultos, setDisplayAdultos] = useState<AdultoMayor2[]>([]);
  //RANGEPICKER
  const { RangePicker } = DatePicker;
  //filtros
  const [filtros, setFiltros] = useState({ nombres_apellidos: "", accionRealizada: "", tipologia: "" });
  useEffect(() => {
    if (data) {
      let { usuario, persona } = data?.user as {
        usuario: {
          usuario: string;
          estado: number;
          fotografia: string;
          id_persona: string;
          id_usuario: string;
        };
        persona: Persona;
      };

      setPersona(persona);
      setUsuario({ ...usuario, password: "", ult_modificacion: "" })
      axios.get<Caso[]>(process.env.BACKEND_URL + "/caso/all").then((res) => {
        setCasos(res.data);
        setDisplayCasos(res.data);
      });
      axios
        .get<AdultoMayor2[]>(process.env.BACKEND_URL + "/adulto/all")
        .then((res) => {
          setAdultos(res.data);
        });
    }
  }, [data]);


  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["caso1"]}
            defaultSelectedKey="caso1.5"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content
                className="site-layout"
                style={{ padding: "0 50px", position: "relative" }}
              >

                <Row className="mt-5">
                  <Col span={24}>
                    <h1 className="text-center my-sm-4" style={{ fontSize: "1.75em" }}>Seleccione los filtros</h1>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 4 }}>
                    <Button onClick={() => {
                      setOpen1(true)
                    }} className="filter-button g-1" icon={<AiFillCalendar className="icon" />}>Por N° de Caso </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 0 }} lg={{ span: 8 }}>
                    <Button onClick={() => {
                      setOpen2(true)
                    }} className="filter-button g-2" icon={<VscTypeHierarchy className="icon" />}>Por Tipología </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 4 }}>                    <Button onClick={() => {
                    setOpen3(true)
                  }} className="filter-button g-3" icon={<MdWork className="icon" />}>Por Acción Realizada </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 0 }} lg={{ span: 8 }}>                    <Button onClick={() => {
                    setOpen4(true)
                  }} className="filter-button g-4" icon={<MdElderly className="icon" />}> <p style={{ flexWrap: 'wrap' }}>Por Adulto Involucrado</p> </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h2 className="text-center mt-5 h4">Listado de casos</h2>
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      pagination={{ defaultPageSize: 5, position: 'bottom', align: 'center' }}
                      dataSource={displayCasos}
                      rowKey={(item) => {
                        return item.id_caso + "l"
                      }}
                      renderItem={(item) => {
                        let adulto = adultos.find(value => value.id_adulto == item.id_adulto)
                        return (
                          <List.Item
                            actions={[
                              <Tooltip key={item.id_caso + "tool"} title="Generar Reporte">
                                <Button icon={<AiFillFilePdf color="#A00" />} className="center"></Button>
                              </Tooltip>
                            ]}
                          >
                            <List.Item.Meta
                              title={<a href="https://ant.design">{item.nro_caso}</a>}
                              description={`${adulto?.nombre} ${adulto?.paterno} ${adulto?.materno}`}
                            />
                          </List.Item>
                        )
                      }}
                    />
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout >
      <Modal okText="Filtrar" cancelText="Cancelar" title="Seleccione un rango" open={open1} onOk={() => {

      }} onCancel={() => {
        setOpen1(false)
      }}>
        <Input
          placeholder="Adulto Implicado"
          value={filtros.nombres_apellidos}
          onChange={(ev) => {

            if (ev.target.value == "") {
              setDisplayCasos(casos);
            } else {
              let adulto = adultos.filter((value) => {
                return (
                  value.nombre +
                  " " +
                  value.paterno +
                  " " +
                  value.materno
                )
                  .toLowerCase()
                  .includes(ev.target.value.toLowerCase());
              });
              setDisplayCasos(
                casos.filter((caso) => {
                  return adulto.some(
                    (value) => value.id_adulto == caso.id_adulto
                  );
                })
              );
            }
          }}
        />

      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Basic Modal" open={open2} onOk={() => {

      }} onCancel={() => {
        setOpen2(false)
      }}>

      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Basic Modal" open={open3} onOk={() => {

      }} onCancel={() => {
        setOpen3(false)
      }}>
      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Basic Modal" open={open4} onOk={() => {

      }} onCancel={() => {
        setOpen4(false)
      }}>
      </Modal>
    </main >
  );
}
