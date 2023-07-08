interface Props {
  getPosicion: any;
  datos: {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    descripcionHechos: string;
    descripcionPeticion: string;
    datosDenunciado: DatosDenunciado;
    accionRealizada: string;
  };
  router: any;
}
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Modal,
  Progress,
  Row,
  Spin,
  notification,
} from "antd";
import { NextPage } from "next";
import {
  AdultoMayor,
  DatosDenunciado,
  DatosUbicacion,
  dataDatosDenuncia,
  dataDatosGenerales,
} from "../data";
import { createContext, useRef, useState } from "react";
import axios from "axios";
import MyDocument from "./pdf";
import { pdf } from "@react-pdf/renderer";
import { NextRouter, useRouter } from "next/router";
export const DataContext = createContext({});
//ROUTING

//PDF

const Detalles: NextPage<Props> = (props) => {
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
  let refDown = useRef(null);
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
    axios
      .post("http://127.0.0.1:8000/denuncia/insert", { ...props.datos })
      .then((res) => {
        setSuccess(true);
        setCounter(100);
        setEstado(false);

        if (res.data.status == 1) {
          notification.success({ message: res.data.response });
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
                nombre + paterno + materno + dataDatosDenuncia.fecha + ".pdf"
              );
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              props.router.push("/dashboard/casos");
            });
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
    console.log(refDown);
  };
  return (
    <>
      <Row className="my-4">
        <Col span={20} offset={2}>
          <Row>
            <Col span={24}>
              <b>Datos Generales</b>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Nombres </p>
                <p className="contenido">{props.datos.datosGenerales.nombre}</p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido Paterno: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.paterno}
                </p>
              </div>
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <div className="d-flex w-100">
                <p className="titulo">Apellido Materno: </p>
                <p className="contenido">
                  {props.datos.datosGenerales.materno}
                </p>
              </div>
            </Col>
          </Row>
          <Descriptions.Item label="Estado " span={3}>
            <Badge status="processing" text="Datos Validados" />
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Apellido Paterno ">
            {props.datos.datosGenerales.paterno}
          </Descriptions.Item>
          <Descriptions.Item label="Apellido Materno ">
            {props.datos.datosGenerales.materno}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Nacimiento">
            {props.datos.datosGenerales.fecha_nac}
          </Descriptions.Item>
          <Descriptions.Item label="Edad ">
            {props.datos.datosGenerales.edad}
          </Descriptions.Item>
          <Descriptions.Item label="C.I.">
            {props.datos.datosGenerales.ci}
          </Descriptions.Item>
          <Descriptions.Item label="Estado Civil ">
            {props.datos.datosGenerales.estado_civil}
          </Descriptions.Item>
          <Descriptions.Item label="Género ">
            {props.datos.datosGenerales.sexo}
          </Descriptions.Item>
          <Descriptions.Item label="Nivel de Estudios ">
            {props.datos.datosGenerales.grado}
          </Descriptions.Item>
          <Descriptions.Item label="Ocupación ">
            {props.datos.datosGenerales.ocupacion}
          </Descriptions.Item>
          <Descriptions.Item label="Nro. de referencia ">
            {props.datos.datosGenerales.referencia}
          </Descriptions.Item>
          <Descriptions.Item label="Beneficios ">
            {props.datos.datosGenerales.beneficios}
          </Descriptions.Item>
          <Descriptions.Item label="Hijos ">
            {props.datos.datosGenerales.hijos.map((value, _i) => {
              return (
                <div key={_i}>
                  {value} <br></br>
                </div>
              );
            })}
          </Descriptions.Item>
        </Col>

        <Col span={20} offset={2} className="mt-3">
          <Descriptions size="small" title="Datos de ubicación" bordered>
            <Descriptions.Item label="Estado " span={3}>
              <Badge status="processing" text="Datos Validados" />
            </Descriptions.Item>
            <Descriptions.Item label="Distrito ">
              {props.datos.datosUbicacion.distrito}
            </Descriptions.Item>
            <Descriptions.Item label="Zona de Domicilio ">
              {props.datos.datosUbicacion.zona}
            </Descriptions.Item>
            <Descriptions.Item label="Calle o Avenida ">
              {props.datos.datosUbicacion.calle}
            </Descriptions.Item>
            <Descriptions.Item label="Área ">
              {props.datos.datosUbicacion.area == "Otro"
                ? props.datos.datosUbicacion.area +
                  " (" +
                  props.datos.datosUbicacion.otra_area +
                  ")"
                : props.datos.datosUbicacion.area}
            </Descriptions.Item>
            <Descriptions.Item label="Tipo de Domicilio ">
              {props.datos.datosUbicacion.tipo_domicilio}
            </Descriptions.Item>
            <Descriptions.Item label="Nro. de vivienda ">
              {props.datos.datosUbicacion.n_vivienda}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={20} offset={2} className="mt-3">
          <Descriptions size="small" title="Datos del denunciado " bordered>
            <Descriptions.Item label="Estado " span={3}>
              <Badge status="processing" text="Datos Validados" />
            </Descriptions.Item>
            <Descriptions.Item label="Nombre de denunciado ">
              {props.datos.datosDenunciado.nombres}
            </Descriptions.Item>
            <Descriptions.Item label="Apellido Paterno ">
              {props.datos.datosDenunciado.paterno}
            </Descriptions.Item>
            <Descriptions.Item label="Apellido Materno ">
              {props.datos.datosDenunciado.materno}
            </Descriptions.Item>
            <Descriptions.Item label="Parentezco con la persona mayor ">
              {props.datos.datosDenunciado.parentezco}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={20} offset={2} className="mt-3">
          <Descriptions size="small" title="Descripciones " bordered>
            <Descriptions.Item span={3} label="Descripción de Hechos ">
              {props.datos.descripcionHechos}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Descripción de Petición ">
              {props.datos.descripcionPeticion}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col sm={{ span: 12, offset: 0 }} md={{ offset: 4, span: 8 }}>
          <Button
            onClick={handleVolver}
            className="my-3"
            style={{ width: "90%", margin: " auto 0" }}
          >
            Volver
          </Button>
        </Col>
        <Col
          sm={{ span: 12, offset: 0 }}
          md={{ span: 8 }}
          style={{ width: "90%", margin: " auto 0" }}
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
        <div className={!estado ? "hidden" : ""}>
          <Progress
            type="circle"
            percent={counter}
            size={80}
            status={estado ? "exception" : "normal"}
          />
        </div>
      </Modal>
    </>
  );
};
export default Detalles;
