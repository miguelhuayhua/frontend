"use client";
import { Button, Col, Modal, Popconfirm, Row, Skeleton, Slider } from "antd";
import { NextPage } from "next";

import { createContext } from "react";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { Denunciado, dataDenunciado } from "../data";
import { Adulto } from "../../adultos/data";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  setOpen: any;
  open: boolean;

  denunciado: Denunciado;
  setDenunciado: any;
  setDenunciados: any;
  loaded: boolean;
  setDisplayDenunciados: any;
  adulto: Adulto;
}
const DenunciadoModal: NextPage<Props> = (props) => {
  //control del modal
  const handleConfirm = () => {
    props.setOpen(false);
    axios
      .post("http://localhost:8000/denunciado/update", { ...props.denunciado })
      .then((res) => {});
  };
  const handleHideModal = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Modal
        key="modal"
        title={`EDITE LOS VALORES PARA EL Denunciado(A) DE ${props.adulto.nombre.toLocaleUpperCase()} ${props.adulto.paterno.toLocaleUpperCase()} ${props.adulto.materno.toLocaleUpperCase()}`}
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
                    {moment(props.denunciado.ult_modificacion).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col>acá va lo demas</Col>
          </Row>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 4 }}></Skeleton>
        )}
      </Modal>
    </>
  );
};
export default DenunciadoModal;
