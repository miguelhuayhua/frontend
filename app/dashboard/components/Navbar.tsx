"use client";
import {
  Affix,
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  Tooltip,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { GrConfigure } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import "./estilos.scss";
import { signOut, useSession } from "next-auth/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Usuario, dataUsuario } from "../usuarios/data";
import { Persona, dataPersona } from "../personal/agregar/data";
import axios from "axios";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const { data } = useSession();
  const [usuario, setUsuario] = useState<{
    usuario: string;
    estado: number;
    fotografia: string;
    id_persona: string;
    id_usuario: string;
  }>(dataUsuario);
  const [persona, setPersona] = useState<Persona>(dataPersona);
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
      setUsuario({ ...usuario });
      axios
        .post(process.env.BACKEND_URL + "/persona/get", {
          id_persona: usuario.id_persona,
        })
        .then((res) => {
          setPersona(res.data);
        });
    }
  }, [data]);
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item（disabled）",
      key: "3",
      disabled: true,
    },
  ];

  return (
    <Affix>
      <Row>
        <Col
          span={24}
          style={{
            borderRadius: 10,
          }}
        >
          <Header
            style={{
              position: "sticky",
              top: 0,
              margin: "4px auto",

              zIndex: 1000,
              width: "99.6%",
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
              padding: "35px 0",
            }}
          >
            <div
              className="fecha-container"
              style={{ position: "absolute", right: 240 }}
            >
              <span>
                <FaCalendarAlt style={{ marginRight: 10 }} />
                {`${dayjs().date()}/${dayjs().month()}/${dayjs().year()}`}
              </span>
            </div>
            <div style={{ position: "absolute", right: 180 }}>
              <Dropdown placement="bottom" menu={{ items }}>
                <Badge count={99} overflowCount={10} style={{ border: "none" }}>
                  <Avatar icon={<BellOutlined />} size="large" />
                </Badge>
              </Dropdown>
            </div>

            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    className: "nothover",
                    label: (
                      <div>
                        <Row>
                          <Col span={8}>
                            <Avatar
                              style={{
                                border: "none",
                                width: 60,
                                height: 60,
                                fontSize: 25,
                              }}
                              src={process.env.BACKEND_URL + usuario.fotografia}
                              icon={<UserOutlined />}
                            />
                          </Col>
                          <Col span={16}>
                            <b> {usuario.usuario}</b>

                            <p
                              style={{ color: "graytext" }}
                            >{`${persona.nombres} ${persona.paterno} ${persona.materno}`}</p>
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    ),
                    key: "0",
                  },
                  {
                    key: "1",
                    style: { margin: 0, padding: 0 },
                    label: (
                      <button
                        onClick={() => {
                          router.push("/dashboard/profile");
                        }}
                        className="custom-btn"
                      >
                        <GrConfigure />
                        <span>Editar Perfil</span>
                      </button>
                    ),
                  },
                  {
                    key: "4",
                    style: { margin: 0, padding: 0 },
                    label: (
                      <button
                        onClick={() => {
                          signOut({ redirect: true });
                        }}
                        className="custom-btn"
                      >
                        <CiLogout />
                        <span>Cerrar Sesión</span>
                      </button>
                    ),
                  },
                  { key: "2" },
                ],
              }}
              placement="bottomRight"
              arrow={{ pointAtCenter: false }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  right: 20,
                }}
              >
                <p
                  style={{
                    paddingRight: 5,
                    height: "100%",
                    margin: 0,
                    marginRight: 10,
                    color: "white",
                    borderRight: "1px solid #666",
                  }}
                >
                  {usuario.usuario}
                </p>
                <Avatar
                  style={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    width: 45,
                    height: 45,
                    fontSize: 25,
                  }}
                  src={process.env.BACKEND_URL + usuario.fotografia}
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>
          </Header>
        </Col>
      </Row>
    </Affix>
  );
};

export default Navbar;
