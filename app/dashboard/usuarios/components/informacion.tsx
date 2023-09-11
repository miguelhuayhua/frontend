"use client";
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
  message,
  notification,
} from "antd";
import { AiOutlineReload, AiOutlineUserAdd } from "react-icons/ai";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  FilterOutlined,
  FileExcelFilled,
  FilePdfFilled,
  LoadingOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import isBeetwen from "dayjs/plugin/isBetween";
import UsuarioModal from "./usuario";
import { Usuario, dataUsuario } from "../data";
import { useRouter } from "next/navigation";
export const DataContext = createContext({});
//ROUTING
import "./estilos.scss";
import Link from "next/link";

const Informacion = () => {
  dayjs.extend(isBeetwen);
  //estados
  const [loaded, setLoaded] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  const [open, setOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [displayUsuarios, setDisplayUsuarios] = useState<Usuario[]>([]);
  const columns: ColumnsType<Usuario> = [
    {
      title: "ID Usuario",
      dataIndex: "id_usuario",
      key: "id_usuario",
      className: "text-center",
      fixed: "left",
      width: 120,
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
      width: 150,
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

  return (
    <>
      <Row>
        <Col span={24} lg={{ span: 10 }}>
          <h5 className="mt-4">
            {' Filtros para "Usuarios"'} <FilterOutlined />
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
          <Link
            href="/dashboard/usuario/agregar"
            style={{ textDecoration: "none" }}
          >
            <Button
              className="center info-button"
              icon={<AiOutlineUserAdd />}
              title="Crear Usuario"
              style={{ height: 50 }}
            >
              Crear Usuario
            </Button>
          </Link>
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
                  .get(process.env.BACKEND_URL + "/usuario/report", {
                    responseType: "blob",
                  })
                  .then((res) => {
                    const url = URL.createObjectURL(res.data);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute(
                      "download",
                      "Usuarios-" +
                        dayjs().format("DD-MM-YYYY_HH:mm:ss") +
                        ".xlsx"
                    );
                    link.click();
                    link.remove();
                    notification.success({
                      message: (
                        <p style={{ fontSize: 14 }}>
                          {"¡Excel: Usuarios-" +
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
                .get<Usuario[]>(process.env.BACKEND_URL + "/usuario/all")
                .then((res) => {
                  setUsuarios(res.data);
                  setDisplayUsuarios(res.data);
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
          <Col span={24} md={{ span: 24 }} xl={{ span: 8 }}>
            <Form.Item label="ID de usuario: ">
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
            <Form.Item label="Nombre de Usuario">
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
            <Form.Item label="ID de persona: ">
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
        scroll={{ x: 800, y: 600 }}
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
    </>
  );
};
export default Informacion;
