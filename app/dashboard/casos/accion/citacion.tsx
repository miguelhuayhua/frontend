"use client";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  List,
  Popconfirm,
  Row,
  notification,
  DatePicker,
  TimePicker,
  Input,
  Avatar,
  Switch,
  message,
  Space,
  Card,
  Tag,
} from "antd";
import { NextPage } from "next";
import { Adulto } from "../../adultos/data";
import { Caso, Citacion, dataCitacion } from "../data";
import { Persona } from "../../personal/agregar/data";
import { createContext, useEffect, useState } from "react";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import Formulariocitacion from "./pdf-citacion";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { Citado, dias, meses, nro_citacion } from "../nuevocaso/data";
import moment, { now } from "moment";
import "./estilos.scss";
import ModalAudienciaSuspendida from "./audiencia";
import { Usuario } from "../../usuarios/data";
export const DataContext2 = createContext({});

interface Props {
  caso: Caso;
  adulto: Adulto;
  persona: Persona;
  citaciones: Citacion[];
  citacion: { citacion: Citacion; size: number };
  setCitacion: any;
  setCitaciones: any;
  usuario: Usuario;
}

const CitacionOptions: NextPage<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [citado, setCitado] = useState("");
  const [open2, setOpen2] = useState(false);
  const [citacion, setCitacion] = useState<Citacion>(dataCitacion);
  const [citados, setCitados] = useState<any[]>([]);
  //cambio del estado de caso
  const [citados2, setCitados2] = useState<any[]>([]);

  useEffect(() => {
    setCitados([
      ...props.adulto.hijos.map((value) => {
        return { ...value, citado: 1 };
      }),
    ]);
  }, []);
  const params = useSearchParams();
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24} xl={{ span: 12 }}>
          <div className="detalle-citacion">
            <p>
              <b className="fw-bold">Adulto mayor implicado: </b>
              <br />
              {props.adulto.nombre +
                " " +
                props.adulto.paterno +
                " " +
                props.adulto.materno}
              <br />
              <b className="fw-bold">Fecha: </b>
              <br />
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
                <Col span={24} >
                  <Form.Item label={"Fecha de Registro"}>
                    <DatePicker
                      style={{ width: "100%" }}
                      locale={
                        {

                          "lang": {
                            "placeholder": "Seleccionar fecha",
                            "rangePlaceholder": [
                              "Fecha inicial",
                              "Fecha final"
                            ],
                            shortMonths: meses,
                            shortWeekDays: dias,
                            "locale": "es_ES",
                            "today": "Hoy",
                            "now": "Ahora",
                            "backToToday": "Volver a hoy",
                            "ok": "Aceptar",
                            "clear": "Limpiar",
                            "month": "Mes",
                            "year": "Año",
                            "timeSelect": "Seleccionar hora",
                            "dateSelect": "Seleccionar fecha",
                            "monthSelect": "Elegir un mes",
                            "yearSelect": "Elegir un año",
                            "decadeSelect": "Elegir una década",
                            "yearFormat": "YYYY",
                            "dateFormat": "D/M/YYYY",
                            "dayFormat": "D",
                            "dateTimeFormat": "D/M/YYYY HH:mm:ss",
                            "monthBeforeYear": true,
                            "previousMonth": "Mes anterior (PageUp)",
                            "nextMonth": "Mes siguiente (PageDown)",
                            "previousYear": "Año anterior (Control + left)",
                            "nextYear": "Año siguiente (Control + right)",
                            "previousDecade": "Década anterior",
                            "nextDecade": "Década siguiente",
                            "previousCentury": "Siglo anterior",
                            "nextCentury": "Siglo siguiente",
                          },
                          "timePickerLocale": {
                            "placeholder": "Seleccionar hora"
                          }
                        }
                      }
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
                <Col span={24}>
                  <Form.Item label="Hora de registro:">
                    <TimePicker
                      className="w-100"
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
                  <List
                    className="demo-loadmore-list"
                    locale={{
                      emptyText: (
                        <>
                          <PiListMagnifyingGlassFill
                            width={50}
                            height={50}
                            fontSize={50}
                          />
                          <p className="text-center">Sin datos</p>
                        </>
                      ),
                    }}
                    header={
                      <>
                        <h6 className="text-center">
                          Lista de citados
                        </h6>
                        <Space.Compact className="w-100">
                          <Form.Item label="Agregar Citado" className="w-100">
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
                      </>
                    }
                    itemLayout="horizontal"
                    dataSource={citados}
                    rowKey={(item) => item.nombres_apellidos}
                    renderItem={(item: any, index) => (
                      <List.Item
                        actions={[
                          <Switch
                            key={index + "s"}
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
                          usuario: props.usuario
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
                                      id_caso: params.get('id_caso')
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
                    <Button type="primary" className="mt-2 me-2">
                      Guardar y generar {nro_citacion[props.citaciones.length]}{" "}
                      Citación
                    </Button>
                  </Popconfirm>
                  <Button
                    className="mt-2 me-2"
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
            <h3 className="h5">Límite de citaciones excedida...</h3>
          )}
        </Col>
        <Col span={24} xl={{ span: 12 }}>
          <hr />
          <List
            header={<b>Historial de citaciones</b>}
            locale={{
              emptyText: (
                <>
                  <PiListMagnifyingGlassFill
                    width={50}
                    height={50}
                    fontSize={50}
                  />
                  <p>Sin historial de citaciones...</p>
                </>
              ),
            }}
            dataSource={props.citaciones}
            rowKey={(citacion) => citacion.id_citacion}
            renderItem={(item, index) => {
              let diasCitacion = dayjs(item.fecha_citacion).diff(
                dayjs(),
                "days"
              );
              return (
                <List.Item>
                  <>
                    <Card
                      style={{ width: "100%" }}
                      bordered={false}
                      title={
                        <>
                          <span className="number">{item.numero + 1}</span>
                          <b className="me-4">{nro_citacion[item.numero]} Citación</b>
                          {item.suspendido == 1 ? (
                            <Tag color="#f50">Suspendido</Tag>
                          ) : item.estado == 0 ? (
                            <Tag color="#000">Terminado</Tag>
                          ) : diasCitacion < 0 ? (
                            <Tag color="#cd201f">Citación Atrasada</Tag>
                          ) : diasCitacion == 0 ? (
                            <Tag color="#87d068">Hoy</Tag>
                          ) : item.estado == 0 ? (
                            <Tag color="#000">Terminado</Tag>
                          ) : (<Tag color="#108ee9">En {diasCitacion} días</Tag>
                          )}
                          {item.estado == 1 && item.suspendido != 1 ? (<Popconfirm
                            key="popconfirm"
                            title="¿Estás seguro de terminar la citación?"
                            onConfirm={() => {
                              axios.post(process.env.BACKEND_URL + "/caso/citacion/terminar", { id_citacion: item.id_citacion }).then(res => {
                                if (res.data.status == 1) {
                                  notification.success({ message: "Terminado con éxito" });
                                  axios
                                    .post<Citacion[]>(
                                      process.env.BACKEND_URL + "/caso/citacion/all",
                                      {
                                        id_caso: params.get('id_caso')
                                      }
                                    )
                                    .then((res) => {
                                      props.setCitaciones(res.data);
                                    });
                                }
                                else {
                                  notification.error({ message: "Error en el servidor" })
                                }
                              })
                            }}
                            okText="Sí"
                            cancelText="No"
                          >
                            <Button key="ok" className="m-0">
                              Terminar
                            </Button>
                          </Popconfirm>) : null}
                        </>
                      }
                    >
                      <Row>
                        <Col span={10}>
                          <p style={{ fontSize: 10 }}>
                            <b className="fw-bold">
                              Fecha y hora de citación:{" "}
                            </b>
                            <br />
                            {item.fecha_citacion ? item.fecha_citacion + " " + item.hora_citacion : null}
                            <br />
                            <b className="fw-bold">
                              Creado el:
                            </b>
                            <br />
                            {item.fecha_creacion}
                          </p>
                        </Col>
                        {item.suspendido == 1 || item.estado == 0 ? (
                          null
                        ) : (
                          <>
                            <Col span={14}>
                              <Button
                                style={{
                                  backgroundColor: "#b51308",
                                  color: "white",
                                  marginRight: 10
                                }}
                                onClick={() => {
                                  axios
                                    .post<Citado[]>(
                                      process.env.BACKEND_URL +
                                      "/caso/citados/get",
                                      {
                                        id_citacion: item.id_citacion,
                                      }
                                    )
                                    .then((res) => {
                                      let citados: Citado[] = res.data.map(
                                        (value) => {
                                          return { ...value, citado: 1 };
                                        }
                                      );
                                      pdf(
                                        <DataContext2.Provider
                                          value={{
                                            adulto: props.adulto,
                                            caso: props.caso,
                                            nro_citacion:
                                              nro_citacion[item.numero],
                                            citacion: item,
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
                                          const link =
                                            document.createElement("a");
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
                                }}
                              >
                                Generar
                              </Button>
                              <Button
                                onClick={() => {
                                  setOpen2(true);
                                  setCitacion(item);
                                  axios
                                    .post<Citado[]>(
                                      process.env.BACKEND_URL +
                                      "/caso/citados/get",
                                      {
                                        id_citacion: item.id_citacion,
                                      }
                                    )
                                    .then((res) => {
                                      setCitados2(res.data);
                                    });
                                }}
                              >
                                Suspender
                              </Button>
                            </Col>

                          </>
                        )}
                      </Row>
                    </Card>
                  </>
                </List.Item>
              );
            }}
          ></List>
        </Col >
      </Row >
      <Drawer
        title={`Vista previa del Documento`}
        placement="right"
        size={"large"}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <PDFViewer showToolbar={false} style={{ width: "100%", height: 800 }}>
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

      <ModalAudienciaSuspendida
        setCitacion={props.setCitacion}
        citados={citados2}
        adulto={props.adulto}
        caso={props.caso}
        citacion={citacion}
        setCitaciones={props.setCitaciones}
        open2={open2}
        setOpen2={setOpen2}
        persona={props.persona}
        usuario={props.usuario}
      ></ModalAudienciaSuspendida>
    </>
  );
};

export default CitacionOptions;
