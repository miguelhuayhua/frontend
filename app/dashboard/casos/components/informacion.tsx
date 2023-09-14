"use client";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Empty,
  FloatButton,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  message,
  notification,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  FilterOutlined,
  FileDoneOutlined,
  FileExcelFilled,
  FilePdfFilled,
  LoadingOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import { AiOutlineReload, AiOutlineUserAdd } from "react-icons/ai";
import { SlLayers } from "react-icons/sl";
import { Caso, DatosDenunciado, Denunciado, datosCaso } from "../data";
import CasoModal from "./caso";
import {
  AdultoMayor2,
  dataDatosGenerales,
  dias,
  meses,
} from "../nuevocaso/data";
import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import { Hijo } from "../../hijos/data";
import { useRouter } from "next/navigation";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import { Persona, dataPersona } from "../../personal/agregar/data";
import { useSession } from "next-auth/react";
import PdfCasos from "./pdf-listado";
export const context = createContext({});
//ROUTING

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [open, setOpen] = useState(false);
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [adultoMayor, setAdultoMayor] =
    useState<AdultoMayor2>(dataDatosGenerales);
  const [adultos, setAdultos] = useState<AdultoMayor2[]>([]);
  const [filtroAdulto, setFiltroAdulto] = useState("");
  const [filtroCaso, setFiltroCaso] = useState("");
  const [filtroAccionCaso, setFiltroAccionCaso] = useState("");
  const [denunciado, setDenunciado] = useState<Denunciado>(DatosDenunciado);
  const columns: ColumnsType<Caso> = [
    {
      title: "Nro. de Caso",
      dataIndex: "nro_caso",
      key: "nro_caso",
      className: "text-center",
      fixed: "left",
      render: (_, caso) => {
        let adulto = adultos.find((value) => {
          return value.id_adulto == caso.id_adulto;
        });
        return (
          <>
            <b>{caso.nro_caso}</b>
            <br />
            {adulto?.nombre + " " + adulto?.paterno + " " + adulto?.materno}
          </>
        );
      },
    },
    {
      title: "Acción Realizada",
      dataIndex: "accion_realizada",
      key: "accion_realizada",
      className: "text-center",
    },
    {
      title: "Fecha de Registro",
      dataIndex: "fecha_registro",
      key: "fecha_registro",
      className: "text-center",
    },
    {
      title: "Hora de Registro",
      key: "hora_registro",
      dataIndex: "hora_registro",
      className: "text-center",
    },
    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, caso) =>
        caso.estado == 1 ? (
          <Tag key={_} color="green">
            Activo
          </Tag>
        ) : (
          <Tag key={_} color="red">
            Cerrado
          </Tag>
        ),
    },
    {
      title: "Acción",
      key: "accion",
      className: "text-center",
      fixed: "right",
      render: (_, caso) => (
        <div
          key={caso.id_caso + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={caso.id_caso}
            style={{
              fontSize: 20,
              width: 40,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
          >
            <div className="btn-cover"></div>
            <EditOutlined style={{ zIndex: 0 }} />
          </Button>
          <Button
            key={caso.id_caso + "t"}
            style={{
              fontSize: 50,
              width: 52,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
          >
            <div className="btn-redirect"></div>
            <SlLayers />
          </Button>
          <Switch key={caso.id_caso + "-"} checked={caso.estado == 1} />
        </div>
      ),
    },
  ];
  const [casos, setCasos] = useState<Caso[]>([]);
  const [displayCasos, setDisplayCasos] = useState<Caso[]>([]);
  //router
  const router = useRouter();
  //cargado de datos desde la API
  const [persona, setPersona] = useState<Persona>(dataPersona);

  //cargado de datos desde la API
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      let { usuario } = data?.user as {
        usuario: {
          usuario: string;
          estado: number;
          fotografia: string;
          id_persona: string;
          id_usuario: string;
        };
      };
      axios
        .post<Persona>(process.env.BACKEND_URL + "/persona/get", {
          id_persona: usuario.id_persona,
        })
        .then((res) => {
          setPersona(res.data);

          axios
            .get<Caso[]>(process.env.BACKEND_URL + "/caso/all")
            .then((res) => {
              setCasos(res.data);
              setDisplayCasos(res.data);
            });
          axios
            .get<AdultoMayor2[]>(process.env.BACKEND_URL + "/adulto/all")
            .then((res) => {
              setAdultos(res.data);
            });
        });
    }
  }, [data]);

  const { RangePicker } = DatePicker;

  //cambios en los filtros
  const handleFiltroCaso = (ev: any) => {
    setFiltroCaso(ev.target.value);
    setDisplayCasos(
      casos.filter((caso) => {
        return caso.nro_caso.includes(ev.target.value);
      })
    );
    setFiltroAdulto("");
    setFiltroAccionCaso("");
  };
  const handleFiltroAccion = (ev: any) => {
    setFiltroAccionCaso(ev);
    setFiltroCaso("");
    setFiltroAdulto("");
    setDisplayCasos(
      casos.filter((caso) => {
        return caso.accion_realizada == ev;
      })
    );
  };

  const handleFiltroRange = (ev: any) => {
    if (ev) {
      let [inicio, final] = ev;
      let fechaInicio = dayjs(inicio.$d);
      let fechaFinal = dayjs(final.$d);
      setDisplayCasos(
        casos.filter((caso) => {
          dayjs(caso.fecha_registro).isBetween(fechaInicio, fechaFinal);
          return dayjs(caso.fecha_registro).isBetween(fechaInicio, fechaFinal);
        })
      );
      setFiltroAccionCaso("");
      setFiltroCaso("");
    }
  };
  return (
    <>
      <Row>
        <Col span={24} lg={{ span: 10 }}>
          <h5 className="mt-4">
            {'Filtros para "Casos"'} <FilterOutlined />
          </h5>
          <small style={{ color: "#999" }}>
            Cada filtro realiza búsquedas por separado...
          </small>
        </Col>
        <Col
          span={24}
          offset={0}
          lg={{ span: 8, offset: 6 }}
          className="center"
        >
          <Tooltip
            title="Generar PDF"
            placement={"right"}
            color={"#b51308"}
            key={"pdf"}
          >
            <Button
              className="center info-button"
              style={{ height: 50, width: 50, minWidth: 50 }}
              icon={
                <FilePdfFilled
                  style={{
                    color: "#b51308",
                    fontSize: 30,
                  }}
                />
              }
              onClick={() => {
                notification.info({
                  message: "Generando PDF, por favor espere...",
                });
                pdf(
                  <context.Provider
                    value={{
                      casos: displayCasos,
                      persona: persona,
                    }}
                  >
                    <PdfCasos />
                  </context.Provider>
                )
                  .toBlob()
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    let nombrePdf = `Adultos-${dayjs().year()}-${dayjs().month()}-${dayjs().date()}.pdf`;
                    link.setAttribute("download", nombrePdf);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    notification.success({
                      message: "PDF " + nombrePdf + " generado con éxito...",
                    });
                  });
              }}
            />
          </Tooltip>
          <Tooltip
            title="Generar EXCEL"
            placement={"right"}
            color={"#107840"}
            key={"excel"}
          >
            <Button
              className="center info-button"
              style={{ height: 50, width: 50, minWidth: 50 }}
              onClick={() => {
                notification.info({
                  message: (
                    <div>
                      Generando Excel...
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{ marginLeft: 10, fontSize: 24 }}
                          />
                        }
                      />
                    </div>
                  ),
                });
                axios
                  .get(process.env.BACKEND_URL + "/caso/report", {
                    responseType: "blob",
                  })
                  .then((res) => {
                    const url = URL.createObjectURL(res.data);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                      "download",
                      "Casos-" + dayjs().format("DD-MM-YYYY_HH:mm:ss") + ".xlsx"
                    );
                    link.click();
                    link.remove();
                    notification.success({
                      message: (
                        <p style={{ fontSize: 14 }}>
                          {"¡Excel: Casos-" +
                            dayjs().format("DD-MM-YYYY_HH:mm:ss") +
                            ".xlsx, generado con éxito!"}
                        </p>
                      ),
                    });
                  });
              }}
              icon={
                <FileExcelFilled
                  style={{
                    color: "#107840",
                    fontSize: 30,
                  }}
                />
              }
            />
          </Tooltip>
          <Button
            className="info-button"
            type="primary"
            style={{ height: 50, width: 50 }}
            onClick={() => {
              axios
                .get<Caso[]>(process.env.BACKEND_URL + "/caso/all")
                .then((res) => {
                  setCasos(res.data);
                  setDisplayCasos(res.data);
                  message.info("Datos actualizados...");
                });
            }}
          >
            <AiOutlineReload fontSize={20} />
          </Button>
        </Col>
      </Row>

      <Form layout={"horizontal"} style={{ marginTop: 10 }}>
        <Row gutter={[12, 0]}>
          <Col span={24} lg={{ span: 12 }} xxl={{ span: 5 }}>
            <Form.Item label="Nro. de Caso: ">
              <Input
                placeholder="Introduzca el número de caso..."
                value={filtroCaso}
                onChange={handleFiltroCaso}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 12 }} xxl={{ span: 7 }}>
            <Form.Item label="Adulto implicado: ">
              <Input
                placeholder="Adulto Implicado"
                value={filtroAdulto}
                onChange={(ev) => {
                  setFiltroCaso("");
                  setFiltroAdulto(ev.target.value);
                  setFiltroAccionCaso("");
                  if (ev.target.value == "") {
                    setDisplayCasos(casos);
                  } else {
                    let adulto = adultos.filter((value) => {
                      return (
                        value.nombre +
                        " " +
                        value.paterno +
                        " " +
                        value.materno
                      )
                        .toLowerCase()
                        .includes(ev.target.value.toLowerCase());
                    });
                    setDisplayCasos(
                      casos.filter((caso) => {
                        return adulto.some(
                          (value) => value.id_adulto == caso.id_adulto
                        );
                      })
                    );
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 12 }} xxl={{ span: 5 }}>
            <Form.Item label="Tipo de acción realizada: ">
              <Select value={filtroAccionCaso} onChange={handleFiltroAccion}>
                <Select.Option value="Apertura">Apertura de Caso</Select.Option>
                <Select.Option value="Orientacion">Orientación</Select.Option>
                <Select.Option value="Citacion">Citación</Select.Option>
                <Select.Option value="Derivacion">Derivación</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} lg={{ span: 12 }} xxl={{ span: 7 }}>
            <Form.Item label="Filtrar por rango de fechas:">
              <RangePicker
                locale={{
                  ...locale,
                  lang: {
                    ...locale.lang,
                    shortWeekDays: dias,
                    shortMonths: meses,
                  },
                }}
                onChange={handleFiltroRange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table
        scroll={{ x: 800, y: 500 }}
        rowKey={(caso) => caso.id_caso}
        key="table"
        pagination={{ pageSize: 20, position: ["bottomCenter"] }}
        columns={columns}
        locale={{
          emptyText: (
            <Space direction="vertical" align="center">
              <Empty description="No existen datos a mostrar..." />
            </Space>
          ),
        }}
        dataSource={displayCasos}
        onRow={(value) => {
          return {
            onClick: (ev: any) => {
              if (ev.target.className.includes("switch")) {
                axios
                  .post(process.env.BACKEND_URL + "/caso/estado", {
                    id_caso: value.id_caso,
                  })
                  .then((res) => {
                    message.success(
                      "¡Caso " + value.nro_caso + " cambiado con éxito!"
                    );
                    axios
                      .get<Caso[]>(process.env.BACKEND_URL + "/caso/all")
                      .then((res) => {
                        setCasos(res.data);
                        setDisplayCasos(res.data);
                      });
                  });
              } else if (ev.target.className.includes("btn-cover")) {
                setCaso(value);
                axios
                  .post<{
                    adulto: AdultoMayor2;
                    hijos: Hijo[];
                  }>(process.env.BACKEND_URL + "/adulto/get", {
                    id_adulto: value.id_adulto,
                  })
                  .then((res) => {
                    setAdultoMayor({
                      ...res.data.adulto,
                      hijos: res.data.hijos,
                    });
                  });
                axios
                  .post(process.env.BACKEND_URL + "/denunciado/get", {
                    id_caso: value.id_caso,
                  })
                  .then((res) => {
                    setDenunciado(res.data);
                  });
                setOpen(true);
              } else if (ev.target.className.includes("btn-redirect")) {
                router.push("/dashboard/casos/accion?id_caso=" + value.id_caso);
              }
            },
          };
        }}
      />
      <PDFViewer width={"100%"} height={500}>
        <context.Provider
          value={{
            casos: displayCasos,
            persona: persona,
          }}
        >
          <PdfCasos />
        </context.Provider>
      </PDFViewer>
      <CasoModal
        key="casomodal"
        adultoMayor={adultoMayor}
        caso={caso!}
        setOpen={setOpen}
        open={open}
        denunciado={denunciado}
        setCaso={setCaso}
        setCasos={setCasos}
        setDisplayCasos={setDisplayCasos}
      ></CasoModal>
    </>
  );
};
export default Informacion;
