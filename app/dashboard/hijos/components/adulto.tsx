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
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  setOpen: any;
  open: boolean;
}
const AdultoModal: NextPage<Props> = (props) => {
  //control del modal
  const handleConfirm = () => {};
  const handleHideModal = () => {
    props.setOpen(false);
  };

  //cambio del estado de caso

  return (
    <>
      <Modal
        key="modal"
        title={"EDITE LOS VALORES PARA EL CASO "}
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
              <Col span={8}></Col>
            </Row>
          </Col>
          <Col span={12}>
            <Form layout="horizontal"></Form>
          </Col>
          <Col
            span={12}
            style={{ border: "1px solid #CCC", padding: 10, borderRadius: 10 }}
          >
            <h5 className="text-center">Personas Involucradas</h5>
            <Row>
              <hr />
              <Col span={12}></Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>C.I.:</b>
                  </span>
                  <br />
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>Edad: </b>
                  </span>
                  <br />
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <span>
                    <b>Número de referencia:</b>
                  </span>
                  <br />
                </p>
              </Col>
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
                <h6>Hijos</h6>
                <Space direction="vertical"></Space>
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
                    </p>
                  </Col>

                  <Col span={24}>
                    <p>
                      <span>
                        <b>Parentezco con la persona adulta mayor: </b>
                      </span>
                      <br />
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
export default AdultoModal;
