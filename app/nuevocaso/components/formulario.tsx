"use client";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tag,
  TimePicker,
  message,
  notification,
} from "antd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AdultoMayor,
  DatosDenuncia,
  DatosDenunciado,
  DatosUbicacion,
  dataDatosDenuncia,
  dataDatosDenunciado,
  dataDatosGenerales,
  dataDatosUbicacion,
  dias,
  meses,
} from "../data";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import {
  PlusOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/es_ES";
import moment, { now } from "moment";
import FormItem from "antd/es/form/FormItem";
import { NextPage } from "next";

interface Props {
  getDatos: any;
  getPosicion: any;
}

const Formulario: NextPage<Props> = (props) => {
  //manejo de confirmacion
  const [open, setOpen] = useState(false);
  const handleOpenChange = () => {
    setOpen(true);
  };
  const confirm = () => {
    setOpen(false);
    notification.success({
      message: "Si no existe una observación alguna, puede guardarlo.",
    });
    props.getDatos({
      datosGenerales,
      datosUbicacion,
      datosDenunciado,
      descripcionHechos,
      descripcionPeticion,
      accionesRealizadas,
      datosDenuncia,
    });
    props.getPosicion(1);
  };
  const cancel = () => {
    setOpen(false);
    notification.info({ message: "Modifique si desea..." });
  };
  //datos de formulario
  const [datosGenerales, setDatosGenerales] =
    useState<AdultoMayor>(dataDatosGenerales);
  const [datosUbicacion, setDatosUbicacion] =
    useState<DatosUbicacion>(dataDatosUbicacion);
  const [datosDenuncia, setDatosDenuncia] =
    useState<DatosDenuncia>(dataDatosDenuncia);
  const [descripcionHechos, setDescripcionHechos] = useState("");
  const [descripcionPeticion, setPeticion] = useState("");
  const [datosDenunciado, setDatosDenunciado] =
    useState<DatosDenunciado>(dataDatosDenunciado);
  const [accionesRealizadas, setAccionesRealizadas] = useState("");
  //DATOS EXTRAS Y REFERENCIAS
  const inputRef = useRef<InputRef>(null);
  const [hijosValue, setHijosValue] = useState("");
  const [itemHijos, setItemHijos] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);

  const showInput = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleHijosConfirm = () => {
    if (hijosValue && itemHijos.indexOf(hijosValue) === -1) {
      setItemHijos([...itemHijos, hijosValue]);
      setInputVisible(false);
      setDatosGenerales({
        ...datosGenerales,
        hijos: [...datosGenerales.hijos, hijosValue],
      });
      setHijosValue("");
    }
  };
  //otros
  const handleOtroDomicilio = (e: ChangeEvent<HTMLInputElement>) => {
    setDatosUbicacion({
      ...datosUbicacion,
      otro_domicilio: e.target.value,
    });
  };
  const handleOtraArea = (e: ChangeEvent<HTMLInputElement>) => {
    setDatosUbicacion({
      ...datosUbicacion,
      otra_area: e.target.value,
    });
  };
  const handleHijosChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHijosValue(e.target.value);
  };

  const handleClose = (removedHijo: string) => {
    const newTags = itemHijos.filter((hijo) => hijo !== removedHijo);
    setItemHijos(newTags);
    setDatosGenerales({ ...datosGenerales, hijos: newTags });
  };
  //datos extras para el formulario
  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        className="hijos"
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span className="" key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  //DATOS DE LOS FORMULARIOS
  const handleNombre = (value: any) => {
    setDatosGenerales({ ...datosGenerales, nombre: value.target.value });
  };

  const handlePaterno = (value: any) => {
    setDatosGenerales({ ...datosGenerales, paterno: value.target.value });
  };

  const handleMaterno = (value: any) => {
    setDatosGenerales({ ...datosGenerales, materno: value.target.value });
  };

  const handleCI = (value: any) => {
    setDatosGenerales({ ...datosGenerales, ci: value });
  };

  const handleSexo = (value: any) => {
    setDatosGenerales({ ...datosGenerales, sexo: value.target.value });
  };

  const handleNacimiento = (value: any) => {
    if (value) {
      let edad = -Number.parseInt(value.diff(moment.now(), "years"));
      if (edad < 60) {
        message.error({
          content: "Introduzca una edad arriba de 60 años...",
          duration: 10,
        });
      }
      setDatosGenerales({
        ...datosGenerales,
        fecha_nac: dayjs(value.$d).format("DD/MM/YYYY"),
        edad,
      });
    }
  };

  const handleEstadoCivil = (value: any) => {
    setDatosGenerales({ ...datosGenerales, estado_civil: value });
  };

  const handleReferencia = (value: any) => {
    setDatosGenerales({ ...datosGenerales, referencia: value });
  };

  const handleInstruccion = (value: any) => {
    setDatosGenerales({ ...datosGenerales, grado: value });
  };
  const handleOcupacion = (value: any) => {
    setDatosGenerales({ ...datosGenerales, ocupacion: value.target.value });
  };
  const handleBeneficios = (value: any) => {
    setDatosGenerales({ ...datosGenerales, beneficios: value });
  };
  //DATOS DE UBICACIÓN DEL ADULTO MAYOR
  const handleTipoDomicilio = (value: any) => {
    setDatosUbicacion({
      ...datosUbicacion,
      tipo_domicilio: value,
    });
  };
  const handleDistrito = (value: any) => {
    setDatosUbicacion({ ...datosUbicacion, distrito: value });
  };
  const handleZona = (value: any) => {
    setDatosUbicacion({ ...datosUbicacion, zona: value.target.value });
  };
  const handleCalle = (value: any) => {
    setDatosUbicacion({ ...datosUbicacion, calle: value.target.value });
  };
  const handleNroVivienda = (value: any) => {
    setDatosUbicacion({ ...datosUbicacion, n_vivienda: value });
  };
  const handleArea = (value: any) => {
    setDatosUbicacion({ ...datosUbicacion, area: value });
  };

  const handleDescripcion = (value: any) => {
    setDescripcionHechos(value);
  };
  const handlePeticion = (value: any) => {
    setPeticion(value);
  };
  const handleNombreDenunciado = (value: any) => {
    setDatosDenunciado({ ...datosDenunciado, nombres: value.target.value });
  };

  const handlePaternoDenunciado = (value: any) => {
    setDatosDenunciado({ ...datosDenunciado, paterno: value.target.value });
  };

  const handleMaternoDenunciado = (value: any) => {
    setDatosDenunciado({ ...datosDenunciado, materno: value.target.value });
  };
  const handleParentezo = (value: any) => {
    setDatosDenunciado({ ...datosDenunciado, parentezo: value });
  };

  const handleAcciones = (value: any) => {
    setAccionesRealizadas(value);
  };
  const handleTipologia = (value: any) => {
    setDatosDenuncia({
      ...datosDenuncia,
      tipologia: value.target.value,
    });
  };
  const handleNroCaso = (value: any) => {
    setDatosDenuncia({
      ...datosDenuncia,
      nro_caso: value.target.value,
    });
  };
  return (
    <>
      <h2>FORMULARIO DE REGISTRO DE ATENCIÓN</h2>
      <Row>
        <Col span={20} offset={2}>
          <Form layout="horizontal">
            <Row>
              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Item label={"Fecha de Registro"}>
                  <DatePicker
                    className="normal-input"
                    disabled
                    locale={{
                      ...locale,
                      lang: {
                        ...locale.lang,
                        shortWeekDays: dias,
                        shortMonths: meses,
                      },
                    }}
                    value={dayjs(now())}
                  ></DatePicker>
                </Form.Item>
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
                <FormItem label="Hora de registro:">
                  <TimePicker
                    className="normal-input"
                    disabled
                    defaultValue={dayjs(now())}
                  />
                </FormItem>
              </Col>
              <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Item label="Tipología:">
                  <Input onChange={handleTipologia} className="small-input" />
                </Form.Item>
              </Col>
              <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                <Form.Item label="N° de Caso:">
                  <Input
                    onChange={handleNroCaso}
                    className="small-input"
                    suffix={"/2023"}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="border position-relative rounded p-4">
              <p className="titulo-form">
                1. Datos Generales de la persona adulta mayor
              </p>
              <Row>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Nombres:">
                    <Input className="normal-input" onChange={handleNombre} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Apellido Paterno:">
                    <Input className="normal-input" onChange={handlePaterno} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Apellido Materno:">
                    <Input className="normal-input" onChange={handleMaterno} />
                  </Form.Item>
                </Col>
                <Col span={14} md={{ span: 14 }} lg={{ span: 8 }}>
                  <Form.Item label={"Fecha de Nacimiento:"}>
                    <DatePicker
                      defaultValue={dayjs(datosGenerales.fecha_nac)}
                      placeholder="Ingrese su fecha de Nacimiento"
                      className="normal-input"
                      locale={{
                        ...locale,
                        lang: {
                          ...locale.lang,
                          shortWeekDays: dias,
                          shortMonths: meses,
                        },
                      }}
                      onChange={handleNacimiento}
                    ></DatePicker>
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 4 }}>
                  <Form.Item label="Edad">
                    <InputNumber
                      className="normal-input"
                      min={60}
                      disabled
                      value={datosGenerales.edad}
                      style={
                        datosGenerales.edad < 60
                          ? { border: "1px solid red" }
                          : {}
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item label="N° de C.I.">
                    <InputNumber
                      minLength={7}
                      className="normal-input"
                      onChange={handleCI}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} md={{ span: 10 }} lg={{ span: 6 }}>
                  <Form.Item label="Sexo:">
                    <Radio.Group
                      defaultValue={"Femenino"}
                      className="normal-input"
                      onChange={handleSexo}
                    >
                      <Radio value="Femenino"> Femenino </Radio>
                      <Radio value="Masculino"> Masculino </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item className="normal-input" label="Estado Civil:">
                    <Select defaultValue={"Viudo"} onChange={handleEstadoCivil}>
                      <Select.Option value="Soltero(a)">
                        Soltero(a)
                      </Select.Option>
                      <Select.Option value="Casado(a)">Casado(a)</Select.Option>
                      <Select.Option value="Concubino(a)">
                        Concubino(a)
                      </Select.Option>
                      <Select.Option value="Divorciado(a)">
                        Divorciado(a)
                      </Select.Option>
                      <Select.Option value="Viudo(a)">Viudo(a)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item label="N° de Referencia:">
                    <InputNumber
                      onChange={handleReferencia}
                      minLength={8}
                      className="normal-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className="normal-input"
                    label="Hijos que tiene la persona adulta mayor"
                  >
                    {itemHijos.map(forMap)}

                    <Button onClick={showInput} className="tagPlus btn">
                      <PlusOutlined /> Nuevo(a) Hijo(a)
                    </Button>

                    <Input
                      onChange={handleHijosChange}
                      className="normal-input"
                      ref={inputRef}
                      hidden={!inputVisible}
                      onBlur={handleHijosConfirm}
                      onPressEnter={handleHijosConfirm}
                    />
                  </Form.Item>
                </Col>

                <Col span={12} md={{ span: 12 }} lg={{ span: 10 }}>
                  <Form.Item
                    className="normal-input"
                    label="Grado de Instrucción:"
                  >
                    <Select
                      onChange={handleInstruccion}
                      defaultValue={"Primaria"}
                    >
                      <Select.Option value="Primaria">Primaria</Select.Option>
                      <Select.Option value="Secundaria">
                        Secundaria
                      </Select.Option>
                      <Select.Option value="Tecnico">Técnico</Select.Option>
                      <Select.Option value="Universitario">
                        Universitario
                      </Select.Option>
                      <Select.Option value="S/Inst.">
                        Sin Instrucción
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item className="normal-input" label="Ocupación:">
                    <Input onChange={handleOcupacion} />
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item className="normal-input" label="Beneficios:">
                    <Select
                      onChange={handleBeneficios}
                      defaultValue={"Ninguno"}
                    >
                      <Select.Option value="Renta Dignidad">
                        Renta Dignidad
                      </Select.Option>
                      <Select.Option value="Jubilado">Jubilado</Select.Option>
                      <Select.Option value="Ninguno">Ninguno</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 10 }}>
                  <Form.Item
                    className="normal-input"
                    label="Tipo de domicilio:"
                  >
                    <Select
                      defaultValue={"Propio"}
                      onChange={handleTipoDomicilio}
                    >
                      <Select.Option value="Propio">Propio</Select.Option>
                      <Select.Option value="Alquilado">Alquilado</Select.Option>
                      <Select.Option value="Anticretico">
                        Anticrético
                      </Select.Option>
                      <Select.Option value="Cedido">Cedido</Select.Option>
                      <Select.Option value="Otro">Otro</Select.Option>
                    </Select>
                    <Input
                      hidden={datosUbicacion.tipo_domicilio != "Otro"}
                      placeholder="Especifique"
                      className="normal-input mt-3"
                      onChange={handleOtroDomicilio}
                    />
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item className="normal-input" label="Distrito:">
                    <Select defaultValue={1} onChange={handleDistrito}>
                      {Array.from({ length: 14 }, (_, i) => i + 1).map(
                        (value) => (
                          <Select.Option key={value} value={value}>
                            {value}
                          </Select.Option>
                        )
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Form.Item label="Zona:">
                    <Input className="normal-input" onChange={handleZona} />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 12 }}>
                  <Form.Item label="Calle o Av.:">
                    <Input className="normal-input" onChange={handleCalle} />
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item label="N° de vivienda:">
                    <InputNumber
                      onChange={handleNroVivienda}
                      minLength={8}
                      className="normal-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12} md={{ span: 12 }} lg={{ span: 6 }}>
                  <Form.Item className="normal-input" label="Área:">
                    <Select defaultValue={"Urbano"} onChange={handleArea}>
                      <Select.Option value="Urbano">Urbano</Select.Option>
                      <Select.Option value="Rural">Rural</Select.Option>
                      <Select.Option value="Otro">Otro Municipio</Select.Option>
                    </Select>
                    <Input
                      hidden={datosUbicacion.area != "Otro"}
                      placeholder="Especifique"
                      className="normal-input mt-3"
                      onChange={handleOtraArea}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="border position-relative rounded p-4 mt-4">
              <p className="titulo-form">2. Descripcion de los hechos</p>
              <Row>
                <Col span={24}>
                  <Form.Item className="w-100">
                    <TextArea
                      style={{ maxHeight: 150 }}
                      onChange={handleDescripcion}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="border position-relative rounded p-4 mt-4">
              <p className="titulo-form">
                3. Petición de la persona adulta mayor
              </p>
              <Row>
                <Col span={24}>
                  <Form.Item className="w-100">
                    <TextArea
                      style={{ maxHeight: 150 }}
                      onChange={handlePeticion}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="border position-relative rounded p-4 mt-4">
              <p className="titulo-form">4. Datos personales del denunciado</p>
              <Row>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Nombres:">
                    <Input
                      className="normal-input"
                      onChange={handleNombreDenunciado}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Apellido Paterno:">
                    <Input
                      className="normal-input"
                      onChange={handlePaternoDenunciado}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                  <Form.Item label="Apellido Materno:">
                    <Input
                      className="normal-input"
                      onChange={handleMaternoDenunciado}
                    />
                  </Form.Item>
                </Col>
                <Col offset={4} span={16} md={{ span: 16 }}>
                  <Form.Item
                    className="normal-input"
                    label="Parentezco con la persona adulta mayor:"
                  >
                    <Select defaultValue={"Hijo(a)"} onChange={handleParentezo}>
                      <Select.Option value="Hijo(a)">Hijo(a)</Select.Option>
                      <Select.Option value="Familiar">
                        Familiar Cercano
                      </Select.Option>
                      <Select.Option value="Conocido">
                        Persona Conocida
                      </Select.Option>
                      <Select.Option value="Desconocido">
                        Persona Desconocida
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="border position-relative rounded p-4 mt-4">
              <p className="titulo-form">5. Acciones Realizadas</p>
              <Row>
                <Col offset={4} span={16} md={{ span: 16 }}>
                  <Form.Item className="normal-input">
                    <Select defaultValue={"Apertura"} onChange={handleAcciones}>
                      <Select.Option value="Apertura">
                        Apertura de Caso
                      </Select.Option>
                      <Select.Option value="Orientacion">
                        Orientación
                      </Select.Option>
                      <Select.Option value="Citacion">Citación</Select.Option>
                      <Select.Option value="Derivacion">
                        Derivación
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
        <Col span={4} offset={10}>
          <Button className="w-100 my-3" onClick={handleOpenChange}>
            Continuar
          </Button>
        </Col>
      </Row>
      <Modal
        title="¿Continuar?"
        open={open}
        onOk={confirm}
        onCancel={cancel}
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
          <p className="h5 text-center">¿Está seguro de pasar a la verificación de datos?</p>
        </div>
      </Modal>
    </>
  );
};

export default Formulario;