"use client";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  notification,
} from "antd";
import { NextPage } from "next";
import { BsTextParagraph, BsFillTrash3Fill, BsPlus } from "react-icons/bs";
import { createContext, useState } from "react";
import { PiListMagnifyingGlassFill } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { Adulto } from "../../adultos/data";
import { Caso, Compromiso, Denunciado, dataCompromiso } from "../data";
import { Persona } from "../../personal/agregar/data";
import TextArea from "antd/es/input/TextArea";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { PDFViewer, pdf } from "@react-pdf/renderer";
import FormularioActaCompromiso from "./pdf-compromiso";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Usuario } from "../../usuarios/data";
interface Props {
  setOpen: any;
  open: boolean;
  caso: Caso;
  persona: Persona;
  adulto: Adulto;
  loaded: boolean;
  denunciado: Denunciado;
  setDenunciado: any;
  usuario: Usuario;
}

export const DataContext3 = createContext({});

const ModalActaCompromiso: NextPage<Props> = (props) => {
  const [compromisos, setCompromisos] = useState<Compromiso[]>([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [compromiso, setCompromiso] = useState<Compromiso>(dataCompromiso);
  const router = useRouter();
  return (
    <>
      <Modal
        key="modal"
        title={`ACTA DE COMPROMISO`}
        centered
        style={{ textAlign: "center" }}
        open={props.open}
        onCancel={() => {
          props.setOpen(false);
        }}
        footer={[
          <Button
            key={"btn-vista"}
            onClick={() => {
              setOpen(true);
            }}
          >
            Vista previa documento
            <FaEye
              style={{
                fontSize: 20,
                marginLeft: 10,
              }}
            />
          </Button>,

          <Button
            key={"btn-generar"}
            type="primary"
            onClick={() => {
              setOpen2(true);
            }}
          >
            Aceptar y Generar
          </Button>,
          <Button
            key="cancel"
            onClick={() => {
              props.setOpen(false);
            }}
          >
            Cancelar
          </Button>,
          ,
        ]}
      >
        {props.loaded ? (
          <Row gutter={24}>
            <Col span={24}>
              <Form>
                <Row gutter={[12, 30]}>
                  <Col span={24}>
                    <h6 className="text-center">Lista de compromisos:</h6>
                    <b>{"Compromiso nro. " + (compromisos.length + 1)}</b>
                    <Form.Item>
                      <TextArea
                        value={compromiso.compromiso}
                        onChange={(ev) => {
                          setCompromiso({
                            ...compromiso,
                            compromiso: ev.target.value,
                          });
                        }}
                        placeholder="Introduzca un compromiso..."
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                    <Button
                      onClick={() => {
                        setCompromisos([...compromisos, compromiso]);
                        setCompromiso(dataCompromiso);
                      }}
                    >
                      <BsPlus />
                      Agregar Compromiso
                    </Button>
                  </Col>
                  <Col span={24}>
                    <h6 className="my-0 py-0">
                      {"Denunciado(a): "}
                      {props.denunciado.nombres +
                        " " +
                        props.denunciado.paterno +
                        " " +
                        props.denunciado.materno}
                    </h6>
                  </Col>
                  <Col span={24}>
                    <Space.Compact>
                      <Form.Item
                        label="N° de C.I."
                      >
                        <Input
                          minLength={5}
                          className="w-100"
                          placeholder="Introduzca el Nro. de C.I. (denunciado)"
                          onChange={(ev) => {
                            props.setDenunciado({ ...props.denunciado, ci: ev.target.value })
                          }}
                          min={0}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"complemento_d"}
                      >
                        <Input
                          className="w-100"
                          placeholder="Complemento (Opcional)"
                          onChange={(ev) => {
                            props.setDenunciado({ ...props.denunciado, complemento: ev.target.value })
                          }}
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Col>
                  <Col span={20} offset={2}>
                    <Form.Item label="Expedido: ">
                      <Select
                        defaultValue="LP"
                        onChange={(ev) => {
                          props.setDenunciado({
                            ...props.denunciado,
                            expedido: ev,
                          });
                        }}
                        options={[
                          { value: "LP", label: "La Paz" },
                          { value: "CBB", label: "Cochabamba" },
                          { value: "SCZ", label: "Santa Cruz" },
                          { value: "OR", label: "Oruro" },
                          { value: "CH", label: "Chuquisaca" },
                          { value: "TJ", label: "Tarija" },
                          { value: "PD", label: "Pando" },
                          { value: "PT", label: "Potosí" },
                          { value: "BN", label: "Beni" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24}>
              <List
                locale={{
                  emptyText: (
                    <>
                      <PiListMagnifyingGlassFill
                        width={50}
                        height={50}
                        fontSize={50}
                      />
                      <p style={{ textAlign: "center" }}>
                        Listado de compromisos vacío...
                      </p>
                    </>
                  ),
                }}
                itemLayout="horizontal"
                dataSource={compromisos}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Button
                        key={index + "b"}
                        onClick={() => {
                          setCompromisos(
                            compromisos.filter((value) => {
                              return value.compromiso != item.compromiso;
                            })
                          );
                        }}
                      >
                        <BsFillTrash3Fill></BsFillTrash3Fill>
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <>
                          <span className="small-number">{index + 1}</span>
                          <BsTextParagraph
                            style={{ fontSize: 20, textAlign: "center" }}
                          ></BsTextParagraph>
                        </>
                      }
                      description={
                        <p style={{ textAlign: "start" }}>{item.compromiso}</p>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        ) : (
          <Skeleton avatar active paragraph={{ rows: 4 }}></Skeleton>
        )}
      </Modal>
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
          <DataContext3.Provider
            value={{
              adulto: props.adulto,
              caso: props.caso,
              persona: props.persona,
              compromisos: compromisos,
              denunciado: props.denunciado,
            }}
          >
            <FormularioActaCompromiso />
          </DataContext3.Provider>
        </PDFViewer>
      </Drawer>
      <Modal
        title="¿Continuar?"
        open={open2}
        onOk={() => {
          axios
            .post(process.env.BACKEND_URL + "/caso/acta-compromiso", {
              id_caso: props.caso.id_caso,
              compromisos: compromisos,
              denunciado: props.denunciado,
              usuario: props.usuario
            })
            .then((res) => {
              if (res.data.status == 1) {
                notification.success({ message: "Acta generada con éxito" });
                pdf(
                  <DataContext3.Provider
                    value={{
                      adulto: props.adulto,
                      caso: props.caso,
                      persona: props.persona,
                      compromisos: compromisos,
                      denunciado: props.denunciado,
                    }}
                  >
                    <FormularioActaCompromiso />
                  </DataContext3.Provider>
                )
                  .toBlob()
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    let { nombre, paterno, materno } = props.adulto;
                    link.setAttribute(
                      "download",
                      nombre + paterno + materno + ".pdf"
                    );
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    router.replace("/dashboard/casos");
                  });
              } else {
                notification.error({ message: res.data.message });
              }
            });
        }}
        onCancel={() => {
          setOpen2(false);
        }}
        okText="Sí"
        cancelText="No"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <QuestionCircleOutlined
            style={{ fontSize: "4em", color: "#555", marginBottom: ".5em" }}
          />
          <p className="h5 text-center">
            ¿Está seguro de continuar?, el caso cerrará...
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ModalActaCompromiso;
