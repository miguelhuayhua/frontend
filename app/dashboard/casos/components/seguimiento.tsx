import {
  Avatar,
  Button,
  Col,
  Form,
  Modal,
  Popconfirm,
  Row,
  Select,
  notification,
} from "antd";
import axios from "axios";
import { NextPage } from "next";
import { Caso } from "../data";
import TextArea from "antd/es/input/TextArea";
interface Props {
  caso: Caso;
  setOpen: any;
}

const SeguimientoModal: NextPage<Props> = (props) => {
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
        title={
          <p style={{ fontSize: 14 }}>
            EDITE LOS VALORES PARA EL CASO + {props.caso.nro_caso}
          </p>
        }
        centered
        style={{ textAlign: "center" }}
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
              Sí
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={handleHideModal}>
            Volver
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
                />
              </Form.Item>
              <Form.Item label="Petición del adulto">
                <TextArea
                  allowClear
                  showCount
                  maxLength={200}
                  style={{ height: 150, resize: "none" }}
                />
              </Form.Item>
              <Form.Item
                className="normal-input"
                label="Acciones realizadas con el caso:"
              >
                <Select
                  value={props.caso.accion_realizada}
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
            span={24}
            lg={{ span: 12 }}
            style={{ border: "1px solid #CCC", padding: 10, borderRadius: 10 }}
          >
            <h5 className="text-center">Personas Involucradas</h5>
            <Row>
              <hr />
              <Col span={6}></Col>
              <Col span={18} style={{ textAlign: "start" }}></Col>

              <Col span={24}>
                <hr />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <h6>Hijos</h6>
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <h6>Denunciado</h6>
                <Row>
                  <Col span={6}></Col>
                  <Col span={18}>
                    <Row></Row>
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

export default SeguimientoModal;
