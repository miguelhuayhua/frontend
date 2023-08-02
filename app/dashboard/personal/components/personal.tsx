import { NextPage } from "next";
import { Persona } from "../agregar/data";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  notification,
} from "antd";
import axios from "axios";

interface Props {
  setOpen: any;
  open: boolean;
  persona: Persona;
  setPersona: any;
  setPersonas: any;
  loaded: boolean;
  setDisplayPersonas: any;
}
const PersonaModal: NextPage<Props> = (props) => {
  const handleConfirm = () => {
    axios
      .post<{ status: number }>(process.env.BACKEND_URL + "/persona/update", {
        ...props.persona,
      })
      .then((res) => {
        if (res.data.status == 1) {
          notification.success({
            message: ``,
          });
          props.setOpen(false);
          axios
            .get<Persona[]>(process.env.BACKEND_URL + "/persona/all")
            .then((res) => {
              props.setPersonas(res.data);
              props.setDisplayPersonas(res.data);
            });
        } else {
          notification.error({
            message: "No se pudo modificar los datos del personal...",
          });
        }
      });
  };
  const handleHideModal = () => {
    props.setOpen(false);
  };
  return (
    <>
      <Modal
        key="modal"
        title={`EDITE LOS VALORES PARA EL USUARIO`}
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
            <Button
              style={{ margin: "10px auto", width: 250 }}
              htmlType="submit"
              type="primary"
            >
              Aceptar y Modificar
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={() => {}}>
            Cancelar
          </Button>,
        ]}
      >
        {props.loaded ? (
          <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 16 }}>
              <h4 style={{ textAlign: "center", marginTop: 20 }}>
                Agregar Nuevo Personal
              </h4>
              <Form>
                <Row gutter={[12, 12]}>
                  <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Por favor introduzca su nombre paterno",
                        },
                      ]}
                      label="Nombres: "
                      name="nombre"
                    >
                      <Input
                        placeholder="Introduzca su nombre..."
                        onChange={(ev) => {
                          props.setPersona({
                            ...props.persona,
                            nombres: ev.target.value,
                          });
                        }}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item label="Apellido Paterno: ">
                      <Input
                        name="paterno"
                        onChange={(ev) => {
                          props.setPersona({
                            ...props.persona,
                            paterno: ev.target.value,
                          });
                        }}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
                    <Form.Item label="Apellido Materno: ">
                      <Input
                        name="materno"
                        onChange={(ev) => {
                          props.setPersona({
                            ...props.persona,
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
                          props.setPersona({ ...props.persona, ci: ev });
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
                          props.setPersona({
                            ...props.persona,
                            celular: ev,
                          });
                        }}
                      ></InputNumber>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 4 }}></Skeleton>
        )}
      </Modal>
    </>
  );
};

export default PersonaModal;
