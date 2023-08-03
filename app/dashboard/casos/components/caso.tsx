"use client";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Modal,
  Popconfirm,
  Row,
  Segmented,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
  notification,
} from "antd";
import { NextPage } from "next";

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { EditOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Caso, Denunciado, datosCaso } from "../data";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { AiFillFilePdf } from "react-icons/ai";

import { AdultoMayor2 } from "../nuevocaso/data";
import { pdf } from "@react-pdf/renderer";
import Formulario from "./pdf";
import { Domicilio } from "../../adultos/data";
import { useSession } from "next-auth/react";
import { Persona } from "../../personal/agregar/data";
import "./estilos.scss";
import SeguimientoModal from "./seguimiento";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  open: boolean;
  setOpen: any;
  caso: Caso;
  setCaso: any;
  adultoMayor: AdultoMayor2;
  denunciado: Denunciado;
  setCasos: any;
  setDisplayCasos: any;
}
const CasoModal: NextPage<Props> = (props) => {
  //control del modal
  const { data } = useSession();
  const handleConfirm = () => {
    props.setOpen(false);
    axios
      .post(process.env.BACKEND_URL + "/caso/update", { ...props.caso })
      .then((res) => {
        if (res.data.status == 1) {
          notification.success({
            message: `El caso ${props.caso.nro_caso} se modificó con éxito`,
            duration: 7,
          });
          axios
            .get<Caso[]>(process.env.BACKEND_URL + "/caso/all")
            .then((res) => {
              props.setCasos(res.data);
              props.setDisplayCasos(res.data);
            });
        } else {
          notification.error({ message: "No se pudo modificar el caso..." });
        }
      });
  };
  const handleHideModal = () => {
    props.setOpen(false);
  };

  //cambio del estado de caso
  const handleDescripcion = (value: any) => {
    props.setCaso({ ...props.caso, descripcion_hechos: value.target.value });
  };
  const handlePeticion = (value: any) => {
    props.setCaso({ ...props.caso, peticion: value.target.value });
  };
  const handleAcciones = (value: any) => {
    props.setCaso({ ...props.caso, accion_realizada: value });
  };

  return (
    <>
      <Modal
        key="modal"
        title={
          <p style={{ fontSize: 14 }}>
            EDITE LOS VALORES PARA EL CASO + {props.caso.nro_caso}
          </p>
        }
        centered
        style={{ textAlign: "center" }}
        open={props.open}
        onCancel={() => {
          props.setOpen(false);
        }}
        width={"90%"}
        footer={[
          <Popconfirm
            key="popconfirm"
            title="¿Estás seguro de continuar?"
            onConfirm={handleConfirm}
            okText="Sí"
            cancelText="No"
          >
            <Button key="ok" type="primary">
              Aceptar y Modificar
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={handleHideModal}>
            Cancelar
          </Button>,
        ]}
      >
        <Row gutter={[24, 0]}>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <p className="info">
                  <span>Fecha de Registro del caso: </span>
                  {props.caso.fecha_registro}
                </p>
              </Col>
              <Col span={8}>
                <p className="info">
                  <span>Hora de registro del caso: </span>
                  {props.caso.hora_registro}
                </p>
              </Col>
              <Col span={8}>
                <p className="info">
                  <span>Última modifcación: </span>
                  {moment(props.caso.ult_modificacion).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <Form layout="horizontal">
              <Form.Item label="Descripción de los Hechos">
                <TextArea
                  allowClear
                  showCount
                  maxLength={200}
                  style={{ height: 150, resize: "none" }}
                  value={props.caso.descripcion_hechos}
                  onChange={handleDescripcion}
                />
              </Form.Item>
              <Form.Item label="Petición del adulto">
                <TextArea
                  allowClear
                  showCount
                  maxLength={200}
                  style={{ height: 150, resize: "none" }}
                  value={props.caso.peticion}
                  onChange={handlePeticion}
                />
              </Form.Item>
              <Form.Item
                className="normal-input"
                label="Acciones realizadas con el caso:"
              >
                <Select
                  value={props.caso.accion_realizada}
                  onChange={handleAcciones}
                  style={{ width: "90%" }}
                >
                  <Select.Option value="Apertura">
                    Apertura de Caso
                  </Select.Option>
                  <Select.Option value="Orientacion">Orientación</Select.Option>
                  <Select.Option value="Citacion">Citación</Select.Option>
                  <Select.Option value="Derivacion">Derivación</Select.Option>
                </Select>
              </Form.Item>
            </Form>

            <div className="btn-container">
              <Button
                key={"btn-caso"}
                style={{
                  backgroundColor: "#b51308",
                }}
                onClick={async () => {
                  notification.info({
                    message: "Generando formulario, espere por favor...",
                  });
                  if (data) {
                    let { usuario } = data?.user as {
                      usuario: {
                        usuario: string;
                        estado: number;
                        fotografia: string;
                        id_persona: string;
                        id_usuario: string;
                      };
                    };
                    let persona = await axios.post<Persona>(
                      process.env.BACKEND_URL + "/persona/get",
                      {
                        id_persona: usuario.id_persona,
                      }
                    );
                    axios
                      .post<Domicilio>(
                        process.env.BACKEND_URL + "/domicilio/getByIdAdulto",
                        {
                          id_adulto: props.adultoMayor.id_adulto,
                        }
                      )
                      .then((res) => {
                        pdf(
                          <DataContext.Provider
                            value={{
                              datosGenerales: props.adultoMayor,
                              descripcionHechos: props.caso.descripcion_hechos,
                              descripcionPeticion: props.caso.peticion,
                              datosDenunciado: props.denunciado,
                              accionRealizada: props.caso.accion_realizada,
                              datosDenuncia: props.caso,
                              datosUbicacion: res.data,
                              persona: persona.data,
                            }}
                          >
                            <Formulario />
                          </DataContext.Provider>
                        )
                          .toBlob()
                          .then((blob) => {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            let { nombre, paterno, materno } =
                              props.adultoMayor;

                            link.setAttribute(
                              "download",
                              nombre +
                                paterno +
                                materno +
                                props.caso.fecha_registro +
                                ".pdf"
                            );
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            notification.success({
                              message: "Formulario generado con éxito",
                            });
                          })
                          .catch((e) => {
                            notification.error({ message: e });
                          });
                      });
                  }
                }}
              >
                <AiFillFilePdf style={{ fontSize: 25 }} />
                Generar Formulario
              </Button>
              <Button>Realizar seguimiento</Button>
            </div>
          </Col>
          <Col
            span={24}
            lg={{ span: 12 }}
            style={{ border: "1px solid #CCC", padding: 10, borderRadius: 10 }}
          >
            <h5 className="text-center">Personas Involucradas</h5>
            <Row>
              <hr />
              <Col span={6}>
                <Avatar
                  style={{
                    backgroundColor:
                      props.adultoMayor.sexo == "Femenino"
                        ? "#ff0080"
                        : "#0041c8",
                    color: "white",
                    width: 60,
                    height: 60,
                    fontSize: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                  icon={<UserOutlined />}
                ></Avatar>
              </Col>
              <Col span={18} style={{ textAlign: "start" }}>
                <p>
                  <span>
                    <b>Nombres y Apellidos del adulto mayor: </b>
                  </span>
                  {props.adultoMayor.nombre +
                    " " +
                    props.adultoMayor.paterno +
                    " " +
                    props.adultoMayor.materno}
                </p>
                <p>
                  <span>
                    <b>C.I.: </b>
                  </span>
                  {props.adultoMayor.ci}

                  <span>
                    <b> Edad: </b>
                  </span>
                  {props.adultoMayor.edad}
                  <span>
                    <b> Número de referencia: </b>
                  </span>
                  {props.adultoMayor.nro_referencia}
                </p>
              </Col>

              <Col span={24}>
                <hr />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <h6>Hijos</h6>
                <Space direction="vertical">
                  {props.adultoMayor.hijos.length == 0 ? (
                    <>
                      <h6>La persona no tiene hijos...</h6>
                    </>
                  ) : (
                    <Segmented
                      options={props.adultoMayor.hijos.map((hijo) => {
                        return {
                          label: (
                            <div
                              key={hijo.nombres_apellidos}
                              style={{ padding: 4 }}
                            >
                              <Avatar
                                style={{
                                  backgroundColor:
                                    hijo.genero == "Femenino"
                                      ? "#ff0080"
                                      : "#0041c8",
                                  color: "white",
                                  width: 30,
                                  height: 30,
                                  fontSize: 15,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  margin: "0 auto",
                                }}
                                icon={<UserOutlined />}
                              ></Avatar>
                              <div>{hijo.nombres_apellidos}</div>
                            </div>
                          ),
                          value: hijo.nombres_apellidos,
                        };
                      })}
                    />
                  )}
                </Space>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <h6>Denunciado</h6>
                <Row>
                  <Col span={6}>
                    <Avatar
                      style={{
                        backgroundColor:
                          props.denunciado.genero == "Femenino"
                            ? "#ff0080"
                            : "#0041c8",
                        color: "white",
                        width: 60,
                        height: 60,
                        fontSize: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                      icon={<UserOutlined />}
                    ></Avatar>
                  </Col>
                  <Col span={18}>
                    <Row>
                      <Col span={24}>
                        <p style={{ textAlign: "start" }}>
                          <span>
                            <b>Nombres y Apellidos del Denunciado:</b>
                          </span>
                          <br />
                          {props.denunciado.nombres +
                            " " +
                            props.denunciado.paterno +
                            " " +
                            props.denunciado.materno}
                        </p>
                      </Col>

                      <Col span={24}>
                        <p style={{ textAlign: "start" }}>
                          <span>
                            <b>Parentezco con la persona adulta mayor: </b>
                          </span>
                          <br />
                          {props.denunciado.parentezco}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      <SeguimientoModal
        caso={props.caso}
        setOpen={props.setOpen}
      ></SeguimientoModal>
    </>
  );
};
export default CasoModal;
