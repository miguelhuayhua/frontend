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
import { Denunciado, dataDenunciado } from "../data";
import DenunciadoModal from "./denunciado";
import { Adulto, dataAdulto } from "../../adultos/data";
export const DataContext = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [loaded, setLoaded] = useState(false);
  const [adulto, setAdulto] = useState<Adulto>(dataAdulto);
  const [open, setOpen] = useState(false);

  const columns: ColumnsType<Denunciado> = [
    {
      title: "ID Denunciado",
      dataIndex: "id_denunciado",
      key: "id_denunciado",
      className: "text-center",
      fixed: "left",
    },
    {
      title: "Nombres y Apellidos",

      key: "accion_realizada",
      render: (_, Denunciado) => {
        return `${Denunciado.nombres} ${Denunciado.paterno} ${Denunciado.materno}`;
      },
      className: "text-center",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, Denunciado) =>
        Denunciado.estado == 1 ? (
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
      render: (_, denunciado) => (
        <div
          key={denunciado.id_denunciado + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={denunciado.id_denunciado}
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
          <Switch
            key={denunciado.id_denunciado + "-"}
            checked={denunciado.estado == 1}
          />
        </div>
      ),
    },
  ];
  const [denunciados, setDenunciados] = useState<Denunciado[]>([]);
  const [denunciado, setDenunciado] = useState<Denunciado>(dataDenunciado);
  const [displayDenunciados, setDisplayDenunciados] = useState<Denunciado[]>(
    []
  );

  //cargado de datos desde la API
  useEffect(() => {
    axios
      .get<Denunciado[]>("http://localhost:8000/denunciado/all")
      .then((res) => {
        setDenunciados(res.data);
        setDisplayDenunciados(res.data);
      });
  }, []);

  const { RangePicker } = DatePicker;

  //cambios en los filtros

  return (
    <>
      <h5 className="mt-4">
        {' Filtros para "Denunciados"'} <FilterOutlined />
      </h5>
      <small style={{ color: "#999" }}>
        Cada filtro realiza búsquedas por separado...
      </small>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="Nro. de Caso: ">
              <Input placeholder="Introduzca el ID del Denunciado" />
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
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table
        scroll={{ x: 800, y: 500 }}
        rowKey={(Denunciado) => Denunciado.id_denunciado + "T"}
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
        dataSource={displayDenunciados}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post("http://localhost:8000/denunciado/estado", {
                      id_denunciado: value.id_denunciado,
                    })
                    .then((res) => {
                      message.success("¡Denunciado cambiado con éxito!");
                      axios
                        .get<Denunciado[]>(
                          "http://localhost:8000/denunciado/all"
                        )
                        .then((res) => {
                          setDenunciados(res.data);
                          setDisplayDenunciados(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setOpen(true);
                  axios
                    .post("http://localhost:8000/denunciado/obtenerById", {
                      id_denunciado: value.id_denunciado,
                    })
                    .then((res) => {
                      setDenunciado(res.data);
                      setLoaded(true);
                    });
                }
              } catch (error) {
                setOpen(true);
                axios
                  .post("http://localhost:8000/denunciado/obtenerById", {
                    id_denunciado: value.id_denunciado,
                  })
                  .then((res) => {
                    setDenunciado(res.data);
                    setLoaded(true);
                  });
              }
            },
          };
        }}
      />
      <DenunciadoModal
        denunciado={denunciado}
        loaded={loaded}
        adulto={adulto}
        setDisplayDenunciados={setDisplayDenunciados}
        setDenunciado={setDenunciado}
        setDenunciados={setDenunciados}
        key="Denunciadomodal"
        open={open}
        setOpen={setOpen}
      ></DenunciadoModal>

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
