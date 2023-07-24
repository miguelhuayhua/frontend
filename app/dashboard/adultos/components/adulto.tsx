"use client";
import {
  Button,
  Col,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  notification,
} from "antd";
import { NextPage } from "next";

import { createContext, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Adulto, Domicilio } from "../data";
import FormAdulto from "./formadulto";
import FormDomicilio from "./formdomicilio";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  setOpen: any;
  open: boolean;
  adulto: Adulto;
  setAdulto: any;
  setAdultos: any;
  loaded: boolean;
  setDisplayAdultos: any;
  domicilio: Domicilio;
  setDomicilio: any;
  setLoaded: any;
  domicilios: Domicilio[];
  setDomicilios: any;
}
const AdultoModal: NextPage<Props> = (props) => {
  //control del modal

  const handleConfirm = () => {
    props.setOpen(false);
    axios
      .post("http://localhost:8000/adulto/update", { ...props.adulto })
      .then((res) => {
        let tipo = props.domicilio.actual == 1 ? "update" : "insert";
        axios
          .post("http://localhost:8000/domicilio/" + tipo, {
            ...props.domicilio,
          })
          .then((res) => {
            if (res.data.status == 1) {
              notification.success({
                message: "¡Los datos del adulto mayor se  modificó con éxito!",
              });
              axios
                .get<Adulto[]>("http://localhost:8000/adulto/all")
                .then((res) => {
                  props.setAdultos(res.data);
                  props.setDisplayAdultos(res.data);
                });
            } else {
              notification.error({
                message:
                  "No se pudo modificar los datos de la persona adulta...",
              });
            }
          });
      });
  };
  const handleHideModal = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Modal
        key="modal"
        title={"EDITE LOS VALORES DEL ADULTO MAYOR "}
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
        {props.loaded ? (
          <Row gutter={24}>
            <Col span={24}>
              <Row>
                <Col span={4} style={{ marginBottom: 20 }}>
                  <p style={{ color: "gray" }}>
                    <span>Última modifcación: </span>
                    {moment(props.adulto.ult_modificacion).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </Col>
              </Row>
            </Col>
            <FormAdulto
              adulto={props.adulto}
              setAdulto={props.setAdulto}
            ></FormAdulto>
            <FormDomicilio
              domicilio={props.domicilio}
              setDomicilio={props.setDomicilio}
              domicilios={props.domicilios}
              setDomicilios={props.setDomicilios}
            ></FormDomicilio>
          </Row>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 4 }}></Skeleton>
        )}
      </Modal>
    </>
  );
};
export default AdultoModal;
