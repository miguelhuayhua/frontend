"use client";
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Radio,
  Row,
  Segmented,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  Tag,
  TreeSelect,
  Upload,
  message,
  notification,
} from "antd";
import { NextPage } from "next";

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Caso } from "../data";
import { SwitchChangeEventHandler } from "antd/es/switch";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { AdultoMayor } from "../../nuevocaso/data";
export const DataContext = createContext({});
//ROUTING

//PDF
interface Props {
  open: boolean;
  setOpen: any;
  caso: Caso;
  adultoMayor: AdultoMayor;
}
const CasoModal: NextPage<Props> = (props) => {
  const { RangePicker } = DatePicker;
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const handleChangeHijo = (ev: any) => {
    console.log(ev);
  };
  return (
    <>
      <Modal
        title={"EDITE LOS VALORES PARA EL CASO " + props.caso.nro_caso}
        centered
        style={{ textAlign: "center" }}
        open={props.open}
        onOk={() => props.setOpen(false)}
        onCancel={() => props.setOpen(false)}
        width={"90%"}
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
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              layout="horizontal"
            >
              <Form.Item label="Select">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="TextArea">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Switch" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="Button">
                <Button>Button</Button>
              </Form.Item>
              <Form.Item label="Slider">
                <Slider />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
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
                      onChange={handleChangeHijo}
                      options={props.adultoMayor.hijos.map((hijo) => {
                        return {
                          label: (
                            <div style={{ padding: 4 }}>
                              <Avatar icon={<UserOutlined />}></Avatar>
                              <div>{hijo}</div>
                            </div>
                          ),
                          value: hijo,
                        };
                      })}
                    />
                  )}
                </Space>
              </Col>
              <Col style={{ borderLeft: "1px solid #AAA" }} span={12}>
                <h6>Denunciado</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default CasoModal;
