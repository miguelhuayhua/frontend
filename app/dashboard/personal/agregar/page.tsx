"use client";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import MenuSider from "../../components/MenuSider";
import { Content } from "antd/es/layout/layout";
import Navbar from "../../components/Navbar";
import {
  UserOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import Meta from "antd/es/card/Meta";
import { Persona, cargos, dataPersona, dias, meses } from "./data";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./estilos.scss";
import { now } from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { departamentos } from "../../casos/nuevocaso/data";
import { useSession } from "next-auth/react";
import { Usuario, dataUsuario } from "../../usuarios/data";
const AgregarPersonal = () => {
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  //cargado de datos desde la API
  const { data } = useSession();

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
      setUsuario({ ...usuario, ult_modificacion: "", password: "" });
    }
  }, [data]);

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="personal1.1"
            defaultOpenKeys={["personal"]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Breadcrumb
              separator={<b style={{ fontSize: 18 }}>/</b>}
              className="mx-4 my-2"
              items={[
                {
                  href: "/dashboard",
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard/personal"}
                    >
                      Personal
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard/personal/agregar"}
                    >
                      Agregar
                    </Link>
                  ),
                },
              ]}
            />
            <Layout className="px-3">
              <Content>
                <Row gutter={[24, 24]} className="mt-2">
                  <Col span={24} xl={{ span: 12 }}>
                    <h4 style={{ textAlign: "center", marginTop: 20 }}>
                      Agregar Nuevo Personal
                    </h4>
                    <Form
                      onFinish={() => {
                        setOpen(true);
                      }}
                    >
                      <Row gutter={[12, 12]}>
                        <Col span={24} xxl={{ span: 20, offset: 2 }}>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message:
                                  "Por favor introduzca su profesión...",
                              },
                            ]}
                            label="Profesión/ Nombres: "
                            name="nombre"
                          >
                            <Space.Compact style={{ width: "100%" }}>
                              <Input
                                style={{ width: "30%" }}
                                placeholder="Ej. Lic., Ing., Abog."
                                onChange={(ev) => {
                                  setPersona({
                                    ...persona,
                                    profesion: ev.target.value,
                                  });
                                }}
                              />
                              <Input
                                style={{ width: "70%" }}
                                placeholder="Introduzca el nombre"
                                onChange={(ev) => {
                                  setPersona({
                                    ...persona,
                                    nombres: ev.target.value,
                                  });
                                }}
                              />
                            </Space.Compact>
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                        >
                          <Form.Item label="Apellido Paterno: ">
                            <Input
                              placeholder="Introduzca el apellido paterno"
                              name="paterno"
                              onChange={(ev) => {
                                setPersona({
                                  ...persona,
                                  paterno: ev.target.value,
                                });
                              }}
                            ></Input>
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                        >
                          <Form.Item label="Apellido Materno: ">
                            <Input
                              placeholder="Introduzca el apellido materno"
                              name="materno"
                              onChange={(ev) => {
                                setPersona({
                                  ...persona,
                                  materno: ev.target.value,
                                });
                              }}
                            ></Input>
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                        >
                          <Space.Compact direction="horizontal" >
                            <Form.Item label="C.I. / Expedido:">
                              <InputNumber
                                required
                                maxLength={8}
                                name="ci"
                                className="w-100"
                                onChange={(ev: any) => {
                                  setPersona({ ...persona, ci: ev });
                                }}
                              />
                            </Form.Item>
                            <Form.Item
                              name={"complemento_d"}
                            >
                              <Input
                                className="w-100"
                                placeholder="Complemento (Opcional)"
                                value={persona.complemento}
                                onChange={(ev) => {
                                  setPersona({ ...persona, complemento: ev.target.value })
                                }}
                              />
                            </Form.Item>
                            <Form.Item>
                              <Select
                                style={{ width: 200 }}
                                value={persona.expedido}
                                defaultValue={persona.expedido}
                                onChange={(value) => {
                                  setPersona({ ...persona, expedido: value });
                                }}
                                options={departamentos}
                              />
                            </Form.Item>
                          </Space.Compact>
                        </Col>
                        <Col
                          span={24}
                          lg={{ span: 12 }}
                          xxl={{ span: 20, offset: 2 }}
                        >
                          <Form.Item
                            label="Celular: "

                            rules={[
                              {
                                required: true,
                                message:
                                  "Por favor introduzca su número de teléfono o celular...",
                              },
                            ]}
                            name={"celular"}
                          >
                            <InputNumber
                              name="celular"
                              className="w-100"
                              maxLength={8}
                              onChange={(ev: any) => {
                                setPersona({
                                  ...persona,
                                  celular: ev,
                                });
                              }}
                            ></InputNumber>
                          </Form.Item>
                        </Col>
                        <Col span={24} lg={{ span: 12 }} xxl={{ span: 10 }}>
                          <Form.Item label={"Fecha de nacimiento"}>
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
                              value={dayjs(persona.f_nacimiento)}
                              onChange={(ev) => {
                                setPersona({
                                  ...persona,
                                  f_nacimiento: ev!.toISOString(),
                                });
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          span={24}
                          lg={{ span: 12 }}
                          xxl={{ span: 10, offset: 2 }}
                        >
                          <Form.Item label="Rol:">
                            <Select
                              defaultValue={persona.cargo}
                              value={persona.cargo}
                              onChange={(ev) => {
                                setPersona({ ...persona, cargo: ev });
                              }}
                            >
                              <Select.Option value="1">Administrador</Select.Option>
                              <Select.Option value="2">Operador</Select.Option>
                              <Select.Option value="3">Visitante</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={10} lg={{ span: 12 }} xxl={{ span: 10 }}>
                          <Form.Item label="Género:">
                            <Radio.Group
                              value={persona.genero}
                              defaultValue={persona.genero}
                              className="w-100"
                              onChange={(ev) => {
                                setPersona({
                                  ...persona,
                                  genero: ev.target.value,
                                });
                              }}
                            >
                              <Radio value="Femenino"> Femenino </Radio>
                              <Radio value="Masculino"> Masculino </Radio>
                            </Radio.Group>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Button
                        style={{
                          display: "block",
                          margin: "10px auto",
                          width: "50%",
                        }}
                        htmlType="submit"
                      >
                        Aceptar
                      </Button>
                    </Form>
                  </Col>
                  <Col span={24} xl={{ span: 12 }}>
                    <Card style={{ textAlign: "center" }}>
                      <Meta
                        avatar={
                          <>
                            <Avatar
                              style={{
                                backgroundColor:
                                  persona.genero == "Femenino"
                                    ? "#ff0080"
                                    : "#0041c8",
                                color: "white",
                                width: 70,
                                height: 70,
                                fontSize: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto",
                              }}
                              icon={<UserOutlined />}
                            ></Avatar>
                            <p>
                              <span>C.I.: </span>
                              {`${persona.ci} ${persona.expedido}`}
                            </p>
                          </>
                        }
                        title={
                          <h5 style={{ textAlign: "center" }}>
                            Información de personal
                          </h5>
                        }
                        description={
                          <>
                            <Row>
                              <Col span={12}>
                                <p>
                                  <span>Nombre: </span>
                                  {persona.nombres}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Ap. Paterno: </span>
                                  {persona.paterno}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Ap. Materno: </span>
                                  {persona.materno}
                                </p>
                              </Col>
                              <Col span={24}>
                                <hr />
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Celular: </span>
                                  {persona.celular}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Cargo: </span>
                                  {cargos[Number.parseInt(persona.cargo) - 1]}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Fecha de nacimiento: </span>
                                  {dayjs(persona.f_nacimiento).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p>
                                  <span>Edad: </span>
                                  {
                                    -dayjs(persona.f_nacimiento).diff(
                                      now(),
                                      "years"
                                    )
                                  }{" "}
                                  años
                                </p>
                              </Col>
                            </Row>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title={<p style={{ textAlign: "center" }}>{"¿Continuar?"}</p>}
        open={open}
        onOk={() => {
          axios
            .post<{ status: number; id_persona: string }>(
              process.env.BACKEND_URL + "/persona/insert", { ...persona, usuario: usuario })
            .then((res) => {
              if (res.data.status == 1) {
                notification.success({
                  message:
                    "Personal agregado con éxito, ¿desea crear un usuario?",
                  role: "status",
                  duration: 20,
                  onClose() {
                    router.push("/dashboard/personal");
                  },
                  btn: (
                    <>
                      <Button
                        onClick={() => {
                          router.replace(
                            "/dashboard/usuarios/agregar?id_persona=" +
                            res.data.id_persona
                          );
                        }}
                      >
                        Crear Usuario
                      </Button>
                    </>
                  ),
                });
                setOpen(false);
              } else {
                notification.error({
                  message: "Ha ocurrido un error en el servidor",
                  duration: 8,
                });
              }
            })
            .catch(() => {
              notification.error({
                message: "Ha ocurrido un error al crear la persona...",
              });
            });
        }}
        onCancel={() => {
          setOpen(false);
        }}
        okText="Sí"
        cancelText="No"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <QuestionCircleOutlined
            style={{ fontSize: "4em", color: "#555", marginBottom: ".5em" }}
          />
          <p className="h5 text-center">
            ¿Está seguro de agregar al nuevo personal?
          </p>
        </div>
      </Modal>
    </main>
  );
};


export default AgregarPersonal;
