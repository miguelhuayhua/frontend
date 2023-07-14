"use client";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  FloatButton,
  Form,
  Input,
  Progress,
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

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  PlusCircleOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  FilterOutlined,
  FileDoneOutlined,
  FileExcelFilled,
  FilePdfFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import AdultoModal from "./adulto";

import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import { Adulto } from "../data";
import { dias, meses } from "../../casos/nuevocaso/data";
export const DataContext = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [open, setOpen] = useState(false);

  const [filtroCaso, setFiltroCaso] = useState("");
  const [filtroAccionCaso, setFiltroAccionCaso] = useState("");
  const [filtroRangoFecha, setFiltroRangoFecha] = useState("");
  const columns: ColumnsType<Adulto> = [
    {
      title: "ID Adulto",
      dataIndex: "id_adulto",
      key: "id_adulto",
      className: "text-center",
      fixed: "left",
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
            Cerrado
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
    axios.get<Adulto[]>("http://localhost:8000/adulto/all").then((res) => {
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
        Filtros para "Casos" <FilterOutlined />
      </h5>
      <small style={{ color: "#999" }}>
        Cada filtro realiza búsquedas por separado...
      </small>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="Nro. de Caso: ">
              <Input
                placeholder="Introduzca el ID del adulto"
                value={filtroCaso}
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
                    .post("http://localhost:8000/adulto/estado", {
                      id_adulto: value.id_adulto,
                    })
                    .then((res) => {
                      message.success("¡Caso cambiado con éxito!");
                      axios
                        .get<Adulto[]>("http://localhost:8000/adulto/all")
                        .then((res) => {
                          setAdultos(res.data);
                          setDisplayAdultos(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  axios
                    .post<{}>("http://localhost:8000/adulto/obtener", {})
                    .then((res) => {});
                  axios
                    .post("http://localhost:8000/denunciado/obtener", {})
                    .then((res) => {});
                  setOpen(true);
                }
              } catch (error) {
                axios
                  .post("http://localhost:8000/adulto/obtener", {
                    id_adulto: value.id_adulto,
                  })
                  .then((res) => {});
                axios
                  .post("http://localhost:8000/denunciado/obtener", {})
                  .then((res) => {});
                setOpen(true);
              }
            },
          };
        }}
      />
      <AdultoModal
        key="adultomodal"
        open={open}
        setOpen={setOpen}
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
              axios.get("http://localhost:8000/caso/report").then((res) => {
                console.log(res);
              });
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
