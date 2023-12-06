"use client";
import { UserOutlined } from "@ant-design/icons";
import { Affix, Avatar, Col, Dropdown, Popover, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import dayjs from "dayjs";
import { IoMdHelpCircle } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { Persona, dataPersona } from "../personal/agregar/data";
import { Usuario, dataUsuario } from "../usuarios/data";
import "./estilos.scss";

import Image from 'next/legacy/image';
import Link from "next/link";
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
      let { usuario, persona } = data?.user as {
        usuario: {
          usuario: string;
          estado: number;
          fotografia: string;
          id_persona: string;
          id_usuario: string;
        };
        persona: Persona;
      };
      if (usuario && persona) {
        axios.post<Usuario>(process.env.BACKEND_URL + "/usuario/get", { id_usuario: usuario.id_usuario }).then(res => {
          if (res.data.estado == 0 || res.data == null) {
            axios
              .post(process.env.BACKEND_URL + "/usuario/out", {
                id_usuario: usuario.id_usuario,
              })
              .then((res) => {
                if (res.data.status == 1) {
                  signOut({ callbackUrl: "/", redirect: true });
                }
              });
          }
          else {
            setUsuario(res.data);
          }
        });
        axios.post<Persona>(process.env.BACKEND_URL + "/persona/get", { id_persona: persona.id_persona }).then(res => {
          setPersona(res.data);
        });
      }
    }
  }, [data]);
  return (
    <Affix>
      <Row>
        <Col span={24}>
          <Header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              padding: "35px 0",
              backgroundColor: "white",
              boxShadow: "0 5px 5px rgba(0,0,0,0.05)",
            }}
            role="navigation"
          >
            <div
              className="fecha-container"
              style={{ position: "absolute", right: 240 }}
            >
              <span>
                <FaCalendarAlt style={{ marginRight: 10 }} />
                {`${dayjs().date() < 10 ? "0" + dayjs().date() : dayjs().date()
                  }/${dayjs().month() + 1 < 10
                    ? "0" + (dayjs().month() + 1)
                    : dayjs().month() + 1
                  }/${dayjs().year()}`}
              </span>
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
                          axios
                            .post(process.env.BACKEND_URL + "/usuario/out", {
                              id_usuario: usuario.id_usuario,
                            })
                            .then((res) => {
                              if (res.data.status == 1) {
                                signOut({ callbackUrl: "/", redirect: true });
                              }
                            });
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
                    color: "gray",
                    borderRight: "1px solid #AAA",
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
                    margin: "0 10px",
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
