"use client";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Row,
  message,
  notification,
  Image,
  Progress,
  Breadcrumb,
} from "antd";
import MenuSider from "../../components/MenuSider";
import { Content } from "antd/es/layout/layout";
import Navbar from "../../components/Navbar";
import {
  UserOutlined,
  QuestionCircleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HomeOutlined,
} from "@ant-design/icons";
import { FaRegImage } from "react-icons/fa";
import bcrypt from "bcryptjs";
import Meta from "antd/es/card/Meta";

import { useEffect, useState } from "react";
import "./estilos.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { Persona, dataPersona } from "../../personal/agregar/data";
import { Usuario, dataUsuario } from "../data";
import axios from "axios";
import dayjs from "dayjs";
import { now } from "moment";
import Search from "antd/es/input/Search";
import Dragger from "antd/es/upload/Dragger";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Paragraph from "antd/es/typography/Paragraph";
const AgregarUsuarios = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  const [ci, setCi] = useState("");
  const [progress, setProgress] = useState<{
    progress: number;
    status: any;
    message: string;
  }>({
    progress: 0,
    status: "normal",
    message: "Verificar y Crear",
  });

  const [file, setFile] = useState<any>(null);
  const params = useSearchParams();
  const [usuario2, setUsuario2] = useState<Usuario>(dataUsuario)
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
      setUsuario2({ ...usuario, password: "", ult_modificacion: "" })
      if (persona.cargo != "1") {
        router.back();
      }
      axios
        .get<Persona[]>(process.env.BACKEND_URL + "/persona/all")
        .then((res) => {
          setPersonas(res.data);
        });
      let id_persona = params.get("id_persona");
      if (id_persona) {
        axios
          .post<Persona>(process.env.BACKEND_URL + "/persona/get", {
            id_persona,
          })
          .then((res) => {
            if (res.data) {
              setPersona(res.data);
              setCi(res.data.ci.toString());
            }
          });
      }
    }
  }, [data]);
 
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="usuario1.1"
            defaultOpenKeys={["usuario1"]}
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
                      href={"/dashboard/usuarios"}
                    >
                      Usuarios
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard/usuarios/agregar"}
                    >
                      Agregar
                    </Link>
                  ),
                },
              ]}
            />
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <Row gutter={[24, 24]}>
                    <Col span={24} lg={{ span: 12 }}>
                      <h4 style={{ marginTop: 20 }}>Crear un nuevo usuario</h4>
                      <Form
                        onFinish={() => {
                          setTimeout(() => {
                            setProgress({ ...progress, progress: 80 });
                            if (persona.id_persona == "") {
                              notification.error({
                                message:
                                  "Por favor seleccione al personal encargado del nuevo usuario",
                              });
                              setProgress({
                                message: "Verificar",
                                progress: 0,
                                status: "normal",
                              });
                            } else if (file == null) {
                              notification.error({
                                message:
                                  "Por favor, inserte una imagen de usuario...",
                              });
                              setProgress({
                                message: "Verificar",
                                progress: 0,
                                status: "normal",
                              });
                            } else {
                              axios
                                .post<{ status: number }>(
                                  process.env.BACKEND_URL + "/usuario/verify",
                                  {
                                    ...usuario,
                                  }
                                )
                                .then((res) => {
                                  if (res.data.status == 1) {
                                    setProgress({
                                      progress: 100,
                                      message:
                                        "Verificación Completa (Disponible)",
                                      status: "success",
                                    });
                                    setOpen(true);
                                  } else {
                                    setProgress({
                                      progress: 80,
                                      message: "Verificar y Crear",
                                      status: "exception",
                                    });
                                    notification.error({
                                      message:
                                        "Usuario en uso, intente con otro...",
                                      onClose() {
                                        setProgress({
                                          message: "Verificar",
                                          progress: 0,
                                          status: "normal",
                                        });
                                      },
                                    });
                                  }
                                });
                            }
                          }, 500);
                        }}
                      >
                        <Row gutter={[12, 12]}>
                          <Col span={8}>
                            <Image
                              preview={{
                                width: "80%",
                                mask: (
                                  <b style={{ color: "white" }}>Ver Imagen</b>
                                ),
                              }}
                              src={file ? URL.createObjectURL(file) : ""}
                            ></Image>
                            <Dragger
                              height={150}
                              onRemove={() => {
                                setFile(null);
                              }}
                              multiple={false}
                              accept="image/png, image/jpeg"
                              maxCount={1}
                              customRequest={({ file: newFile, onSuccess }) => {
                                setTimeout(() => {
                                  // Almacenamos el nuevo archivo seleccionado en el estado file.
                                  let nuevoArchivo = newFile as File;
                                  setFile(nuevoArchivo);

                                  onSuccess!(null);
                                  message.success(
                                    `${nuevoArchivo.name} se cargó correctamente.`
                                  );
                                }, 2000);
                              }}
                            >
                              <>
                                <FaRegImage style={{ fontSize: 60 }} />
                                <p
                                  style={{
                                    textAlign: "center",
                                    padding: "10px 20px",
                                  }}
                                >
                                  Haga clic o suelte un archivo de tipo imagen
                                </p>
                              </>
                            </Dragger>
                          </Col>
                          <Col span={16}>
                            <Row gutter={[12, 12]}>
                              <Col span={24}>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor introduzca el nombre de usuario",
                                    },
                                  ]}
                                  label="Nombre de usuario: "
                                  name="usuario"
                                >
                                  <Input
                                    placeholder="Introduzca su nombre..."
                                    onChange={(ev) => {
                                      setUsuario({
                                        ...usuario,
                                        usuario: ev.target.value,
                                      });
                                    }}
                                  ></Input>
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Por favor introduzca su contraseña",
                                    },
                                  ]}
                                  label="Contraseña "
                                  hasFeedback
                                  name="pass1"
                                >
                                  <Input.Password
                                    className="input-style"
                                    placeholder="Ingrese su contraseña..."
                                    iconRender={(visible) =>
                                      visible ? (
                                        <EyeTwoTone />
                                      ) : (
                                        <EyeInvisibleOutlined />
                                      )
                                    }
                                    onChange={(value) => {
                                      setUsuario({
                                        ...usuario,
                                        password: value.target.value,
                                      });
                                    }}
                                    value={usuario.password}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: "Verifique su contraseña",
                                    },

                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (
                                          !value ||
                                          getFieldValue("pass1") === value
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error(
                                            "¡Las contraseñas no coinciden!"
                                          )
                                        );
                                      },
                                    }),
                                  ]}
                                  dependencies={["pass1"]}
                                  hasFeedback
                                  label="Verificar contraseña: "
                                  name="pass2"
                                >
                                  <Input.Password
                                    className="input-style"
                                    placeholder="Ingrese su contraseña..."
                                    iconRender={(visible) =>
                                      visible ? (
                                        <EyeTwoTone />
                                      ) : (
                                        <EyeInvisibleOutlined />
                                      )
                                    }
                                    onChange={(value) => {
                                      setUsuario({
                                        ...usuario,
                                        password: value.target.value,
                                      });
                                    }}
                                    value={usuario.password}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>

                          <Button
                            style={{ margin: "10px auto", width: "50%" }}
                            htmlType="submit"
                          >
                            {progress.progress != 0 ? (
                              <Progress
                                percent={progress.progress}
                                steps={5}
                                size="small"
                                status={progress.status}
                                strokeColor={"green"}
                              />
                            ) : (
                              <></>
                            )}
                            {progress.message}
                          </Button>
                        </Row>
                      </Form>
                    </Col>
                    <Col span={24} lg={{ span: 12 }} className="mt-2">
                      <Row gutter={[12, 12]}>
                        <Col span={12}>
                          <b>Buscar por CI:</b>
                          <Search
                            placeholder="Introduzca CI de la persona"
                            onChange={(ev: any) => {
                              setCi(ev.target.value);
                              let personaFinded = personas.find((persona) => {
                                return persona.ci == ev.target.value;
                              });
                              if (personaFinded) {
                                setPersona(personaFinded);
                              } else {
                                setPersona(dataPersona);
                              }
                            }}
                            value={ci}
                          />
                        </Col>
                        <Col span={12}>
                          <b>Buscar por nombres y apellidos:</b>
                          <Search
                            placeholder="Introduzca los nombres y apellidos de la persona"
                            onChange={(ev) => {
                              let personaFinded = personas.find((persona) => {
                                return `${persona.nombres} ${persona.paterno} ${persona.materno}`
                                  .toLowerCase()
                                  .includes(ev.target.value.toLowerCase());
                              });
                              if (personaFinded && ev.target.value) {
                                setPersona(personaFinded);
                              } else {
                                setPersona(dataPersona);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                      <Card className="mt-2">
                        <Meta
                          avatar={
                            persona.id_persona != "" ? (
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
                                <div className="d-flex align-items-center">
                                  <b>C.I.:</b>
                                  <Paragraph className="my-auto" copyable={{ tooltips: "Copiar", onCopy: () => message.success({ content: "Copiado exitosamente" }) }}>
                                    {persona.ci}
                                  </Paragraph>
                                </div>
                              </>
                            ) : (
                              <Avatar
                                style={{
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
                            )
                          }
                          title={<h5>Personal asociado a la cuenta</h5>}
                          description={
                            <>
                              {persona.id_persona != "" ? (
                                <>
                                  <p>
                                    <span>Nombre: </span>
                                    {persona.nombres}
                                  </p>
                                  <p>
                                    <span>Ap. Paterno: </span>
                                    {persona.paterno}
                                  </p>
                                  <p>
                                    <span>Ap. Materno: </span>
                                    {persona.materno}
                                  </p>
                                  <p>
                                    <span>Celular: </span>
                                    {persona.celular}
                                  </p>
                                  <p>
                                    <span>Cargo: </span>
                                    {persona.cargo}
                                  </p>
                                  <p>
                                    <span>Fecha de nacimiento: </span>
                                    {dayjs(persona.f_nacimiento).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </p>
                                  <p>
                                    <span>Edad: </span>
                                    {
                                      -dayjs(persona.f_nacimiento).diff(
                                        now(),
                                        "years"
                                      )
                                    }
                                    {" años"}
                                  </p>
                                </>
                              ) : (
                                <p>Sin información a mostrar </p>
                              )}
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
        onOk={async () => {
          setOpen(false);
          const formData = new FormData();
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(usuario.password, salt);
          formData.append("usuario", usuario.usuario);
          formData.append("password", hash);
          formData.append("fotografia", file);
          formData.append("id_persona", persona.id_persona);
          formData.append('id_usuario', usuario2.id_usuario)
          axios
            .post<{ status: number }>(
              process.env.BACKEND_URL + "/usuario/insert",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data", // Importante establecer este encabezado para el envío de FormData.
                },
              }
            )
            .then((res) => {
              if (res.data.status == 1) {
                notification.success({ message: "¡Usuario creado con éxito!" });
                router.replace("/dashboard/usuarios");
              }
            })
            .catch((res) => {
              notification.error({ message: "Ha ocurrido un error..." });
            });
        }}
        onCancel={() => {
          setOpen(false);
          setProgress({ message: "Verificar", progress: 0, status: "normal" });
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
            ¿Está seguro de crear el nuevo usuario?
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default AgregarUsuarios;
