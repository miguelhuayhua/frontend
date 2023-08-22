"use client";
import { Layout, Tabs, TabsProps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import MenuSider from "../../components/MenuSider";
import Navbar from "../../components/Navbar";
import axios from "axios";
import {
  Caso,
  Citacion,
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
import CitacionOptions from "./citacion";
const AccionCaso = () => {
  const [persona, setPersona] = useState<Persona>(dataPersona);
  const [adulto, setAdulto] = useState<Adulto>(dataAdulto);
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [citaciones, setCitaciones] = useState<Citacion[]>([]);

  const [citacion, setCitacion] = useState<{
    citacion: Citacion;
    size: number;
  }>({ citacion: dataCitacion, size: 0 });
  const [seguimiento, setSeguimiento] = useState<Seguimiento>(dataSeguimiento);
  const params = useSearchParams();
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
        });
      axios
        .post<Caso>(process.env.BACKEND_URL + "/caso/get", {
          id_caso: params.get("id_caso"),
        })
        .then((res) => {
          setCaso(res.data);
          axios
            .post<{ adulto: Adulto; hijos: Hijo[] }>(
              process.env.BACKEND_URL + "/adulto/get",
              {
                id_adulto: res.data.id_adulto,
              }
            )
            .then((res) => {
              setAdulto({ ...res.data.adulto, hijos: res.data.hijos });
            });
        });
      axios
        .post<Citacion[]>(process.env.BACKEND_URL + "/caso/citacion/all", {
          id_caso: params.get("id_caso"),
        })
        .then((res) => {
          setCitaciones(res.data);
          setCitacion({ ...citacion, size: res.data.length });
        });
    }
  }, [data]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Seguimientos`,
      children: (
        <SeguimientoOptions
          setSeguimiento={setSeguimiento}
          seguimiento={seguimiento}
          adulto={adulto}
          persona={persona}
          caso={caso}
          data={data}
        ></SeguimientoOptions>
      ),
    },
    {
      key: "2",
      label: `Citaciones`,
      children: (
        <CitacionOptions
          adulto={adulto}
          caso={caso}
          data={data}
          persona={persona}
          citaciones={citaciones}
          citacion={citacion}
          setCitacion={setCitacion}
          setCitaciones={setCitaciones}
        ></CitacionOptions>
      ),
    },
  ];

  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultOpenKeys={["caso1"]}
            defaultSelectedKey="caso1.2"
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content
                className="site-layout"
                style={{ padding: "0 50px", position: "relative" }}
              >
                <Tabs defaultActiveKey="1" items={items} />;
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default AccionCaso;
