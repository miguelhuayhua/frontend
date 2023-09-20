"use client";
import { Col, Form, Input, InputNumber, Row } from "antd";

import {
  CopyOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

const Perfil = () => {
  return (
    <>
      <Content>
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <Form>
              <Row gutter={[24, 24]}>
                <Col span={24} md={{ span: 16 }}>
                  <Form.Item label="Usuario: ">
                    <Input name="usuario" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Por favor introduzca su contraseña",
                      },
                    ]}
                    label="Contraseña "
                    hasFeedback
                    name="pass1"
                  >
                    <Input.Password
                      className="input-style"
                      placeholder="Ingrese la nueva contraseña..."
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Verifique la nueva contraseña",
                      },

                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("pass1") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("¡Las contraseñas no coinciden!")
                          );
                        },
                      }),
                    ]}
                    dependencies={["pass1"]}
                    hasFeedback
                    label="Verificar contraseña: "
                    name="pass2"
                  >
                    <Input.Password
                      className="input-style"
                      placeholder="Verifique la nueva contraseña..."
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Perfil;
