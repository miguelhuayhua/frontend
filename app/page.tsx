"use client";
import { Button, Card, Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import './estilos.scss';
import Image from 'next/legacy/image';
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
export default function Home() {
  return (
    <main>
      <Layout style={{ backgroundColor: 'transparent' }}>
        <div >

          <Header className="main-nav"  >
            <nav className="position-relative">
              <small className="position-absolute" style={{ top: 0, display: 'flex', width: "100%", height: 20, zIndex: 100, justifyContent: 'center', alignItems: 'center' }}>Gobierno Autónomo Municipal de El Alto - 2023</small>
              <Image className="mt-1" alt="" src={"/assets/logo-gamea.png"} width={100} height={60} layout="fixed"></Image>
              <Image className="mt-1" alt="" src={"/assets/escudo-pluri.jpg"} width={150} height={70} layout="fixed"></Image>
              <Link style={{ position: 'absolute', right: 0, top: 10 }} href={"/login"} passHref>
                <Button className="login-btn" icon={<CiLogin className="icon" />}></Button>
              </Link>
            </nav>

          </Header>
          <Content className="content-main">
            <Row className="bg-white">
              <Col span={15}>
                <h1 className="h3 fw-bold mx-5 mt-5 to-right">
                  UNIDAD DE ADULTOS MAYORES - <span style={{ color: '#0c9ccb' }}>GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO</span>
                </h1>
                <h5 className="mx-5 mt-1 mb-4 to-right text-danger fw-bold">Sistema de denuncias del adulto mayor</h5>
                <hr />
                <p className="m-5 mt-4 fs-6 to-right">
                  Atención y registro de denuncias, en defensa para todas las personas adultas mayores de todos los distritos de la ciudad de El Alto.
                </p>
              </Col>
              <Col span={9}>
                <Image alt="" className="to-left" style={{ opacity: .9 }} src={"/assets/jacha-uta.jpg"} width={100} height={60} layout="responsive" />

              </Col>
            </Row>
            <div className="rectangle px-0 mx-0">
            </div>
            <Row className="bg-white position-relative">
              <div className="triangle-down px-0 mx-0">
              </div>
              <Col span={24}>
                <p className="ps-5 mt-4 h5 mb-5 text-center">{"Bienvenidos al Sistema de Registro de Denuncias para el Adulto Mayor del Gobierno Municipal de El Alto (GAMEA)"}</p>
              </Col>
              <Col span={8} className="p-5">
                <Card size="small">
                  <Image src={"/assets/adultos.jpg"} width={100} height={60} layout="responsive" />
                  <hr />
                  <h4 className="titles">La voz cuenta</h4>
                  <p className="text">El sistema presente brinda la oportunidad de alzar la voz  y proteger a nuestros adultos mayores. Las denuncias puede marcar la diferencia en sus vidas.</p>
                </Card>
              </Col>
              <Col span={8} className="p-5">
                <Card size="small">
                  <Image alt="" src={"/assets/computador.jpg"} width={100} height={60} layout="responsive" />
                  <hr />
                  <h4 className="titles">Garantizar la atención rápida</h4>
                  <p className="text">Tras el nuevo uso e implementación se prevee una atención más rápida y un trabajo más eficiente con todas las denuncias generadas con el paso del tiempo.</p>
                </Card>
              </Col>
              <Col span={8} className="p-5">
                <Card size="small">
                  <Image alt="" src={"/assets/tecnologia.jpeg"} width={100} height={60} layout="responsive" />
                  <hr />
                  <h4 className="titles">Nueva tecnología al alcance</h4>
                  <p className="text">Sistema realizado con la última tecnología presente y popular en el mercado.</p>
                </Card>
              </Col>
              <div className="triangle-up px-0 mx-0">
              </div>
            </Row>
          </Content>
        </div>
        <Footer style={{ backgroundColor: 'white' }}>
          <Link style={{ fontSize: 10, display: 'block', textAlign: 'center', textDecoration: 'none' }} href={"https://portafolio-miguelhuayhua.vercel.app/"}>Desarrollado por Miguel Huayhua</Link>

        </Footer>

      </Layout>
    </main>
  );
}
