"use client";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Row,
  Select,
  Tag,
  message,
  notification,
} from "antd";
import { NextPage } from "next";

import { createContext, useEffect, useState } from "react";
import { HomeFilled } from "@ant-design/icons";
import { Domicilio } from "../data";
import "../estilos.scss";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  domicilio: Domicilio;
  setDomicilio: any;
  domicilios: Domicilio[];
  setDomicilios: any;
}
const FormDomicilio: NextPage<Props> = (props) => {
  //cambio del estado de domicilio
  return (
    <>
      <Col span={24} style={{ marginBottom: 20 }}>
        <h6>
          DOMICILIO DEL ADULTO MAYOR
        </h6>
      </Col>
      <Col span={24}>
        <Form>
          <Row gutter={24}>
            <Col span={24} lg={{ span: 16 }} >
              <Form.Item className="normal-input" label="Tipo de domicilio:">
                <Select
                  value={props.domicilio.tipo_domicilio}
                  defaultValue={props.domicilio.tipo_domicilio}
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      tipo_domicilio: value,
                    })
                  }
                >
                  <Select.Option value="Propio">Propio</Select.Option>
                  <Select.Option value="Alquilado">Alquilado</Select.Option>
                  <Select.Option value="Anticretico">Anticrético</Select.Option>
                  <Select.Option value="Cedido">Cedido</Select.Option>
                  <Select.Option value="Otro">Otro</Select.Option>
                </Select>
                <Input
                  hidden={props.domicilio.tipo_domicilio != "Otro"}
                  placeholder="Especifique"
                  className="normal-input mt-3"
                  value={props.domicilio.otro_domicilio}
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={{ span: 8 }}>
              <Form.Item className="normal-input" label="Distrito:">
                <Select
                  defaultValue={props.domicilio.distrito}
                  value={props.domicilio.distrito}
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      distrito: value,
                    })
                  }
                >
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((value) => (
                    <Select.Option key={value} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Zona:">
                <Input
                  value={props.domicilio.zona}
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      zona: value.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Calle o Av.:">
                <Input
                  className="normal-input"
                  value={props.domicilio.calle_av}
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      calle_av: value.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <Form.Item label="N° de vivienda:">
                <InputNumber
                  value={props.domicilio.nro_vivienda}
                  min={1}
                  className="w-100"
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      nro_vivienda: value,
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <Form.Item label="Área:">
                <Select
                  defaultValue={props.domicilio.area}
                  value={props.domicilio.area}
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      area: value,
                    })
                  }
                >
                  <Select.Option value="Urbano">Urbano</Select.Option>
                  <Select.Option value="Rural">Rural</Select.Option>
                  <Select.Option value="Otro">Otro Municipio</Select.Option>
                </Select>
                <Input
                  hidden={props.domicilio.area != "Otro"}
                  placeholder="Especifique"
                  className="mt-3"
                  onChange={(value) =>
                    props.setDomicilio({
                      ...props.domicilio,
                      otra_area: value.target.value,
                    })
                  }
                  value={props.domicilio.otra_area}
                />
              </Form.Item>
            </Col>
            <Col span={20} offset={2}>
              <Button
                onClick={() => {
                  notification.info({
                    message:
                      "Por favor, coloque los nuevos datos del domicilio o reviertalo desde el historial...",
                    duration: 10,
                  });
                  props.setDomicilio({
                    ...props.domicilio,
                    tipo_domicilio: "Propio",
                    distrito: 1,
                    zona: "",
                    calle_av: "",
                    nro_vivienda: null,
                    area: "urbano",
                    otra_area: "",
                    otro_tipo: "",
                    actual: 0,
                  });

                  props.setDomicilios([
                    ...props.domicilios.map((value) => {
                      if (value.id_domicilio == props.domicilio.id_domicilio) {
                        value.actual = 0;
                      }
                      return value;
                    }),
                  ]);
                }}
                className="w-100 my-4"
              >
                Limpiar datos
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col
        span={24}
        style={{
          border: "1px solid #CCC",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Row>
          <Col span={24}>
            {props.domicilios.length == 0 ? (
              <>
                <b>Historial de domicilios: </b>
                <br />
                <small>
                  {"(Puede hacer click para seleccionarlo como actual)"}
                </small>
                <hr />
                <h6 style={{ color: "red" }}>
                  La persona no tiene un historial con otros domicilios
                </h6>
              </>
            ) : (
              <>
                <b style={{ fontSize: 16 }}>Historial de domicilios</b>
                <br />
                <small>
                  {"(Puede hacer click para seleccionarlo como actual)"}
                </small>
                <hr />
                <List
                  style={{ overflowY: "scroll", maxHeight: 200 }}
                  itemLayout="horizontal"
                  dataSource={props.domicilios}
                  renderItem={(item, index) => (
                    <List.Item
                      onClick={() => {
                        if (props.domicilio.id_domicilio != item.id_domicilio) {
                          props.setDomicilio(item);
                          props.setDomicilios([
                            ...props.domicilios.map((value) => {
                              if (
                                value.id_domicilio ==
                                props.domicilio.id_domicilio
                              ) {
                                value.actual = 0;
                              } else {
                                value.actual = 1;
                              }
                              return value;
                            }),
                          ]);
                          message.info({
                            content:
                              "Se seleccionó el domicilio " + item.id_domicilio,
                          });
                        }
                      }}
                      className="list-item-hover"
                    >
                      <List.Item.Meta
                        style={{ textAlign: "start" }}
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: "gray",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            icon={<HomeFilled />}
                          ></Avatar>
                        }
                        title={
                          <>
                            <b style={{ marginRight: 10 }}>
                              {item.id_domicilio}
                            </b>
                            {item.actual == 1 ? (
                              <Tag color="#198754">Actual</Tag>
                            ) : (
                              <Tag color="#f50">Antiguo</Tag>
                            )}
                          </>
                        }
                        description={
                          <p style={{ color: "#666" }}>
                            {item.zona}, <b>Calle: </b>
                            {item.calle_av}, <b>Nro: </b>
                            {item.nro_vivienda},<b>Distrito: </b>
                            {item.distrito}
                          </p>
                        }
                      />

                      <div></div>
                    </List.Item>
                  )}
                />
              </>
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default FormDomicilio;
