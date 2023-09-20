import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import { Content } from "antd/es/layout/layout";
import locale from "antd/es/date-picker/locale/es_ES";
import { Persona, dias, meses } from "../personal/agregar/data";
import dayjs from "dayjs";
import { NextPage } from "next";
import axios from "axios";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import moment from "moment";
import { departamentos } from "../casos/nuevocaso/data";
interface Props {
  persona: Persona;
  setPersona: any;
}

const DatosPersonales: NextPage<Props> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        title="CONFIRMAR"
        okText="Sí"
        cancelText="No"
        open={open}
        onOk={() => {
          axios
            .post(process.env.BACKEND_URL + "/persona/update", {
              ...props.persona,
            })
            .then((res) => {
              if (res.data.status == 1) {
                notification.success({
                  message:
                    "Datos personales modificados con éxito, vuelva a iniciar sesión para cambios",
                  duration: 10,
                  btn: (
                    <>
                      <Button
                        onClick={() => {
                          signOut({ redirect: true });
                        }}
                      >
                        Cerrar Sesión
                      </Button>
                    </>
                  ),
                });
                setOpen(false);
              } else {
                notification.error({
                  message: "Error en el servidor...",
                });
              }
            });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div className="column-centered">
          <QuestionCircleOutlined
            style={{ fontSize: "4em", color: "#555", marginBottom: ".5em" }}
          />
          <p className="h5 text-center">
            ¿Está seguro en realizar los cambios?
          </p>
        </div>
      </Modal>
      <Content className="mt-2">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={{ span: 12 }}>
            <Form
              onFinish={() => {
                setOpen(true);
              }}
            >
              <Row gutter={[24, 24]}>
                <Col span={24} md={{ span: 10, offset: 2 }}>
                  <Form.Item label="Profesión:">
                    <Input
                      required
                      name="profesion"
                      value={props.persona.profesion}
                      onChange={(ev) => {
                        props.setPersona({
                          ...props.persona,
                          profesion: ev.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 10 }}>
                  <Form.Item label="Celular:">
                    <InputNumber
                      style={{ width: "100%" }}
                      name="celular"
                      required
                      onChange={(ev) => {
                        props.setPersona({
                          ...props.persona,
                          celular: ev,
                        });
                      }}
                      value={props.persona.celular}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 11, offset: 2 }}>
                  <Space.Compact>
                    <Form.Item label="C.I. / Expedido:">
                      <InputNumber
                        required
                        name="ci"
                        value={props.persona.ci}
                        style={{ width: "100%" }}
                        onChange={(ev) => {
                          props.setPersona({
                            ...props.persona,
                            ci: ev,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Select
                        aria-required
                        style={{ width: 120 }}
                        defaultValue="LP"
                        options={departamentos}
                      />
                    </Form.Item>
                  </Space.Compact>
                </Col>

                <Col span={24} md={{ span: 9 }}>
                  <Form.Item label="Fecha de Nacimiento">
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      style={{ width: "100%" }}
                      aria-required
                      onChange={(value) => {
                        props.setPersona({
                          ...props.persona,
                          f_nacimiento: value?.format("DD-MM-YYYY"),
                        });
                      }}
                      locale={{
                        ...locale,
                        lang: {
                          ...locale.lang,
                          shortWeekDays: dias,
                          shortMonths: meses,
                        },
                      }}
                      value={dayjs(props.persona.f_nacimiento)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button
                style={{ display: "block", margin: "0 auto" }}
                key="ok"
                htmlType="submit"
                type="primary"
              >
                Aceptar y Modificar
              </Button>
            </Form>
          </Col>
          <Col span={24} lg={12}>
            <Card title="DATOS PERSONALES">
              <p>
                <b style={{ fontWeight: "bold" }}>Nombres y Apellidos: </b>
                {`${props.persona.nombres} ${props.persona.paterno} ${props.persona.materno}`}
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>C.I.: </b>
                {props.persona.ci}
                <b style={{ fontWeight: "bold", marginLeft: 20 }}>Expedido: </b>
                {props.persona.expedido}
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>Fecha de nacimiento: </b>
                {props.persona.f_nacimiento}
                <b style={{ fontWeight: "bold", marginLeft: 20 }}> Edad: </b>
                {-dayjs(props.persona.f_nacimiento).diff(moment.now(), "years")}
              </p>
              <p>
                <b style={{ fontWeight: "bold" }}>C.I.: </b>
                {props.persona.ci}
              </p>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default DatosPersonales;
