interface Props {
  getPosicion: any;
  datos: {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    descripcionHechos: string;
    descripcionPeticion: string;
    datosDenunciado: DatosDenunciado;
  };
}
import {
  Badge,
  Button,
  Col,
  Descriptions,
  Modal,
  Progress,
  Row,
  notification,
} from "antd";
import { NextPage } from "next";
import { AdultoMayor, DatosDenunciado, DatosUbicacion } from "../data";
import { useState } from "react";
import axios from "axios";
const Detalles: NextPage<Props> = (props) => {
  //estados
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [estado, setEstado] = useState(false);

  const handleVolver = () => {
    props.getPosicion(0);
    notification.info({ message: "Verifique nuevamente los datos..." });
  };

  const handleEnviar = () => {
    setOpen(true);
    let interval = setInterval(
      () => {
        console.log(counter);
        if (counter <= 90) {
          setCounter((prev) => prev + 10);
        }
      },
      250,
      ["counter"]
    );
    axios
      .post("http://google.com", {})
      .then((res) => {
        setCounter(100);

        clearInterval(interval);
      })
      .catch((err) => {
        clearInterval(interval);
        setEstado(true);
      });
  };
  const cancel = () => {
    setOpen(false);
    notification.info({ message: "Modifique si desea..." });
  };
  return (
    <>
      <Row className="my-4">
        <Col span={20} offset={2}>
          <Descriptions
            size="small"
            title="Información del denunciante:"
            bordered
          >
            <Descriptions.Item label="Estado " span={3}>
              <Badge status="processing" text="Datos Validados" />
            </Descriptions.Item>
            <Descriptions.Item label="Nombres ">
              {props.datos.datosGenerales.nombre}
            </Descriptions.Item>
            <Descriptions.Item label="Apellido Paterno ">
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
          </Descriptions>
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
              {props.datos.datosDenunciado.parentezo}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={20} offset={2} className="mt-3">
          <Descriptions size="small" title="Descripciones " bordered>
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
        title="Procesando el envío..."
        open={open}
      >
        <Progress
          type="circle"
          percent={counter}
          size={80}
          status={estado ? "exception" : "normal"}
        />
      </Modal>
    </>
  );
};
export default Detalles;
