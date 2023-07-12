"use client";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tag,
  message,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Caso, DatosDenunciado, Denunciado, datosCaso } from "../data";
import CasoModal from "./caso";
import {
  AdultoMayor,
  AdultoMayor2,
  dataDatosGenerales,
  dias,
  meses,
} from "../../nuevocaso/data";
import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
export const DataContext = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [open, setOpen] = useState(false);
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [adultoMayor, setAdultoMayor] =
    useState<AdultoMayor2>(dataDatosGenerales);

  const [filtroCaso, setFiltroCaso] = useState("");
  const [filtroAccionCaso, setFiltroAccionCaso] = useState("");
  const [filtroRangoFecha, setFiltroRangoFecha] = useState("");
  const [denunciado, setDenunciado] = useState<Denunciado>(DatosDenunciado);
  const columns: ColumnsType<Caso> = [
    {
      title: "Nro. de Caso",
      dataIndex: "nro_caso",
      key: "nro_caso",
      className: "text-center",
      fixed: "left",
    },
    {
      title: "Acción Realizada",
      dataIndex: "accion_realizada",
      key: "accion_realizada",
      className: "text-center",
    },
    {
      title: "Fecha de Registro",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
      className: "text-center",
    },
    {
      title: "Hora de Registro",
      key: "hora_registro",
      dataIndex: "hora_registro",
      className: "text-center",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, caso) =>
        caso.estado == 1 ? (
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
      render: (_, caso) => (
        <div
          key={caso.id_caso + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={caso.id_caso}
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
          <Switch key={caso.id_caso + "-"} checked={caso.estado == 1} />
        </div>
      ),
    },
  ];
  const [casos, setCasos] = useState<Caso[]>([]);
  const [displayCasos, setDisplayCasos] = useState<Caso[]>([]);

  //cargado de datos desde la API
  useEffect(() => {
    axios.get<Caso[]>("http://localhost:8000/caso/all").then((res) => {
      setCasos(res.data);
      setDisplayCasos(res.data);
    });
  }, []);

  const { RangePicker } = DatePicker;

  //cambios en los filtros
  const handleFiltroCaso = (ev: any) => {
    setFiltroCaso(ev.target.value);
    setDisplayCasos(
      casos.filter((caso) => {
        return caso.nro_caso.includes(ev.target.value);
      })
    );
    setFiltroAccionCaso("");
  };
  const handleFiltroAccion = (ev: any) => {
    setFiltroAccionCaso(ev);
    setFiltroCaso("");

    setDisplayCasos(
      casos.filter((caso) => {
        return caso.accion_realizada == ev;
      })
    );
  };

  const handleFiltroRange = (ev: any) => {
    let [inicio, final] = ev;
    let fechaInicio = dayjs(inicio.$d);
    let fechaFinal = dayjs(final.$d);
    setDisplayCasos(
      casos.filter((caso) => {
        dayjs(caso.fecha_registro).isBetween(fechaInicio, fechaFinal);
        return dayjs(caso.fecha_registro).isBetween(fechaInicio, fechaFinal);
      })
    );
    setFiltroAccionCaso("");
    setFiltroCaso("");
  };
  return (
    <>
      <h5 className="mt-4">Filtros para "Casos"</h5>
      <small style={{ color: "#999" }}>
        Cada filtro realiza búsquedas por separado...
      </small>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="Nro. de Caso: ">
              <Input
                placeholder="Introduzca el número de caso..."
                value={filtroCaso}
                onChange={handleFiltroCaso}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 8 }}>
            <Form.Item
              label="Tipo de acción realizada: "
              style={{ marginLeft: 10 }}
            >
              <Select value={filtroAccionCaso} onChange={handleFiltroAccion}>
                <Select.Option value="Apertura">Apertura de Caso</Select.Option>
                <Select.Option value="Orientacion">Orientación</Select.Option>
                <Select.Option value="Citacion">Citación</Select.Option>
                <Select.Option value="Derivacion">Derivación</Select.Option>
              </Select>
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
        scroll={{ x: 800, y: 600 }}
        rowKey={(caso) => caso.id_caso}
        key="table"
        pagination={{ pageSize: 20 }}
        columns={columns}
        locale={{
          emptyText: (
            <Space direction="vertical" align="center">
              <Empty description="No existen datos a mostrar..." />
            </Space>
          ),
        }}
        dataSource={displayCasos}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post("http://localhost:8000/caso/estado", {
                      id_caso: value.id_caso,
                    })
                    .then((res) => {
                      message.success(
                        "¡Caso " + value.nro_caso + " cambiado con éxito!"
                      );
                      axios
                        .get<Caso[]>("http://localhost:8000/caso/all")
                        .then((res) => {
                          setCasos(res.data);
                          setDisplayCasos(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setCaso(value);
                  axios
                    .post<{
                      adulto: AdultoMayor2;
                      hijos: {
                        ult_modificacion: string;
                        id_hijo: string;
                        estado: number;
                        nombres_apellidos: string;
                      }[];
                    }>("http://localhost:8000/adulto/obtener", {
                      id_adulto: value.id_adulto,
                    })
                    .then((res) => {
                      setAdultoMayor({
                        ...res.data.adulto,
                        hijos: res.data.hijos,
                      });
                    });
                  axios
                    .post("http://localhost:8000/denunciado/obtener", {
                      id_caso: value.id_caso,
                    })
                    .then((res) => {
                      setDenunciado(res.data);
                    });
                  setOpen(true);
                }
              } catch (error) {
                setCaso(value);
                axios
                  .post<{
                    adulto: AdultoMayor2;
                    hijos: {
                      ult_modificacion: string;
                      id_hijo: string;
                      estado: number;
                      nombres_apellidos: string;
                    }[];
                  }>("http://localhost:8000/adulto/obtener", {
                    id_adulto: value.id_adulto,
                  })
                  .then((res) => {
                    setAdultoMayor({
                      ...res.data.adulto,
                      hijos: res.data.hijos,
                    });
                  });
                axios
                  .post<Denunciado>(
                    "http://localhost:8000/denunciado/obtener",
                    {
                      id_caso: value.id_caso,
                    }
                  )
                  .then((res) => {
                    setDenunciado(res.data);
                  });
                setOpen(true);
              }
            },
          };
        }}
      />
      <CasoModal
        key="casomodal"
        adultoMayor={adultoMayor}
        caso={caso!}
        setOpen={setOpen}
        open={open}
        denunciado={denunciado}
        setCaso={setCaso}
        setCasos={setCasos}
        setDisplayCasos={setDisplayCasos}
      ></CasoModal>
      ;
    </>
  );
};
export default Informacion;
