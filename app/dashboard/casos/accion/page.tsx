"use client";
import { Breadcrumb, Button, FloatButton, Layout, Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Caso,
  Citacion,
  Denunciado,
  Seguimiento,
  dataCitacion,
  dataSeguimiento,
  datosCaso,
} from "../data";
import { Adulto, dataAdulto } from "../../adultos/data";
import { Persona, dataPersona } from "../../personal/agregar/data";
import { useSession } from "next-auth/react";
import SeguimientoOptions from "./seguimiento";
import { Hijo } from "../../hijos/data";
import { BiHappyAlt } from "react-icons/bi";
import CitacionOptions from "./citacion";
import ModalActaCompromiso from "./acta-compromiso";
import { dataDenunciado } from "../../denunciados/data";
import Link from "next/link";
import { Usuario, dataUsuario } from "../../usuarios/data";
import ActaOptions from "./acta";
const AccionCaso = () => {
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [adulto, setAdulto] = useState<Adulto>(dataAdulto);
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [citaciones, setCitaciones] = useState<Citacion[]>([]);
  const [denunciado, setDenunciado] = useState<Denunciado>(dataDenunciado);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [citacion, setCitacion] = useState<{
    citacion: Citacion;
    size: number;
  }>({ citacion: dataCitacion, size: 0 });
  const [seguimiento, setSeguimiento] = useState<Seguimiento>(dataSeguimiento);
  const params = useSearchParams();
  const { data } = useSession();
  const [usuario, setUsuario] = useState<Usuario>(dataUsuario);
  const router = useRouter();
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
      setPersona(persona);
      setUsuario({ ...usuario, ult_modificacion: "", password: "" });
      axios
        .post<Caso>(process.env.BACKEND_URL + "/caso/get", {
          id_caso: params.get("id_caso"),
        })
        .then((res) => {
          if (res.data && persona.cargo != "3") {
            axios
              .post<Denunciado>(process.env.BACKEND_URL + "/denunciado/get", {
                id_caso: res.data.id_caso,
              })
              .then((res) => {
                setDenunciado(res.data);
              });
            setCaso(res.data);
            axios
              .post<{ adulto: Adulto; hijos: Hijo[] }>(
                process.env.BACKEND_URL + "/adulto/get",
                {
                  id_adulto: res.data.id_adulto,
                }
              )
              .then((res) => {
                setAdulto({
                  ...res.data.adulto,
                  hijos: res.data.hijos,
                  expedido: res.data.adulto.expedido,
                });
                setLoaded(true);
              });
            axios
              .post<Citacion[]>(
                process.env.BACKEND_URL + "/caso/citacion/all",
                {
                  id_caso: params.get("id_caso"),
                }
              )
              .then((res) => {
                setCitaciones(res.data);
                setCitacion({ ...citacion, size: res.data.length });
              });
          } else {
            router.back();
          }
        });
    }
  }, [data]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Seguimientos`,
      children: (
        <SeguimientoOptions
          usuario={usuario}
          setSeguimiento={setSeguimiento}
          seguimiento={seguimiento}
          adulto={adulto}
          persona={persona}
          caso={caso}
        ></SeguimientoOptions>
      ),
    },
    {
      key: "2",
      label: `Citaciones`,
      children: (
        <CitacionOptions
          usuario={usuario}
          adulto={adulto}
          caso={caso}
          persona={persona}
          citaciones={citaciones}
          citacion={citacion}
          setCitacion={setCitacion}
          setCitaciones={setCitaciones}
        ></CitacionOptions>
      ),
    },
    {
      key: "3",
      label: `Actas`,
      children: (
        <ActaOptions
          usuario={usuario}
          setDenunciado={setDenunciado}
          adulto={adulto}
          caso={caso}
          loaded={loaded}
          open={open}
          persona={persona}
          setOpen={setOpen}
          denunciado={denunciado} 
             ></ActaOptions>
      ),
    },
  ];

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider defaultOpenKeys={[""]} defaultSelectedKey=""></MenuSider>
          <Content >
            <Navbar></Navbar>
            <Breadcrumb
              separator={<b style={{ fontSize: 18 }}>/</b>}
              className="mx-4 my-2"
              items={[
                {
                  href: "/dashboard",
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={"/dashboard/casos"}
                    >
                      Casos
                    </Link>
                  ),
                },
                {
                  title: (
                    <Link
                      style={{ marginTop: 2.5, fontSize: 15 }}
                      href={
                        "/dashboard/casos/accion?id_caso=" +
                        params.get('id_caso')
                      }
                    >
                      {params.get('id_caso')}
                    </Link>
                  ),
                },
              ]}
            />
            <Layout>
              <Content
                style={{ padding: "0 50px", position: "relative" }}
              >
                <Tabs
                  size="small"
                  style={{ marginTop: 20 }}
                  tabPosition="left"
                  defaultActiveKey="1"
                  className="bg-white p-5 rounded"
                  items={items}
                />
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
     
    </main>
  );
};

export default AccionCaso;
