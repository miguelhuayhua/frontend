"use client";
import { Button, Col, Input, Layout, List, Modal, Row, Select, Space, Tooltip, notification } from "antd";
import { Content } from "antd/es/layout/layout";
//estilos
//env
import { useEffect, useState } from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";
import './estilos.scss';
//iconos

import { AiFillCalendar, AiFillFilePdf } from 'react-icons/ai';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { MdWork, MdElderly } from 'react-icons/md';
import { Persona, dataPersona } from "../../personal/agregar/data";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Caso, Denunciado } from "../data";
import { AdultoMayor2, dataDatosGenerales } from "../nuevocaso/data";
import ReporteCaso from "./reporte";
import { dataDenunciado } from "../../denunciados/data";
import { Hijo } from "../../hijos/data";
import Link from "next/link";
import { pdf } from "@react-pdf/renderer";
import dayjs from "dayjs";

export default function Reportes() {
  //open
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  //cargado de datos desde la API
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [denunciado, setDenunciado] = useState<Denunciado>(dataDenunciado);
  //cargado de datos desde la API
  const { data } = useSession();
  const [casos, setCasos] = useState<Caso[]>([]);
  const [displayCasos, setDisplayCasos] = useState<Caso[]>([]);
  const [adultoMayor, setAdultoMayor] =
    useState<AdultoMayor2>(dataDatosGenerales);
  const [adultos, setAdultos] = useState<AdultoMayor2[]>([]);
  //filtros
  const [filtros, setFiltros] = useState({ nombres_apellidos: "", accionRealizada: "", tipologia: "", nro_caso: "", year_caso: "" });
  useEffect(() => {
    if (data) {
      let { persona } = data?.user as {
        persona: Persona;
      };

      setPersona(persona);
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
                <h1 className="text-center mt-4">REPORTES - CASOS</h1>
                <Row className="mt-5">
                  <Col span={24}>
                    <h3 className="text-center my-2 my-sm-4" style={{ fontSize: "1.75em" }}>Seleccione los filtros</h3>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 4 }}>
                    <Button onClick={() => {
                      setOpen1(true)
                    }} className="filter-button g-1" icon={<AiFillCalendar className="icon" />}>Por N° de Caso
                    </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 0 }} lg={{ span: 8 }}>
                    <Button onClick={() => {
                      setOpen2(true)
                    }} className="filter-button g-2" icon={<VscTypeHierarchy className="icon" />}>Por Tipología
                    </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 2 }} lg={{ span: 8, offset: 4 }}>
                    <Button onClick={() => {
                      setOpen3(true)
                    }} className="filter-button g-3" icon={<MdWork className="icon" />}>Por Acción Realizada </Button>
                  </Col>
                  <Col span={20} offset={2} md={{ span: 10, offset: 0 }} lg={{ span: 8 }}>
                    <Button onClick={() => {
                      setOpen4(true)
                    }} className="filter-button g-4" icon={<MdElderly className="icon" />}>Por Adulto Involucrado </Button>
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col span={24} sm={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }}>
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
                                <Button style={{ width: 40, height: 40 }} icon={<AiFillFilePdf color="#A00" fontSize={25} />} onClick={() => {
                                  axios
                                    .post<
                                      { adulto: AdultoMayor2, hijos: Hijo[] }
                                    >(process.env.BACKEND_URL + "/adulto/get", {
                                      id_adulto: item.id_adulto,
                                    })
                                    .then((res) => {
                                      setAdultoMayor(res.data.adulto);
                                    });
                                  axios
                                    .post(process.env.BACKEND_URL + "/denunciado/get", {
                                      id_caso: item.id_caso,
                                    })
                                    .then((res) => {
                                      setDenunciado(res.data);
                                      pdf(
                                        <ReporteCaso adulto={adulto!} caso={item} denunciado={res.data} persona={persona} />
                                      )
                                        .toBlob()
                                        .then((blob) => {
                                          notification.success({
                                            message: "¡Guardado y generado con éxito!",
                                          });
                                          const url = URL.createObjectURL(blob);
                                          const link = document.createElement("a");
                                          link.href = url;
                                          let { nro_caso } = item;
                                          link.setAttribute(
                                            "download",
                                            nro_caso +
                                            "-reporte.pdf"
                                          );
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                        });
                                    });
                                }} className="center"></Button>
                              </Tooltip>
                            ]}
                          >
                            <List.Item.Meta
                              title={<Link href={"/dashboard/casos/accion?id_caso=" + item.id_caso}>{item.nro_caso}</Link>}
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
      <Modal okText="Filtrar" cancelText="Cancelar" title="Especifique el caso: N°/AÑO" open={open1} onOk={() => {
        setDisplayCasos(casos.filter(value => {
          let [nro_caso, year_caso] = value.nro_caso.split("/");
          return nro_caso.toLowerCase().includes(filtros.nro_caso.toLowerCase()) || year_caso.toLocaleLowerCase().includes(filtros.year_caso.toLocaleLowerCase());
        }));
        setOpen1(false);
      }} onCancel={() => {
        setOpen1(false);
      }}>
        <Space.Compact>
          <Select defaultValue={dayjs().year()} options={[{ label: 2023, value: 2023 },
          { label: 2024, value: 2024 },
          { label: 2025, value: 2025 },
          { label: 2026, value: 2026 },
          { label: 2027, value: 2027 },
          { label: 2028, value: 2028 }
          ]}
            onChange={(ev) => {
              setFiltros({ accionRealizada: "", nombres_apellidos: "", tipologia: "", nro_caso: filtros.nro_caso, year_caso: ev.toString() })
            }}
          />
          <Input
            placeholder="Nro. de caso"
            value={filtros.nro_caso}
            onChange={(ev) => {
              setFiltros({ accionRealizada: "", nombres_apellidos: "", tipologia: "", nro_caso: ev.target.value, year_caso: filtros.year_caso })
            }}
          />
        </Space.Compact>
      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Seleccione la tipología" open={open2} onOk={() => {
        setDisplayCasos(casos.filter(value => {
          return value.tipologia == filtros.tipologia;
        }))
        setOpen2(false);
      }} onCancel={() => {
        setOpen2(false)
      }}>
        <Select
          style={{ width: "100%" }}
          value={filtros.tipologia}
          onChange={(value) => {
            setFiltros({ accionRealizada: "", nombres_apellidos: "", nro_caso: "", tipologia: value, year_caso: "" })
          }}
        >
          <Select.Option value="Extravio">Extravío</Select.Option>
          <Select.Option value="Maltrato">Maltrato</Select.Option>
          <Select.Option value="Abandono">Abandono</Select.Option>
          <Select.Option value="Despojo">Despojo</Select.Option>
          <Select.Option value="Orientacion Legal">
            Orientación Legal
          </Select.Option>
          <Select.Option value="Desaparecidos">
            Desaparecidos
          </Select.Option>
          <Select.Option value="Desapoderamiento">
            Desapoderamiento
          </Select.Option>
          <Select.Option value="Gestion Derechos">
            Gestión de derechos
          </Select.Option>
        </Select>
      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Seleccione la acción realizada" open={open3} onOk={() => {
        setDisplayCasos(casos.filter(value => {
          return value.accion_realizada == filtros.accionRealizada;
        }))
        setOpen3(false);
      }} onCancel={() => {
        setOpen3(false)
      }}>
        <Select
          onChange={(value) => {
            setFiltros({ accionRealizada: value, nombres_apellidos: "", nro_caso: "", tipologia: "", year_caso: "" })
          }}
          style={{ width: "100%" }}
        >
          <Select.Option value="Apertura">
            Apertura de Caso
          </Select.Option>
          <Select.Option value="Orientacion">
            Orientación
          </Select.Option>
          <Select.Option value="Citacion">Citación</Select.Option>
          <Select.Option value="Derivacion">
            Derivación
          </Select.Option>
        </Select>
      </Modal>
      <Modal okText="Filtrar" cancelText="Cancelar" title="Basic Modal" open={open4} onOk={() => {
        if (filtros.nombres_apellidos == "") {
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
              .includes(filtros.nombres_apellidos.toLowerCase());
          });
          setDisplayCasos(
            casos.filter((caso) => {
              return adulto.some(
                (value) => value.id_adulto == caso.id_adulto
              );
            })
          );
          setOpen4(false);
        }
      }} onCancel={() => {
        setOpen4(false)
      }}>
        <Input
          placeholder="Adulto Implicado"
          value={filtros.nombres_apellidos}
          onChange={(ev) => {
            setFiltros({ accionRealizada: "", tipologia: "", nro_caso: "", nombres_apellidos: ev.target.value, year_caso: "" })
          }}
        />
      </Modal>

    </main >
  );
}
