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
import { NextPage } from "next";
import { Caso, Seguimiento, dataSeguimiento } from "../data";
import TextArea from "antd/es/input/TextArea";
import { createContext, useContext, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import FormularioSeguimiento from "../accion/pdf-seguimiento";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Persona } from "../../personal/agregar/data";
import { AdultoMayor2 } from "../nuevocaso/data";
interface Props {
  caso: Caso;
  setOpen: any;
  open2: boolean;
  setOpen2: any;
  adulto: AdultoMayor2;
}
export const DataContext = createContext({});
const SeguimientoModal: NextPage<Props> = (props) => {
  //control del modal
  const { data } = useSession();
  const handleConfirm = async () => {
    if (data) {
      notification.info({ message: "Generando formulario de seguimiento..." });
      let { usuario } = data?.user as {
        usuario: {
          usuario: string;
          estado: number;
          fotografia: string;
          id_persona: string;
          id_usuario: string;
        };
      };

      let persona = await axios.post<Persona>(
        process.env.BACKEND_URL + "/persona/get",
        {
          id_persona: usuario.id_persona,
        }
      );
      pdf(
        <DataContext.Provider
          value={{
            caso: props.caso,
            seguimiento: seguimiento,
            persona: persona.data,
            adulto: props.adulto,
          }}
        >
          <FormularioSeguimiento />
        </DataContext.Provider>
      )
        .toBlob()
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${
              props.adulto.nombre + props.adulto.paterno + props.adulto.materno
            }-seguimiento.pdf`
          );
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          notification.success({
            message: "Formulario generado con éxito",
          });
        });
      axios
        .post(process.env.BACKEND_URL + "/caso/seguimiento/add", {
          ...seguimiento,
          id_caso: props.caso.id_caso,
        })
        .then((res) => {
          if (res.data.status == 1) {
          }
        });
    }
  };

  const [seguimiento, setSeguimiento] = useState<Seguimiento>(dataSeguimiento);

  //cambio del estado de caso

  return (
    <>
      <Modal
        key="modal"
        title={
          <p style={{ fontSize: 14 }}>
            POR FAVOR REALICE EL SEGUIMIENTO DEL CASO {props.caso.nro_caso}
          </p>
        }
        centered
        style={{ textAlign: "center" }}
        onCancel={() => {
          props.setOpen2(false);
          props.setOpen(true);
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
              Guardar y generar seguimiento
            </Button>
          </Popconfirm>,
          <Button
            key="cancel"
            onClick={() => {
              props.setOpen2(false);
              props.setOpen(true);
            }}
          >
            Volver
          </Button>,
        ]}
        open={props.open2}
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
              <Col span={8}>
                <p className="info">
                  <span></span>
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <Form layout="horizontal">
              <Form.Item label="Descripción de seguimiento: ">
                <TextArea
                  allowClear
                  showCount
                  maxLength={1000}
                  style={{ height: 250, resize: "none" }}
                  onChange={(ev) => {
                    setSeguimiento({
                      ...seguimiento,
                      detalle_seguimiento: ev.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={24}
            lg={{ span: 12 }}
            style={{ border: "1px solid #CCC", padding: 10, borderRadius: 10 }}
          >
            <Row>
              <Col span={24}>
                <p style={{ color: "#777" }}>
                  Detalles del seguimiento de caso
                </p>
              </Col>
              <Col span={24}>
                <div className="detalle-seguimiento">
                  <p style={{ textAlign: "start" }}>
                    <b>Fecha de seguimiento: </b> {seguimiento.hora_seguimiento}
                    <b style={{ marginLeft: 20 }}>Hora de seguimiento:</b>{" "}
                    {seguimiento.hora_seguimiento}{" "}
                  </p>
                  <p>
                    <b>Adulto mayor implicado: </b>
                    {props.adulto.nombre +
                      " " +
                      props.adulto.paterno +
                      " " +
                      props.adulto.materno}
                  </p>
                  <p>
                    <b>Detalles: </b>
                    {seguimiento.detalle_seguimiento}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SeguimientoModal;
