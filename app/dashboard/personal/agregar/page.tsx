"use client";
import {
  Avatar,
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
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import Meta from "antd/es/card/Meta";
import locale from "antd/es/date-picker/locale/es_ES";
import { Persona, dataPersona, dias, meses } from "./data";
import dayjs from "dayjs";
import { useState } from "react";
import "./estilos.scss";
import { now } from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";
const AgregarPersonal = () => {
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [open, setOpen] = useState(false);
  const router = useRouter();
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
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <Row gutter={[24, 24]} className="mt-3">
                    <Col span={24} lg={{ span: 16 }}>
                      <h4 style={{ textAlign: "center", marginTop: 20 }}>
                        Agregar Nuevo Personal
                      </h4>
                      <Form
                        onFinish={() => {
                          setOpen(true);
                        }}
                      >
                        <Row gutter={[12, 12]}>
                          <Col span={24} sm={{ span: 14 }}>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Por favor introduzca su nombre paterno",
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
                                  placeholder="Introduzca su nombre..."
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
                          <Col span={24} sm={{ span: 10 }}>
                            <Form.Item label="Apellido Paterno: ">
                              <Input
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
                          <Col span={24} sm={{ span: 10 }}>
                            <Form.Item label="Apellido Materno: ">
                              <Input
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
                          <Col span={24} sm={{ span: 12 }} lg={{ span: 6 }}>
                            <Form.Item
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Por favor introduzca carnet de identidad...",
                                },
                              ]}
                              label="C.I.: "
                              name={"ci"}
                            >
                              <InputNumber
                                className="w-100"
                                name="ci"
                                onChange={(ev: any) => {
                                  setPersona({ ...persona, ci: ev });
                                }}
                              ></InputNumber>
                            </Form.Item>
                          </Col>
                          <Col span={24} sm={{ span: 12 }} lg={{ span: 6 }}>
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
                                onChange={(ev: any) => {
                                  setPersona({
                                    ...persona,
                                    celular: ev,
                                  });
                                }}
                              ></InputNumber>
                            </Form.Item>
                          </Col>
                          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Form.Item label={"Fecha de nacimiento"}>
                              <DatePicker
                                className="normal-input"
                                locale={{
                                  ...locale,
                                  lang: {
                                    ...locale.lang,
                                    shortWeekDays: dias,
                                    shortMonths: meses,
                                  },
                                }}
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
                          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Form.Item label="Rol:">
                              <Select
                                defaultValue={persona.cargo}
                                value={persona.cargo}
                                onChange={(ev) => {
                                  setPersona({ ...persona, cargo: ev });
                                }}
                              >
                                <Select.Option value="Operador">
                                  Operador
                                </Select.Option>
                                <Select.Option value="Visitante">
                                  Visitante
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={10} md={{ span: 12 }} xl={{ span: 8 }}>
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
                          <Button
                            style={{ margin: "10px auto", width: "50%" }}
                            htmlType="submit"
                          >
                            Aceptar
                          </Button>
                        </Row>
                      </Form>
                    </Col>
                    <Col span={24} lg={8}>
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
                                {persona.ci}
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
                                    {persona.cargo}
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
              process.env.BACKEND_URL + "/persona/insert",
              persona
            )
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
                            "/dashboard/usuario/agregar?id_persona" +
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
