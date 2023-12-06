"use client";
import { Affix, Button, Menu, MenuProps } from "antd";
import "moment/locale/es";
import { useRouter } from "next/navigation";
//estilos
import React, { useEffect, useState } from "react";
import { MdElderly } from "react-icons//md";
import { GiInjustice } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoMdVideocam } from "react-icons/io";
interface Props {
  defaultOpenKeys: string[];
  defaultSelectedKey: string;
}
import Image from "next/legacy/image";
type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  EyeOutlined,
  PlusOutlined,
  BarChartOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./estilos.scss";
import { NextPage } from "next";
import Sider from "antd/es/layout/Sider";
import { useSession } from "next-auth/react";
import { dataUsuario } from "../usuarios/data";
import { Persona, dataPersona } from "../personal/agregar/data";
import Link from "next/link";
const MenuSider: NextPage<Props> = (props) => {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);
  const { data } = useSession();
  const [usuario, setUsuario] = useState<{
    usuario: string;
    estado: number;
    fotografia: string;
    id_persona: string;
    id_usuario: string;
  }>(dataUsuario);
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
      setUsuario({ ...usuario });
      setItems(
        persona.cargo == "1"
          ? [
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <BarChartOutlined />,
              onClick: () => {
                router.push("/dashboard");
              },
            },
            {
              key: "caso1",
              label: "Casos",
              icon: <GiInjustice />,
              children: [
                {
                  label: "Agregar Caso",
                  key: "caso1.1",
                  icon: <PlusOutlined />,
                  onClick: () => {
                    router.push("/dashboard/casos/nuevocaso");
                  },
                },
                {
                  label: "Ver Casos",
                  key: "caso1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/casos");
                  },
                },

                {
                  label: "Ver Denunciados",
                  key: "caso1.4",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/denunciados");
                  },
                },
                {
                  key: "caso1.5",
                  label: "Reportes",
                  icon: <TbReportAnalytics />,
                  onClick: () => {
                    router.push("/dashboard/casos/reportes");
                  },
                },
              ],
            },

            {
              label: "Personas Adultas",
              key: "adultos1",
              icon: <MdElderly></MdElderly>,
              children: [
                {
                  label: "Ver Adultos",
                  key: "adultos1.1",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/adultos");
                  },
                },
                {
                  label: "Ver Hijos",
                  key: "adultos1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/hijos");
                  },
                },
                {
                  key: "adultos1.3",
                  label: "Reportes",
                  icon: <TbReportAnalytics />,
                  onClick: () => {
                    router.push("/dashboard/adultos/reportes");
                  },
                },
              ],
            },

            {
              key: "personal",
              label: "Personal",
              icon: <TeamOutlined />,
              children: [
                {
                  label: "Registrar Personal",
                  key: "personal1.1",
                  icon: <UsergroupAddOutlined />,
                  onClick: () => {
                    router.push("/dashboard/personal/agregar");
                  },
                },
                {
                  label: "Ver Personal",
                  key: "personal1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/personal");
                  },
                }
              ],
            },
            {
              label: "Usuarios",
              key: "usuario1",
              icon: <UserOutlined />,
              children: [
                {
                  label: "Registrar Usuario",
                  key: "usuario1.1",
                  icon: <UserAddOutlined />,
                  onClick: () => {
                    router.push("/dashboard/usuarios/agregar");
                  },
                },
                {
                  label: "Ver Usuarios",
                  key: "usuario1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/usuarios");
                  },
                },

              ],
            },
            {
              label: "Tutorial",
              key: "tutorial",
              icon: <IoMdVideocam />,
              onClick: () => {
                router.push("/dashboard/tutorial");
              }
            },
          ]
          : [
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <BarChartOutlined />,
              onClick: () => {
                router.push("/dashboard");
              },
            },
            {
              key: "caso1",
              label: "Casos",
              icon: <GiInjustice />,
              children: [
                {
                  label: "Agregar Caso",
                  key: "caso1.1",
                  disabled: persona.cargo == "3",
                  icon: <PlusOutlined />,
                  onClick: () => {
                    router.push("/dashboard/casos/nuevocaso");
                  },
                },
                {
                  label: "Ver Casos",
                  key: "caso1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/casos");
                  },
                },

                {
                  label: "Ver Denunciados",
                  key: "caso1.4",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/denunciados");
                  },
                },
                {
                  key: "caso1.5",
                  label: "Reportes",
                  icon: <TbReportAnalytics />,
                  onClick: () => {
                    router.push("/dashboard/casos/reportes");
                  },
                },
              ],
            },
            {
              label: "Personas Adultas",
              key: "adultos1",
              icon: <MdElderly></MdElderly>,
              children: [
                {
                  label: "Ver Adultos",
                  key: "adultos1.1",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/adultos");
                  },
                },
                {
                  label: "Ver Hijos",
                  key: "adultos1.2",
                  icon: <EyeOutlined />,
                  onClick: () => {
                    router.push("/dashboard/hijos");
                  },
                },
                {
                  key: "adultos1.3",
                  label: "Reportes",
                  icon: <TbReportAnalytics />,
                  onClick: () => {
                    router.push("/dashboard/adultos/reportes");
                  },
                },
              ],
            },
            {
              label: "Tutorial",
              key: "tutorial",
              icon: <IoMdVideocam />,
              onClick: () => {
                router.push("/dashboard/tutorial");
              }
            },
          ]
      );
    }
  }, [data]);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Affix>
        <Sider
          breakpoint="md"
          collapsible
          width={250}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          defaultCollapsed={true}
          style={{
            overflow: "auto",
            height: "100vh",
            width: 200,
            position: "sticky",
            left: 0,
            backgroundColor: "#FEFEFE",
            zIndex: 100,
            boxShadow: "0 0 10px #2BC4F144",
          }}
        >
          <Link
            href={"/dashboard"}
            style={{
              textDecoration: "None",
              textAlign: "center",
              fontWeight: "bold",
              color: "#1AB2C0",
              fontSize: 12,
            }}
          >
            <div style={{ width: "70%", margin: "20px auto" }}>
              <Image
                layout="responsive"
                width={100}
                height={60}
                src={"/assets/logo-gamea.png"}
                style={{ marginBottom: 5 }}
              ></Image>
              UNIDAD
              <br />
              ADULTOS MAYORES
            </div>
          </Link>
          <Menu
            selectedKeys={[props.defaultSelectedKey]}
            mode="inline"
            defaultOpenKeys={props.defaultOpenKeys}
            items={items}
            style={{ backgroundColor: "#FEFEFE" }}
          />
        </Sider>
      </Affix>
    </>
  );
};

export default MenuSider;
