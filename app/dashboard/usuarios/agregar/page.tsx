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
  message,
  notification,
} from "antd";
import MenuSider from "../../components/MenuSider";
import { Content } from "antd/es/layout/layout";
import Navbar from "../../components/Navbar";
import {
  CopyOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import Meta from "antd/es/card/Meta";

import { useEffect, useState } from "react";
import "./estilos.scss";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/dist/client/router";
import Search from "antd/es/transfer/search";
import { Persona, dataPersona } from "../../personal/agregar/data";
import { Usuario, dataUsuario } from "../data";
import axios from "axios";
import dayjs from "dayjs";
import { now } from "moment";
const AgregarUsuarios = () => {
  const [open, setOpen] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [personasDisplay, setDisplayPersonas] = useState<Persona[]>([]);
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  const params = useSearchParams();
  useEffect(() => {
    let id_persona = params.get("id_persona");
    if (id_persona) {
      axios
        .post<Persona>("http://localhost:8000/persona/get", { id_persona })
        .then((res) => {
          if (res.data) {
            setPersona(res.data);
          }
        });
    }
  }, []);

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
                  <Row gutter={[24, 24]}>
                    <Col span={24} lg={{ span: 16 }}>
                      <h4 style={{ textAlign: "center", marginTop: 20 }}>
                        Crear un nuevo usuario
                      </h4>
                      <Form
                        onFinish={() => {
                          setOpen(true);
                        }}
                      >
                        <Row gutter={[12, 12]}></Row>
                      </Form>
                    </Col>
                    <Col span={24} lg={8}>
                      <Search
                        placeholder="Introduzca CI de la persona"
                        onChange={(ev: any) => {}}
                      />
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
                                <span>C.I.:</span>
                                {persona.ci}
                                <Button
                                  style={{ marginLeft: 5 }}
                                  onClick={() => {
                                    const textField =
                                      document.createElement("textarea");
                                    textField.innerText = persona.ci.toString();
                                    document.body.appendChild(textField);
                                    textField.select();
                                    navigator.clipboard
                                      .writeText(persona.ci.toString())
                                      .then(() => {
                                        textField.remove();
                                        message.success(
                                          "¡CI - Personal, copiado al portapapeles!"
                                        );
                                      });
                                  }}
                                  icon={<CopyOutlined color="blue" />}
                                ></Button>
                              </p>
                            </>
                          }
                          title={
                            <h5 style={{ textAlign: "center" }}>
                              Información de personal seleccionado
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
                                    }
                                    {" años"}
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
          setOpen(false);
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

export default AgregarUsuarios;
