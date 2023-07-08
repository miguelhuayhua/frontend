"use client";
import {
  AutoComplete,
  Badge,
  Button,
  Col,
  Descriptions,
  Input,
  Modal,
  Progress,
  Row,
  Space,
  Spin,
  Switch,
  Tag,
  message,
  notification,
} from "antd";
import { NextPage } from "next";

import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { NextRouter, useRouter } from "next/router";
import Table, { ColumnsType } from "antd/es/table";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Caso, DatosDenunciado, Denunciado, datosCaso } from "../data";
import { SwitchChangeEventHandler } from "antd/es/switch";
import CasoModal from "./caso";
import { AdultoMayor, dataDatosGenerales } from "../../nuevocaso/data";
export const DataContext = createContext({});
//ROUTING

//PDF

const Informacion = () => {
  let refs = useRef(null);
  //estados
  const [open, setOpen] = useState(false);
  const [caso, setCaso] = useState<Caso>(datosCaso);
  const [adultoMayor, setAdultoMayor] =
    useState<AdultoMayor>(dataDatosGenerales);
  const [denunciado, setDenunciado] = useState<Denunciado>(DatosDenunciado);
  const columns: ColumnsType<Caso> = [
    {
      title: "Nro. de Caso",
      dataIndex: "nro_caso",
      key: "nro_caso",
      className: "text-center",
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
            <EditOutlined style={{ zIndex: 0 }} />
          </Button>
          <Switch key={caso.id_caso + "-"} checked={caso.estado == 1} />
        </div>
      ),
    },
  ];
  const [casos, setCasos] = useState<Caso[]>([]);
  const [displayCasos, setDisplayCasos] = useState<Caso[]>([]);

  //cargado de datos desde la API
  useEffect(() => {
    axios.get<Caso[]>("http://localhost:8000/caso/all").then((res) => {
      setCasos(res.data);
      setDisplayCasos(res.data);
    });
  }, []);

  return (
    <>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        style={{ width: 250 }}
      >
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>
      <Table
        pagination={{ pageSize: 20 }}
        columns={columns}
        dataSource={displayCasos}
        onRow={(value, index) => {
          return {
            onClick: (ev: any) => {
              try {
                if (ev.target.className.includes("switch")) {
                  axios
                    .post("http://localhost:8000/caso/estado", {
                      id_caso: value.id_caso,
                    })
                    .then((res) => {
                      message.success(
                        "¡Caso " + value.nro_caso + " cambiado con éxito!"
                      );
                      axios
                        .get<Caso[]>("http://localhost:8000/caso/all")
                        .then((res) => {
                          setCasos(res.data);
                          setDisplayCasos(res.data);
                        });
                    });
                } else if (ev.target.className.includes("ant-btn")) {
                  setCaso(value);
                  axios
                    .post<{ adulto: AdultoMayor; hijos: string[] }>(
                      "http://localhost:8000/adulto/obtener",
                      {
                        id_adulto: value.id_adulto,
                      }
                    )
                    .then((res) => {
                      setAdultoMayor({
                        ...res.data.adulto,
                        hijos: res.data.hijos,
                      });
                    });
                  axios.post("http://localhost:8000/adulto/obtener", {
                    id_caso: value.id_caso,
                  });
                  setOpen(true);
                }
              } catch (error) {
                setCaso(value);
                axios
                  .post<{ adulto: AdultoMayor; hijos: string[] }>(
                    "http://localhost:8000/denunciado/obtener",
                    {
                      id_adulto: value.id_adulto,
                    }
                  )
                  .then((res) => {
                    setAdultoMayor({
                      ...res.data.adulto,
                      hijos: res.data.hijos,
                    });
                  });
                axios.post("http://localhost:8000/denunciado/obtener", {
                  id_caso: value.id_caso,
                });
                setOpen(true);
              }
            },
          };
        }}
      />
      <CasoModal
        adultoMayor={adultoMayor}
        caso={caso!}
        setOpen={setOpen}
        open={open}
      ></CasoModal>
      ;
    </>
  );
};
export default Informacion;
