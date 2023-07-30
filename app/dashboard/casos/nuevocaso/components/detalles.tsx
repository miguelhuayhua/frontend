"use client";
interface Props {
  getPosicion: any;
  datos: {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    descripcionHechos: string;
    descripcionPeticion: string;
    datosDenunciado: DatosDenunciado;
    accionRealizada: string;
    datosDenuncia: DatosDenuncia;
  };
  router: any;
}
import {
  Affix,
  Badge,
  Button,
  Col,
  Descriptions,
  Dropdown,
  FloatButton,
  Modal,
  Progress,
  Row,
  Spin,
  notification,
} from "antd";
import { NextPage } from "next";
import {
  AdultoMayor,
  DatosDenuncia,
  DatosDenunciado,
  DatosUbicacion,
  dataDatosDenuncia,
  dataDatosGenerales,
} from "../data";
import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import MyDocument from "./pdf";
import { pdf } from "@react-pdf/renderer";
import { InfoCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";
export const DataContext = createContext({});
//ROUTING

//PDF

const Detalles: NextPage<Props> = (props) => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  //estados
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [estado, setEstado] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleVolver = () => {
    props.getPosicion(0);
    notification.info({ message: "Verifique nuevamente los datos..." });
  };

  //referencias
  const handleEnviar = () => {
    setOpen(true);
    let interval = setInterval(
      () => {
        if (counter <= 90) {
          setCounter((prev) => prev + 10);
        }
      },
      250,
      ["counter"]
    );
    pdf(
      <DataContext.Provider value={props.datos}>
        <MyDocument />
      </DataContext.Provider>
    )
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        let { nombre, paterno, materno } = dataDatosGenerales;

        link.setAttribute(
          "download",
          nombre + paterno + materno + dataDatosDenuncia.fecha_registro + ".pdf"
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        props.router.push("/dashboard/casos");
      });
    axios
      .post("http://127.0.0.1:8000/denuncia/insert", { ...props.datos })
      .then((res) => {
        setSuccess(true);
        setCounter(100);
        setEstado(false);

        if (res.data.status == 1) {
          notification.success({ message: res.data.response });
        } else {
          notification.error({ message: res.data.response });
        }
      })
      .catch((err) => {
        clearInterval(interval);
        setEstado(true);
        setSuccess(false);
      });
  };
  const cancel = () => {
    setOpen(false);
    notification.info({ message: "Modifique si desea..." });
  };

  const savePdf = () => {
    setOpen(false);
  };
  return (
    <>
      <Row className="my-4">
        <Col span={24} md={{ span: 22, offset: 1 }}>
          <Affix offsetTop={100}>
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <div style={{ width: 300 }}>
                        <h6 style={{ textAlign: "center" }}>
                          Detalles del caso nro:
                          <b>
                            {" " +
                              props.datos.datosDenuncia.nro_caso +
                              "/" +
                              dayjs().year()}
                          </b>
                        </h6>

                        <hr />
                        <Row>
                          <Col span={24}>
                            <p className="info">
                              <span>
                                <b>Fecha de Registro del caso: </b>
                              </span>
                              {props.datos.datosDenuncia.fecha_registro}
                            </p>
                          </Col>
                          <Col span={24}>
                            <p className="info">
                              <b>Hora de registro del caso: </b>
                              {props.datos.datosDenuncia.hora_registro}
                            </p>
                          </Col>
                          <Col span={24}>
                            <p className="info">
                              <b>Tipología: </b>
                              {props.datos.datosDenuncia.tipologia}
                            </p>
                          </Col>
                          <Col span={24}>
                            <p className="info">
                              <b>Acción realizada: </b>
                              {props.datos.accionRealizada}
                            </p>
                          </Col>
                        </Row>
                      </div>
                    ),
                  },
                ],
              }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <Button
                style={{
                  border: "none",
                  width: 60,
                  height: 60,
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 10,
                }}
              >
                <InfoCircleFilled style={{ fontSize: "2em" }} />
              </Button>
            </Dropdown>
          </Affix>
          <Row className="mt-4">
            <Col span={12}>
              <b>Datos Generales</b>
            </Col>

            <Col span={24}>
              <Badge status="processing" text="Datos Validados" />
            </Col>
            <Col span={24} xl={{ span: 12 }} xxl={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">Nombres: </p>
                <p className="contenido">{props.datos.datosGenerales.nombre}</p>
              </div>
            </Col>
            <Col span={24} xl={{ span: 12 }} xxl={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido Paterno: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.paterno}
                </p>
              </div>
            </Col>
            <Col span={24} xl={{ span: 12 }} xxl={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido Materno: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.materno}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 14 }} lg={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">Fecha de nacimiento: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.fecha_nac}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 10 }} lg={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">Edad: </p>
                <p className="contenido">{props.datos.datosGenerales.edad}</p>
              </div>
            </Col>

            <Col span={24} md={{ span: 8 }}>
              <div className="d-flex w-100">
                <p className="titulo">C.I.: </p>
                <p className="contenido"> {props.datos.datosGenerales.ci}</p>
              </div>
            </Col>
            <Col span={24} md={{ span: 16 }}>
              <div className="d-flex w-100">
                <p className="titulo">Estado Civil: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.estado_civil}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Género: </p>
                <p className="contenido"> {props.datos.datosGenerales.sexo}</p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo"> Beneficios: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.beneficios}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Nivel de Estudios: </p>
                <p className="contenido"> {props.datos.datosGenerales.grado}</p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo"> Nro. de referencia: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.nro_referencia}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Ocupación: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.ocupacion}
                </p>
              </div>
            </Col>

            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo"> Hijos: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.hijos.map((value, _i) => {
                    return (
                      <div key={_i}>
                        {value} <br></br>
                      </div>
                    );
                  })}
                </p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col
          style={{ marginTop: "2em" }}
          span={24}
          md={{ span: 22, offset: 1 }}
        >
          <Row>
            <Col span={24}>
              <b>Datos de Ubicación</b>
            </Col>
            <Col span={24}>
              <Badge status="processing" text="Datos Validados" />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Distrito: </p>
                <p className="contenido">
                  {props.datos.datosUbicacion.distrito}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Área: </p>
                <p className="contenido">
                  {props.datos.datosUbicacion.area == "Otro"
                    ? props.datos.datosUbicacion.area +
                      " (" +
                      props.datos.datosUbicacion.otra_area +
                      ")"
                    : props.datos.datosUbicacion.area}
                </p>
              </div>
            </Col>

            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Calle o avenida: </p>
                <p className="contenido">{props.datos.datosUbicacion.calle}</p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Tipo de domicilio: </p>
                <p className="contenido">
                  {props.datos.datosUbicacion.tipo_domicilio}
                </p>
              </div>
            </Col>

            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">N° de vivienda: </p>
                <p className="contenido">
                  {props.datos.datosUbicacion.n_vivienda}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Zona: </p>
                <p className="contenido">{props.datos.datosUbicacion.zona}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          style={{ marginTop: "2em" }}
          span={24}
          md={{ span: 22, offset: 1 }}
        >
          <Row>
            <Col span={24}>
              <b>Datos del denunciado</b>
            </Col>
            <Col span={24}>
              <Badge status="processing" text="Datos Validados" />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Nombre del denunciado: </p>
                <p className="contenido">
                  {props.datos.datosDenunciado.nombres}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido paterno: </p>
                <p className="contenido">
                  {" "}
                  {props.datos.datosDenunciado.paterno}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido materno: </p>
                <p className="contenido">
                  {props.datos.datosDenunciado.materno}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Parentezco: </p>
                <p className="contenido">
                  {props.datos.datosDenunciado.parentezco}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          style={{ marginTop: "2em" }}
          span={24}
          md={{ span: 22, offset: 1 }}
        >
          <Row>
            <Col span={24}>
              <b>Descripciones</b>
            </Col>
            <Col span={24}>
              <Badge status="processing" text="Datos Validados" />
            </Col>
            <Col span={24}>
              <div className="d-flex w-100">
                <p className="titulo" style={{ width: "20%" }}>
                  Descripción de los hechos:
                </p>
                <p className="contenido" style={{ width: "80%" }}>
                  {props.datos.descripcionHechos.length == 0
                    ? "No existe descripción"
                    : props.datos.descripcionHechos}
                </p>
              </div>
            </Col>
            <Col span={24}>
              <div className="d-flex w-100">
                <p className="titulo" style={{ width: "20%" }}>
                  Descripción de petición:
                </p>
                <p className="contenido" style={{ width: "80%" }}>
                  {props.datos.descripcionPeticion.length == 0
                    ? "No existe descripción"
                    : props.datos.descripcionPeticion}
                </p>
              </div>
            </Col>
          </Row>
        </Col>

        <Col sm={{ span: 12, offset: 0 }} md={{ offset: 4, span: 8 }}>
          <Button
            onClick={handleVolver}
            className="my-3"
            style={{ width: "90%", margin: "" auto 0" }}
          >
            Volver
          </Button>
        </Col>
        <Col
          sm={{ span: 12, offset: 0 }}
          md={{ span: 8 }}
          style={{ width: "90%", margin: "" auto 0" }}
        >
          <Button type="primary" onClick={handleEnviar} className="w-100 my-3">
            Enviar y Generar Formulario
          </Button>
        </Col>
      </Row>
      <Modal
        onCancel={cancel}
        footer={null}
        style={{ textAlign: "center" }}
        title={
          success ? (
            <div>
              <p>Envíado con éxito, generando Formulario...</p>
              <Spin></Spin>
            </div>
          ) : (
            <p>En progreso</p>
          )
        }
        open={open}
      >
        <div className={!estado ? "hidden" : "}>
          <Progress
            type="circle"
            percent={counter}
            size={80}
            status={estado ? "exception" : "normal"}
          />
        </div>
      </Modal>
      <FloatButton.BackTop />
    </>
  );
};
export default Detalles;
