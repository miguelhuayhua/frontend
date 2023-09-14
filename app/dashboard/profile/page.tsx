"use client";
import { Avatar, Card, Col, Layout, Row, Upload, message } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import "./estilos.scss";
import React, { useEffect, useState } from "react";
import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import { dataUsuario } from "../usuarios/data";
import { Persona, dataPersona } from "../personal/agregar/data";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Profile() {
  const { data } = useSession();
  const [usuario, setUsuario] = useState<{
    usuario: string;
    estado: number;
    fotografia: string;
    id_persona: string;
    id_usuario: string;
  }>(dataUsuario);

  const [file, setFile] = useState<any>(null);

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

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["none"]}
            defaultSelectedKey="none"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content
                className="site-layout mt-4"
                style={{ padding: "0 20px" }}
              >
                <Row>
                  <Col span={24} style={{ position: "relative" }}>
                    <div className="banner-container"></div>
                    <Card style={{ marginTop: 150 }}>
                      <Row>
                        <Col span={8} style={{ position: "relative" }}>
                          <div style={{ position: "absolute", top: -80 }}>
                            <Upload
                              name="avatar"
                              listType="picture-circle"
                              showUploadList={false}
                              multiple={false}
                              accept="image/png, image/jpeg"
                              maxCount={1}
                              customRequest={({ file: newFile, onSuccess }) => {
                                setTimeout(() => {
                                  // Almacenamos el nuevo archivo seleccionado en el estado file.
                                  let nuevoArchivo = newFile as File;
                                  setFile(nuevoArchivo);
                                  onSuccess!(null);
                                  message.success(
                                    `${nuevoArchivo.name} se cargó correctamente.`
                                  );
                                }, 2000);
                              }}
                            >
                              <div className="file-uploader">
                                <AiFillEdit className="icon" />
                              </div>
                              <Avatar
                                src={
                                  file == null
                                    ? process.env.BACKEND_URL +
                                      usuario.fotografia
                                    : URL.createObjectURL(file)
                                }
                                style={{
                                  width: 100,
                                  height: 100,
                                }}
                              ></Avatar>
                            </Upload>
                          </div>
                        </Col>
                        <Col span={16}></Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
