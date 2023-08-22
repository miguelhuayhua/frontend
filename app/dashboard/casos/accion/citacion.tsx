"use client";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import locale from "antd/es/date-picker/locale/es_ES";
import { UserOutlined, CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  List,
  Popconfirm,
  Row,
  notification,
  Typography,
  DatePicker,
  TimePicker,
  Transfer,
  Input,
  Avatar,
  Switch,
  message,
  Space,
  Card,
} from "antd";
import { NextPage } from "next";
import { Adulto } from "../../adultos/data";
import { Caso, Citacion, dataCitacion } from "../data";
import { Persona } from "../../personal/agregar/data";
import { createContext, useEffect, useState } from "react";
import Formulariocitacion from "./pdf-citacion";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Hijo } from "../../hijos/data";
import { AiOutlineFilePdf } from "react-icons/ai";
import dayjs, { Dayjs } from "dayjs";
import { dias, meses, nro_citacion } from "../nuevocaso/data";
import moment, { now } from "moment";
export const DataContext2 = createContext({});

interface Props {
  caso: Caso;
  adulto: Adulto;
  data: any;
  persona: Persona;
  citaciones: Citacion[];
  citacion: { citacion: Citacion; size: number };
  setCitacion: any;
  setCitaciones: any;
}

const CitacionOptions: NextPage<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [citado, setCitado] = useState("");
  const [citados, setCitados] = useState<any[]>([]);
  //cambio del estado de caso
  const params = useSearchParams();

  useEffect(() => {
    setCitados([
      ...props.adulto.hijos.map((value) => {
        return { ...value, citado: 1 };
      }),
    ]);
  }, []);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24} lg={{ span: 12 }}>
          <div className="detalle-citacion">
            <p>
              <b style={{ marginRight: 10 }}>Adulto mayor implicado: </b>
              {props.adulto.nombre +
                " " +
                props.adulto.paterno +
                " " +
                props.adulto.materno}
              <br />
              <b style={{ marginRight: 5 }}>Fecha: </b>
              {dayjs().date() +
                " de " +
                meses[dayjs().month()] +
                " del " +
                dayjs().year()}
            </p>
          </div>
          {props.citacion.size < 4 ? (
            <Form>
              <h6 style={{ textAlign: "center", margin: "20px 0" }}>
                {nro_citacion[props.citaciones.length]} Citación
              </h6>
              <Row gutter={[24, 12]}>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label={"Fecha de Registro"}>
                    <DatePicker
                      style={{ width: "100%" }}
                      locale={{
                        ...locale,
                        lang: {
                          ...locale.lang,
                          shortWeekDays: dias,
                          shortMonths: meses,
                        },
                      }}
                      disabledDate={(date) => {
                        return (
                          moment().add(-1, "day") >= date || date.day() == 0
                        );
                      }}
                      defaultValue={dayjs()}
                      onChange={(ev) => {
                        let fecha = ev as Dayjs;
                        props.setCitacion({
                          ...props.citacion,
                          citacion: {
                            ...props.citacion.citacion,
                            fecha_citacion: fecha.format("YYYY-MM-DD"),
                          },
                        });
                      }}
                    ></DatePicker>
                  </Form.Item>
                </Col>
                <Col span={24} lg={{ span: 12 }}>
                  <Form.Item label="Hora de registro:">
                    <TimePicker
                      style={{ width: "100%" }}
                      defaultValue={dayjs(now())}
                      onChange={(ev) => {
                        let fecha = ev as Dayjs;
                        props.setCitacion({
                          ...props.citacion,
                          citacion: {
                            ...props.citacion.citacion,
                            hora_citacion: fecha.format("HH:mm:ss"),
                          },
                        });
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <hr />
                  <List
                    className="demo-loadmore-list"
                    header={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h6>
                          <b>Lista de citados</b>
                        </h6>
                        <Space.Compact>
                          <Form.Item label="Agregar Citado">
                            <Input
                              onChange={(ev) => {
                                setCitado(ev.target.value);
                              }}
                              value={citado}
                              allowClear
                            />
                          </Form.Item>
                          <Button
                            type="default"
                            onClick={() => {
                              axios
                                .post<{ genero: number }>(
                                  process.env.BACKEND_URL +
                                    "/ml/genderize/predict",
                                  { nombres_apellidos: citado }
                                )
                                .then((res) => {
                                  let genero =
                                    res.data.genero == 1
                                      ? "Femenino"
                                      : "Masculino";
                                  setCitados([
                                    ...citados,
                                    {
                                      nombres_apellidos: citado,
                                      citado: 1,
                                      genero,
                                    },
                                  ]);
                                  message.info("Citado agregado...");
                                  setCitado("");
                                });
                            }}
                          >
                            Insertar
                          </Button>
                        </Space.Compact>
                      </div>
                    }
                    itemLayout="horizontal"
                    dataSource={citados}
                    rowKey={(item) => item.nombres_apellidos}
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <Switch
                            checked={item.citado == 1}
                            checkedChildren="Citar"
                            unCheckedChildren="No citar"
                            onChange={(ev) => {
                              setCitados(
                                citados.map((value) => {
                                  if (
                                    value.nombres_apellidos ==
                                    item.nombres_apellidos
                                  ) {
                                    value.citado = !value.citado;
                                  }
                                  return value;
                                })
                              );
                            }}
                          ></Switch>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              style={{
                                backgroundColor:
                                  item.genero == "Femenino"
                                    ? "#ff0080"
                                    : "#0041c8",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              icon={<UserOutlined />}
                            />
                          }
                          title={item.nombres_apellidos}
                        />
                      </List.Item>
                    )}
                  />
                </Col>

                <Col span={24}>
                  <Popconfirm
                    key="popconfirm"
                    title="¿Estás seguro de continuar?"
                    onConfirm={() => {
                      notification.info({
                        message: "Guardando y generando...",
                      });
                      axios
                        .post(process.env.BACKEND_URL + "/caso/citacion/add", {
                          id_caso: props.caso.id_caso,
                          citacion: props.citacion.citacion,
                          citados: citados,
                          numero: props.citacion.size,
                        })
                        .then((res) => {
                          if (res.data.status == 1) {
                            pdf(
                              <DataContext2.Provider
                                value={{
                                  adulto: props.adulto,
                                  caso: props.caso,
                                  persona: props.persona,
                                  nro_citacion:
                                    nro_citacion[props.citacion.size],
                                  citados: citados,
                                  citacion: props.citacion.citacion,
                                }}
                              >
                                <Formulariocitacion />
                              </DataContext2.Provider>
                            )
                              .toBlob()
                              .then((blob) => {
                                notification.success({
                                  message: "¡Guardado y generado con éxito!",
                                });
                                axios
                                  .post<Citacion[]>(
                                    process.env.BACKEND_URL +
                                      "/caso/citacion/all",
                                    {
                                      id_caso: params.get("id_caso"),
                                    }
                                  )
                                  .then((res) => {
                                    props.setCitaciones(res.data);
                                    props.setCitacion({
                                      ...props.citacion,
                                      size: res.data.length,
                                    });
                                  });
                                setCitados([
                                  ...props.adulto.hijos.map((value) => {
                                    return { ...value, citado: 1 };
                                  }),
                                ]);
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement("a");
                                link.href = url;
                                let { nombre, paterno, materno } = props.adulto;

                                link.setAttribute(
                                  "download",
                                  nombre + paterno + materno + ".pdf"
                                );
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              });
                          }
                        });
                    }}
                    okText="Sí"
                    cancelText="No"
                  >
                    <Button type="primary" style={{ marginTop: 20 }}>
                      Guardar y generar {nro_citacion[props.citaciones.length]}{" "}
                      Citación
                    </Button>
                  </Popconfirm>
                  <Button
                    style={{ marginTop: 20, marginLeft: 20 }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Vista Previa PDF
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <h3>Límite de citaciones excedida...</h3>
          )}
        </Col>
        <Col span={24} lg={{ span: 12 }}>
          <List
            header={<b>Historial de citaciones</b>}
            grid={{ gutter: 16, column: 2 }}
            dataSource={props.citaciones}
            rowKey={(citacion) => citacion.id_citacion}
            renderItem={(item, index) => (
              <List.Item>
                <>
                  <Card
                    bordered={false}
                    title={<b>{nro_citacion[item.numero]} Citación</b>}
                  >
                    <p style={{ fontSize: 10, paddingRight: 20 }}>
                      <b>
                        Fecha y hora:{" "}
                        {item.fecha_citacion + " " + item.hora_citacion}
                      </b>
                    </p>
                    <Button
                      onClick={() => {
                        let caso: any = {};
                        axios
                          .post<Caso>(process.env.BACKEND_URL + "/caso/get", {
                            id_caso: props.caso.id_caso,
                          })
                          .then((res) => {
                            caso = res.data;
                            axios
                              .post<{ adulto: Adulto; hijos: Hijo[] }>(
                                process.env.BACKEND_URL + "/adulto/get",
                                {
                                  id_adulto: caso.id_adulto,
                                }
                              )
                              .then((res) => {
                                pdf(
                                  <DataContext2.Provider
                                    value={{
                                      adulto: res.data.adulto,
                                      caso: caso,
                                      nro_citacion: item,
                                      persona: props.persona,
                                      citados: citados,
                                    }}
                                  >
                                    <Formulariocitacion />
                                  </DataContext2.Provider>
                                )
                                  .toBlob()
                                  .then((blob) => {
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    let { nombre, paterno, materno } =
                                      props.adulto;

                                    link.setAttribute(
                                      "download",
                                      nombre + paterno + materno + ".pdf"
                                    );
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                  });
                              });
                          });
                      }}
                      style={{ height: 45, margin: "0 auto" }}
                    >
                      Generar Citación
                      <AiOutlineFilePdf
                        style={{
                          color: "#b51308",
                          fontSize: 30,
                        }}
                      />
                    </Button>
                  </Card>
                </>
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
      <Drawer
        title={`Vista previa del Documento`}
        placement="right"
        size={"large"}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <PDFViewer showToolbar={false} style={{ width: "100%", height: 700 }}>
          <DataContext2.Provider
            value={{
              persona: props.persona,
              adulto: props.adulto,
              caso: props.caso,
              nro_citacion: nro_citacion[props.citacion.size],
              citacion: props.citacion.citacion,
              citados: citados,
            }}
          >
            <Formulariocitacion />
          </DataContext2.Provider>
        </PDFViewer>
      </Drawer>
    </>
  );
};

export default CitacionOptions;
