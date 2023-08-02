"use client";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  FloatButton,
  Form,
  Input,
  Row,
  Segmented,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  message,
  notification,
} from "antd";
import { AiOutlineUserAdd } from "react-icons/ai";
import { createContext, useEffect, useRef, useState } from "react";
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

import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import UsuarioModal from "./usuario";
import { Usuario, dataUsuario } from "../data";
import { useRouter } from "next/navigation";
export const DataContext = createContext({});
//ROUTING
import "./estilos.scss";

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [loaded, setLoaded] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  const [open, setOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [displayUsuarios, setDisplayUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();
  const columns: ColumnsType<Usuario> = [
    {
      title: "ID Usuario",
      dataIndex: "id_usuario",
      key: "id_usuario",
      className: "text-center",
      fixed: "left",
    },
    {
      title: "Usuario",

      key: "Usuario",
      render: (_, usuario) => {
        return usuario.usuario;
      },
      className: "text-center",
    },

    {
      title: "Estado",
      key: "estado",
      dataIndex: "estado",
      className: "text-center",
      render: (_, usuario) =>
        usuario.estado == 1 ? (
          <Tag key={_} color="green">
            Activo
          </Tag>
        ) : (
          <Tag key={_} color="red">
            Inactivo
          </Tag>
        ),
    },
    {
      title: "Acción",
      key: "accion",
      className: "text-center",
      fixed: "right",
      render: (_, usuario) => (
        <div
          key={usuario.id_usuario + "d"}
          className="d-flex align-items-center justify-content-around"
        >
          <Button
            key={usuario.id_usuario}
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
            <EditOutlined style={{ zIndex: 0 }} />
          </Button>
          <Switch
            key={usuario.id_usuario + "-"}
            checked={usuario.estado == 1}
          />
        </div>
      ),
    },
  ];

  //cargado de datos desde la API
  useEffect(() => {
    axios
      .get<Usuario[]>(process.env.BACKEND_URL + "/usuario/all")
      .then((res) => {
        setUsuarios(res.data);
        setDisplayUsuarios(res.data);
      });
  }, []);


  //cambios en los filtros
  const handleFiltroUsuario = (ev: any) => {
    setDisplayUsuarios(
      usuarios.filter((usuario) => {
        return usuario.id_usuario.includes(ev.target.value);
      })
    );
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <h5 className="mt-4">
            {' Filtros para "Usuarios"'} <FilterOutlined />
          </h5>
          <small style={{ color: "#999" }}>
            Cada filtro realiza búsquedas por separado...
          </small>
        </Col>
        <Col span={8}>
          <div className="accionesUsuario">
            <Button
              icon={<AiOutlineUserAdd />}
              title="Crear Usuario"
              className="accionUsuarioItem"
              onClick={() => {
                router.replace("/dashboard/usuarios/agregar");
              }}
            >
              Crear Usuario
            </Button>
          </div>
        </Col>
      </Row>
      <Form layout={"horizontal"} style={{ marginTop: 10, width: "90%" }}>
        <Row gutter={[24, 24]}>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="ID de usuario: ">
              <Input
                onChange={(ev) => {
                  setDisplayUsuarios(
                    usuarios.filter((usuario) => {
                      return usuario.id_usuario
                        .toLocaleLowerCase()
                        .includes(ev.target.value.toLocaleLowerCase());
                    })
                  );
                }}
                placeholder="Introduzca el ID del usuario"
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="Nombre de Usuario">
              <Input
                onChange={(ev) => {
                  setDisplayUsuarios(
                    usuarios.filter((usuario) => {
                      return usuario.usuario
                        .toLocaleLowerCase()
                        .includes(ev.target.value.toLocaleLowerCase());
                    })
                  );
                }}
                placeholder="Introduzca el ID del usuario"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item style={{ marginLeft: 10 }} label="ID de persona: ">
              <Input
                onChange={(ev) => {
                  setDisplayUsuarios(
                    usuarios.filter((usuario) => {
                      return usuario.id_persona
                        .toLocaleLowerCase()
                        .includes(ev.target.value.toLocaleLowerCase());
                    })
                  );
                }}
                placeholder="Introduzca el ID de la persona"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Table
        scroll={{ x: 800, y: 500 }}
        rowKey={(usuario) => usuario.id_usuario + "T"}
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
        dataSource={displayUsuarios}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post(process.env.BACKEND_URL + "/usuario/estado", {
                      id_usuario: value.id_usuario,
                    })
                    .then((res) => {
                      message.success("¡Caso cambiado con éxito!");
                      axios
                        .get<Usuario[]>(
                          process.env.BACKEND_URL + "/usuario/all"
                        )
                        .then((res) => {
                          setUsuarios(res.data);
                          setDisplayUsuarios(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setOpen(true);
                  axios
                    .post(process.env.BACKEND_URL + "/usuario/get", {
                      id_usuario: value.id_usuario,
                    })
                    .then((res) => {
                      setUsuario(res.data);
                      setLoaded(true);
                    });
                }
              } catch (error) {
                setOpen(true);
                axios
                  .post(process.env.BACKEND_URL + "/usuario/get", {
                    id_usuario: value.id_usuario,
                  })
                  .then((res) => {
                    setUsuario(res.data);
                    setLoaded(true);
                  });
              }
            },
          };
        }}
      />
      <UsuarioModal
        usuario={usuario}
        loaded={loaded}
        setDisplayUsuarios={setDisplayUsuarios}
        setUsuario={setUsuario}
        setUsuarios={setUsuarios}
        key="usuariomodal"
        open={open}
        setOpen={setOpen}
      ></UsuarioModal>

      <FloatButton.Group
        trigger="click"
        type="primary"
        shape="square"
        style={{ right: 50, bottom: 15 }}
        icon={<FileDoneOutlined style={{ fontSize: 25 }} />}
      >
        <Tooltip
          title="Generar EXCEL"
          placement={"right"}
          color={"#107840"}
          key={"excel"}
        >
          <FloatButton
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
                .get(process.env.BACKEND_URL + "/caso/report")
                .then((res) => {});
            }}
            style={{ display: "flex", justifyContent: "center" }}
            icon={
              <FileExcelFilled
                style={{
                  color: "#107840",
                  fontSize: 25,
                }}
              />
            }
          />
        </Tooltip>

        <Tooltip
          title="Generar PDF"
          placement={"right"}
          color={"#b51308"}
          key={"pdf"}
        >
          <FloatButton
            icon={
              <FilePdfFilled
                style={{
                  color: "#b51308",
                  fontSize: 25,
                }}
              />
            }
          />
        </Tooltip>
      </FloatButton.Group>
    </>
  );
};
export default Informacion;
