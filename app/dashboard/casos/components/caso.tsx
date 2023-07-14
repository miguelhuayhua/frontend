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
import { AdultoMayor, AdultoMayor2 } from "../nuevocaso/data";
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
  const handleConfirm = () => {
    props.setOpen(false);
    axios
      .post("http://localhost:8000/caso/update", { ...props.caso })
      .then((res) => {
        if (res.data.status == 1) {
          notification.success({ message: "¡El caso se  modificó con éxito!" });
          axios.get<Caso[]>("http://localhost:8000/caso/all").then((res) => {
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
        title={"EDITE LOS VALORES PARA EL CASO " + props.caso.nro_caso}
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
        <Row>
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
          <Col span={12}>
            <Form layout="horizontal">
              <Form.Item label="Descripción de los Hechos">
                <TextArea
                  style={{ maxHeight: 200, width: "90%" }}
                  value={props.caso.descripcion_hechos}
                  onChange={handleDescripcion}
                />
              </Form.Item>
              <Form.Item label="Petición del adulto">
                <TextArea
                  style={{ maxHeight: 200, width: "90%" }}
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
          </Col>
          <Col
            span={12}
            style={{ border: "1px solid #CCC", padding: 10, borderRadius: 10 }}
          >
            <h5 className="text-center">Personas Involucradas</h5>
            <Row>
              <hr />
              <Col span={12}>
                <p>
                  <span>
                    <b>Nombres y Apellidos del adulto mayor:</b>
                  </span>
                  <br />
                  {props.adultoMayor.nombre +
                    " " +
                    props.adultoMayor.paterno +
                    " " +
                    props.adultoMayor.materno}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>C.I.:</b>
                  </span>
                  <br />
                  {props.adultoMayor.ci}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>Edad: </b>
                  </span>
                  <br />
                  {props.adultoMayor.edad}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>Número de referencia:</b>
                  </span>
                  <br />
                  {props.adultoMayor.referencia}
                </p>
              </Col>
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
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
                              <Avatar icon={<UserOutlined />}></Avatar>
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
              <Col style={{ borderLeft: "1px solid #AAA" }} span={12}>
                <h6>Denunciado</h6>
                <Row>
                  <Col span={24}>
                    <p>
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
                    <p>
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
      </Modal>
    </>
  );
};
export default CasoModal;
