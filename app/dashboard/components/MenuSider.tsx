"use client";
import { Affix, Button, Menu, MenuProps } from "antd";
import "moment/locale/es";
import { useRouter } from "next/navigation";
//estilos
import React, { useEffect, useState } from "react";
import { MdElderly } from "react-icons//md";
import { GiInjustice } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
interface Props {
  defaultOpenKeys: string[];
  defaultSelectedKey: string;
}

type MenuItem = Required<MenuProps>["items"][number];
import MenuItem from "antd/es/menu/MenuItem";
import {
  BankOutlined,
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
import axios from "axios";
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
                      router.push("/dashboard/caso/reportes");
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
                  },
                  {
                    key: "personal1.3",
                    label: "Reportes",
                    icon: <TbReportAnalytics />,
                    onClick: () => {
                      router.push("/dashboard/personal/reportes");
                    },
                  },
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
                  {
                    key: "usuario1.3",
                    label: "Reportes",
                    icon: <TbReportAnalytics />,
                    onClick: () => {
                      router.push("/dashboard/reportes");
                    },
                  },
                ],
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
                      router.push("/dashboard/caso/reportes");
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
            backgroundColor: "#1a2d44",
            zIndex: 100,
            boxShadow: "0 0 10px #1a2d44",
          }}
        >
          <Menu
            theme="dark"
            selectedKeys={[props.defaultSelectedKey]}
            mode="inline"
            defaultOpenKeys={props.defaultOpenKeys}
            items={items}
            style={{ backgroundColor: "#1a2d44" }}
          />
        </Sider>
      </Affix>
    </>
  );
};

export default MenuSider;
