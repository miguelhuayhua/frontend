"use client";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  FloatButton,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  message,
  notification,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  FilterOutlined,
  FileDoneOutlined,
  FileExcelFilled,
  FilePdfFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import AdultoModal from "./adulto";

import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import { Adulto, Domicilio, dataAdulto, dataDomicilio } from "../data";
import { dias, meses } from "../../casos/nuevocaso/data";
import { Hijo } from "../../hijos/data";
export const DataContext = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  const [domicilios, setDomicilios] = useState<Domicilio[]>([]);

  const [loaded, setLoaded] = useState(false);
  //estados
  const [open, setOpen] = useState(false);
  const [adulto, setAdulto] = useState<Adulto>(dataAdulto);
  const [domicilio, setDomicilio] = useState<Domicilio>(dataDomicilio);
  const [filtroNombre, setFiltroNombre] = useState("");
  const columns: ColumnsType<Adulto> = [
    {
      title: "ID Adulto",
      dataIndex: "id_adulto",
      key: "id_adulto",
      className: "text-center",
      fixed: "left",
      sortDirections: ["ascend", "descend"],
      width: 130,
      sorter: (a, b) => {
        let id1 = Number.parseInt(a.id_adulto.split("-")[1]);
        let id2 = Number.parseInt(b.id_adulto.split("-")[1]);
        return id1 - id2;
      },
    },
    {
      title: "Nombres y Apellidos",

      key: "accion_realizada",
      render: (_, adulto) => {
        return adulto.nombre + " " + adulto.paterno + " " + adulto.materno;
      },
      className: "text-center",
    },

    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, adulto) =>
        adulto.estado == 1 ? (
          <Tag key={_} color="green">
            Activo
          </Tag>
        ) : (
          <Tag key={_} color="red">
            Inactivo
          </Tag>
        ),
    },
    {
      title: "Acción",
      key: "accion",
      className: "text-center",
      fixed: "right",
      render: (_, adulto) => (
        <div
          key={adulto.id_adulto + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={adulto.id_adulto}
            style={{
              fontSize: 20,
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
          >
            <EditOutlined style={{ zIndex: 0 }} />
          </Button>
          <Switch key={adulto.id_adulto + "-"} checked={adulto.estado == 1} />
        </div>
      ),
    },
  ];
  const [adultos, setAdultos] = useState<Adulto[]>([]);
  const [displayAdultos, setDisplayAdultos] = useState<Adulto[]>([]);

  //cargado de datos desde la API
  useEffect(() => {
    axios
      .get<Adulto[]>(process.env.BACKEND_URL + "/adulto/all")
      .then((res) => {
        setAdultos(res.data);
        setDisplayAdultos(res.data);
      });
  }, []);

  const { RangePicker } = DatePicker;

  //cambios en los filtros
  const handleFiltroAdulto = (ev: any) => {
    setDisplayAdultos(
      adultos.filter((adulto) => {
        return adulto.id_adulto.includes(ev.target.value);
      })
    );
  };
  const handleFiltroAccion = (ev: any) => {
    setDisplayAdultos(adultos.filter((adulto) => {}));
  };

  const handleFiltroRange = (ev: any) => {
    let [inicio, final] = ev;
    let fechaInicio = dayjs(inicio.$d);
    let fechaFinal = dayjs(final.$d);
    setDisplayAdultos(
      adultos.filter((adulto) => {
        dayjs(adulto.ult_modificacion).isBetween(fechaInicio, fechaFinal);
        return dayjs(adulto.ult_modificacion).isBetween(
          fechaInicio,
          fechaFinal
        );
      })
    );
  };
  return (
    <>
      <h5 className="mt-4">
        {'Filtros para "Adultos"'} <FilterOutlined />
      </h5>
      <small style={{ color: "#999" }}>
        Cada filtro realiza búsquedas por separado...
      </small>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="ID del adulto: ">
              <Input
                placeholder="Introduzca el ID del adulto"
                onChange={(value) => {
                  setDisplayAdultos(
                    adultos.filter((adulto) => {
                      return adulto.id_adulto.includes(value.target.value);
                    })
                  );
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 8 }}>
            <Form.Item label="Nombres o Apellidos: " style={{ marginLeft: 10 }}>
              <Input
                placeholder="Buscar por nombres o apellidos"
                onChange={(value) => {
                  setDisplayAdultos(
                    adultos.filter((adulto) => {
                      return (adulto.nombre + adulto.paterno + adulto.materno)
                        .toLocaleLowerCase()
                        .includes(value.target.value.toLocaleLowerCase());
                    })
                  );
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table
        scroll={{ x: 800, y: 500 }}
        rowKey={(adulto) => adulto.id_adulto + "T"}
        key="table"
        pagination={{ pageSize: 20, position: ["bottomCenter"] }}
        columns={columns}
        locale={{
          emptyText: (
            <Space direction="vertical" align="center">
              <Empty description="No existen datos a mostrar..." />
            </Space>
          ),
        }}
        dataSource={displayAdultos}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post(process.env.BACKEND_URL + "/adulto/estado", {
                      id_adulto: value.id_adulto,
                    })
                    .then((res) => {
                      value.estado == 0
                        ? message.success(
                            "Adulto " + value.id_adulto + " activo"
                          )
                        : message.error(
                            "Adulto " + value.id_adulto + " inactivo"
                          );

                      axios
                        .get<Adulto[]>(process.env.BACKEND_URL + "/adulto/all")
                        .then((res) => {
                          setAdultos(res.data);
                          setDisplayAdultos(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setOpen(true);
                  axios
                    .post<Domicilio[]>(
                      process.env.BACKEND_URL + "/domicilio/getByIdAdulto",
                      {
                        id_adulto: value.id_adulto,
                      }
                    )
                    .then((res) => {
                      setDomicilios(res.data);
                    });
                  axios
                    .post<Domicilio>(
                      process.env.BACKEND_URL + "/domicilio/get",
                      {
                        id_adulto: value.id_adulto,
                      }
                    )
                    .then((res) => {
                      setDomicilio(res.data);
                    });
                  axios
                    .post<{ adulto: Adulto; hijos: Hijo[] }>(
                      process.env.BACKEND_URL + "/adulto/get",
                      {
                        id_adulto: value.id_adulto,
                      }
                    )
                    .then((res) => {
                      setAdulto({
                        ...res.data.adulto,
                        hijos: res.data.hijos,
                      });
                      setLoaded(true);
                    });
                }
              } catch (error) {
                setOpen(true);
                axios
                  .post<{ adulto: Adulto; hijos: Hijo[] }>(
                    process.env.BACKEND_URL + "/adulto/get",
                    {
                      id_adulto: value.id_adulto,
                    }
                  )
                  .then((res) => {
                    setAdulto({
                      ...res.data.adulto,
                      hijos: res.data.hijos,
                    });
                    axios
                      .post<Domicilio[]>(
                        process.env.BACKEND_URL + "/domicilio/getByIdAdulto",
                        {
                          id_adulto: value.id_adulto,
                        }
                      )
                      .then((res) => {
                        setDomicilios(res.data);
                      });
                    axios
                      .post<Domicilio>(
                        process.env.BACKEND_URL + "/domicilio/get",
                        {
                          id_adulto: value.id_adulto,
                        }
                      )
                      .then((res) => {
                        setDomicilio(res.data);
                        setLoaded(true);
                      });
                  });
              }
            },
          };
        }}
      />
      <AdultoModal
        domicilios={domicilios}
        loaded={loaded}
        setLoaded={setLoaded}
        key="adultomodal"
        domicilio={domicilio}
        setDomicilio={setDomicilio}
        open={open}
        setOpen={setOpen}
        adulto={adulto}
        setAdulto={setAdulto}
        setAdultos={setAdultos}
        setDisplayAdultos={setDisplayAdultos}
        setDomicilios={setDomicilios}
      ></AdultoModal>

      <FloatButton.Group
        trigger="click"
        type="primary"
        shape="square"
        style={{ right: 50, bottom: 15 }}
        icon={<FileDoneOutlined style={{ fontSize: 25 }} />}
      >
        <Tooltip
          title="Generar EXCEL"
          placement={"right"}
          color={"#107840"}
          key={"excel"}
        >
          <FloatButton
            onClick={() => {
              notification.info({
                message: (
                  <div>
                    Generando Excel...
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{ marginLeft: 10, fontSize: 24 }}
                        />
                      }
                    />
                  </div>
                ),
              });
              axios
                .get(process.env.BACKEND_URL + "/caso/report")
                .then((res) => {});
            }}
            style={{ display: "flex", justifyContent: "center" }}
            icon={
              <FileExcelFilled
                style={{
                  color: "#107840",
                  fontSize: 25,
                }}
              />
            }
          />
        </Tooltip>

        <Tooltip
          title="Generar PDF"
          placement={"right"}
          color={"#b51308"}
          key={"pdf"}
        >
          <FloatButton
            icon={
              <FilePdfFilled
                style={{
                  color: "#b51308",
                  fontSize: 25,
                }}
              />
            }
          />
        </Tooltip>
      </FloatButton.Group>
    </>
  );
};
export default Informacion;
