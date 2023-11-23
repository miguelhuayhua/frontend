"use client";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import {
  Button,
  Col,
  Drawer,
  Form,
  List,
  Popconfirm,
  Row,
  notification,
  Typography,
} from "antd";
import { NextPage } from "next";
import { Adulto } from "../../adultos/data";
import { Caso, Seguimiento } from "../data";
import { Persona, dataPersona } from "../../personal/agregar/data";
import { createContext, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import FormularioSeguimiento from "./pdf-seguimiento";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Hijo } from "../../hijos/data";
import { AiOutlineFilePdf } from "react-icons/ai";
export const DataContext = createContext({});
import "./estilos.scss";
import { Usuario } from "../../usuarios/data";
import dayjs from "dayjs";
interface Props {
  caso: Caso;
  adulto: Adulto;
  seguimiento: Seguimiento;
  setSeguimiento: any;
  persona: Persona;
  usuario: Usuario;
}

interface Props {
  caso: Caso;
  adulto: Adulto;
  seguimiento: Seguimiento;
  setSeguimiento: any;
  persona: Persona;
  usuario: Usuario;
}
const SeguimientoOptions: NextPage<Props> = (props) => {

  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [seguimientos, setSeguimientos] = useState<Seguimiento[]>([]);
  //cambio del estado de caso

  const getData = () => {
    axios
      .post<Seguimiento[]>(process.env.BACKEND_URL + "/caso/seguimiento/all", {
        id_caso: params.get('id_caso')
      })
      .then((res) => {
        setSeguimientos(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Row gutter={[24, 24]}>
        <Col span={24} xl={{ span: 12 }}>
          <div className="detalle-seguimiento">
            <p style={{ textAlign: "start", display: "flex", flexDirection: 'column' }}>
              <b className="fw-bold">
                Fecha de seguimiento: </b>
              {dayjs(props.seguimiento.fecha_seguimiento).format('DD/MM/YYYY')}
              <br />
              <b className="fw-bold">
                Adulto mayor implicado: </b>
              {props.adulto.nombre +
                " " +
                props.adulto.paterno +
                " " +
                props.adulto.materno}
            </p>
          </div>
          <Form>
            <b className="fw-bold">
              Detalles seguimiento</b>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Por favor, inserte el seguimiento...",
                },
              ]}
            >
              <TextArea
                name="detalles"
                allowClear
                showCount
                autoSize={{ maxRows: 10, minRows: 2 }}
                maxLength={1000}
                onChange={(ev) => {
                  props.setSeguimiento({
                    ...props.seguimiento,
                    detalle_seguimiento: ev.target.value,
                  });
                }}
              ></TextArea>
            </Form.Item>
            <Popconfirm
              key="popconfirm"
              title="¿Estás seguro de continuar?"
              onConfirm={() => {
                notification.info({ message: "Guardando y generando...", duration: 10 });
                axios
                  .post(process.env.BACKEND_URL + "/caso/seguimiento/add", {
                    ...props.seguimiento,
                    id_caso: props.caso.id_caso,
                    usuario: props.usuario
                  })
                  .then((res) => {
                    if (res.data.status == 1) {
                      pdf(

                        <FormularioSeguimiento adulto={props.adulto}
                          caso={props.caso}
                          seguimiento={props.seguimiento}
                          persona={props.persona} />
                      )
                        .toBlob()
                        .then((blob) => {
                          notification.success({
                            message: "¡Guardado y generado con éxito!",
                            duration: 10
                          });
                          getData();
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement("a");
                          link.href = url;
                          let { nombre, paterno, materno } = props.adulto;

                          link.setAttribute(
                            "download",
                            nombre +
                            paterno +
                            materno +
                            props.seguimiento.fecha_seguimiento +
                            ".pdf"
                          );
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        });
                    }
                  });
              }}
              okText="Sí"
              cancelText="No"
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: 20 }}
              >
                Guardar y generar
              </Button>
            </Popconfirm>
            <Button
              style={{ marginTop: 20, marginLeft: 20 }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Vista Previa PDF
            </Button>
          </Form>
        </Col>
        <Col span={24} xl={{ span: 12 }}>
          <List
            header={<b>Historial de seguimientos</b>}
            pagination={{
              defaultPageSize: 8,
              size: "small",
              pageSize: 8,
              position: "bottom",
              align: "center",
            }}
            dataSource={seguimientos}
            rowKey={(seguimiento) => seguimiento.id_seguimiento}
            renderItem={(item, index) => (
              <List.Item>
                <>
                  <p style={{ fontSize: 11, }}>
                    <b className="fw-bold">Fecha y hora: </b>
                    <br />
                    {item.fecha_seguimiento + " " + item.hora_seguimiento}
                  </p>

                  <Typography.Paragraph
                    ellipsis={{
                      rows: 3,
                      expandable: true,
                      symbol: "Expandir",
                    }}
                    style={{ fontSize: 11 }}
                  >
                    <b className="fw-bold">Detalles: </b>
                    {item.detalle_seguimiento}
                  </Typography.Paragraph>
                  <Button
                    onClick={() => {
                      let caso: any = {};
                      axios
                        .post<Caso>(process.env.BACKEND_URL + "/caso/get", {
                          id_caso: props.caso.id_caso,
                        })
                        .then((res) => {
                          caso = res.data;
                          axios
                            .post<{ adulto: Adulto; hijos: Hijo[] }>(
                              process.env.BACKEND_URL + "/adulto/get",
                              {
                                id_adulto: caso.id_adulto,
                              }
                            )
                            .then((res) => {
                              pdf(
                                <FormularioSeguimiento adulto={res.data.adulto}
                                  caso={props.caso}
                                  seguimiento={item}
                                  persona={props.persona} />
                              )
                                .toBlob()
                                .then((blob) => {
                                  const url = URL.createObjectURL(blob);
                                  const link = document.createElement("a");
                                  link.href = url;
                                  let { nombre, paterno, materno } =
                                    props.adulto;

                                  link.setAttribute(
                                    "download",
                                    nombre +
                                    paterno +
                                    materno +
                                    props.seguimiento.fecha_seguimiento +
                                    ".pdf"
                                  );
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                });
                            });
                        });
                    }}
                    style={{ height: 45, margin: "0 10px" }}
                  >
                    <AiOutlineFilePdf
                      style={{
                        color: "#b51308",
                        fontSize: 30,
                      }}
                    />
                  </Button>
                </>
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
      <Drawer
        title={`Vista previa del Documento`}
        placement="right"
        size={"large"}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <PDFViewer showToolbar={false} style={{ width: "100%", height: 800 }}>
          <FormularioSeguimiento adulto={props.adulto}
            caso={props.caso}
            seguimiento={props.seguimiento}
            persona={props.persona} />
        </PDFViewer>
      </Drawer>
    </>
  );
};

export default SeguimientoOptions;
