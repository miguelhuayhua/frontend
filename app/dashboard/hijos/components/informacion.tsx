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
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  message,
  notification,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";

import { createContext, useEffect, useRef, useState } from "react";
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

import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import { dias, meses } from "../../casos/nuevocaso/data";
import { Hijo, dataHijo } from "../data";
import HijoModal from "./hijo";
import { Adulto, dataAdulto } from "../../adultos/data";
export const DataContext = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [loaded, setLoaded] = useState(false);
  const [adulto, setAdulto] = useState<Adulto>(dataAdulto);
  const [open, setOpen] = useState(false);

  const columns: ColumnsType<Hijo> = [
    {
      title: "ID Hijo",
      dataIndex: "id_hijo",
      key: "id_hijo",
      className: "text-center",
      fixed: "left",
    },
    {
      title: "Nombres y Apellidos",

      key: "accion_realizada",
      render: (_, hijo) => {
        return hijo.nombres_apellidos;
      },
      className: "text-center",
    },

    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, hijo) =>
        hijo.estado == 1 ? (
          <Tag key={_} color="green">
            Activo
          </Tag>
        ) : (
          <Tag key={_} color="red">
            Cerrado
          </Tag>
        ),
    },
    {
      title: "Acción",
      key: "accion",
      className: "text-center",
      fixed: "right",
      render: (_, hijo) => (
        <div
          key={hijo.id_hijo + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={hijo.id_hijo}
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
          <Switch key={hijo.id_hijo + "-"} checked={hijo.estado == 1} />
        </div>
      ),
    },
  ];
  const [hijos, setHijos] = useState<Hijo[]>([]);
  const [displayHijos, setDisplayHijos] = useState<Hijo[]>([]);
  const [hijo, setHijo] = useState<Hijo>(dataHijo);

  //cargado de datos desde la API
  useEffect(() => {
    axios.get<Hijo[]>("http://localhost:8000/hijo/all").then((res) => {
      setHijos(res.data);
      setDisplayHijos(res.data);
    });
  }, []);

  const { RangePicker } = DatePicker;

  //cambios en los filtros
  const handleFiltrohijo = (ev: any) => {
    setDisplayHijos(
      hijos.filter((hijo) => {
        return hijo.id_hijo.includes(ev.target.value);
      })
    );
  };
  const handleFiltroAccion = (ev: any) => {
    setDisplayHijos(hijos.filter((hijo) => {}));
  };

  const handleFiltroRange = (ev: any) => {
    let [inicio, final] = ev;
    let fechaInicio = dayjs(inicio.$d);
    let fechaFinal = dayjs(final.$d);
    setDisplayHijos(
      hijos.filter((hijo) => {
        dayjs(hijo.ult_modificacion).isBetween(fechaInicio, fechaFinal);
        return dayjs(hijo.ult_modificacion).isBetween(fechaInicio, fechaFinal);
      })
    );
  };
  return (
    <>
      <h5 className="mt-4">
        {' Filtros para "Casos"'} <FilterOutlined />
      </h5>
      <small style={{ color: "#999" }}>
        Cada filtro realiza búsquedas por separado...
      </small>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="Nro. de Caso: ">
              <Input placeholder="Introduzca el ID del hijo" />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 8 }}>
            <Form.Item
              style={{ marginLeft: 10, width: "100%" }}
              label="Filtrar por rango de fechas:"
            >
              <RangePicker
                style={{ width: "100%" }}
                locale={{
                  ...locale,
                  lang: {
                    ...locale.lang,
                    shortWeekDays: dias,
                    shortMonths: meses,
                  },
                }}
                onChange={handleFiltroRange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table
        scroll={{ x: 800, y: 500 }}
        rowKey={(hijo) => hijo.id_hijo + "T"}
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
        dataSource={displayHijos}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post("http://localhost:8000/hijo/estado", {
                      id_hijo: value.id_hijo,
                    })
                    .then((res) => {
                      message.success("¡Caso cambiado con éxito!");
                      axios
                        .get<Hijo[]>("http://localhost:8000/hijo/all")
                        .then((res) => {
                          setHijos(res.data);
                          setDisplayHijos(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setOpen(true);
                  axios
                    .post("http://localhost:8000/hijo/obtener", {
                      id_hijo: value.id_hijo,
                    })
                    .then((res) => {
                      setHijo(res.data);
                      axios
                        .post<{ adulto: Adulto; hijos: Hijo[] }>(
                          "http://localhost:8000/adulto/obtener",
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
                    });
                }
              } catch (error) {
                setOpen(true);
                axios
                  .post("http://localhost:8000/hijo/obtener", {
                    id_hijo: value.id_hijo,
                  })
                  .then((res) => {
                    setHijo(res.data);
                    axios
                      .post<{ adulto: Adulto; hijos: Hijo[] }>(
                        "http://localhost:8000/adulto/obtener",
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
                  });
              }
            },
          };
        }}
      />
      <HijoModal
        hijo={hijo}
        loaded={loaded}
        adulto={adulto}
        setDisplayHijos={setDisplayHijos}
        setHijo={setHijo}
        setHijos={setHijos}
        key="hijomodal"
        open={open}
        setOpen={setOpen}
      ></HijoModal>

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
              axios.get("http://localhost:8000/caso/report").then((res) => {});
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
