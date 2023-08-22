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
  Space,
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
            message: `Personal ${
              props.persona.nombres +
              " " +
              props.persona.paterno +
              " " +
              props.persona.materno
            } editado con éxito`,
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
  return (
    <>
      <Modal
        key="modal"
        title={`EDITE LOS VALORES PARA EL PERSONAL ${
          props.persona.nombres +
          " " +
          props.persona.paterno +
          " " +
          props.persona.materno
        }`}
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
            title="¿Estás seguro de editar?"
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
          <Button
            key="cancel"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            Cancelar
          </Button>,
        ]}
      >
        {props.loaded ? (
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
                  label="Profesión/ Nombres: "
                  name="nombre"
                >
                  <Space.Compact style={{ width: "100%" }}>
                    <Input
                      style={{ width: "30%" }}
                      placeholder="Ej. Lic., Ing., Abog."
                      onChange={(ev) => {
                        props.setPersona({
                          ...props.persona,
                          profesion: ev.target.value,
                        });
                      }}
                      value={props.persona.profesion}
                    />
                    <Input
                      style={{ width: "70%" }}
                      placeholder="Introduzca su nombre..."
                      onChange={(ev) => {
                        props.setPersona({
                          ...props.persona,
                          nombres: ev.target.value,
                        });
                      }}
                      value={props.persona.nombres}
                    />
                  </Space.Compact>
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
                    value={props.persona.paterno}
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
                    value={props.persona.materno}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={24} sm={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Por favor introduzca carnet de identidad...",
                    },
                  ]}
                  label="C.I.: "
                >
                  <InputNumber
                    className="w-100"
                    onChange={(ev: any) => {
                      props.setPersona({ ...props.persona, ci: ev });
                    }}
                    value={props.persona.ci}
                  ></InputNumber>
                </Form.Item>
              </Col>
              <Col span={24} sm={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Item label="Celular: ">
                  <InputNumber
                    name="celular"
                    className="w-100"
                    onChange={(ev: any) => {
                      props.setPersona({
                        ...props.persona,
                        celular: ev,
                      });
                    }}
                    value={props.persona.celular}
                  ></InputNumber>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 4 }}></Skeleton>
        )}
      </Modal>
    </>
  );
};

export default PersonaModal;
