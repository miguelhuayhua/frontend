"use client";
import { Breadcrumb, Layout, MenuProps, Row } from "antd";
import "moment/locale/es";
import { Content } from "antd/es/layout/layout";
//estilos
import "./estilos.scss";
import { HomeOutlined } from "@ant-design/icons";

import React from "react";

type MenuItem = Required<MenuProps>["items"][number];

import MenuSider from "../components/MenuSider";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Tutorial from "./tutorial";
export default function NuevoCaso() {
    //cargado de casos desde la API

    return (
        <main>
            <Layout>
                <Layout hasSider>
                    <MenuSider
                        defaultOpenKeys={["tutorial"]}
                        defaultSelectedKey="tutorial"
                    ></MenuSider>
                    <Content>
                        <Navbar></Navbar>
                        <Breadcrumb
                            separator={<b style={{ fontSize: 18 }}>/</b>}
                            className="mx-4 my-2"
                            items={[
                        
                                {
                                    title: (
                                        <Link
                                            style={{ marginTop: 2.5, fontSize: 15 }}
                                            href={"/tutorial"}
                                        >
                                            Tutorial
                                        </Link>
                                    ),
                                },
                            ]}
                        />
                        <Layout>
                            <Content
                                className="site-layout"
                                style={{ padding: "0 50px", position: "relative" }}
                            >
                                <Tutorial></Tutorial>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>
        </main>
    );
}
