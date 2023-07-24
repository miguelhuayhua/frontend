"use client";
import { Col, Layout, Row } from "antd";
import MenuSider from "../../components/MenuSider";
import { Content } from "antd/es/layout/layout";
import Navbar from "../../components/Navbar";

const AgregarPersonal = () => {
  return (
    <main>
      <Layout>
        <Layout hasSider>
          <MenuSider
            defaultSelectedKey="personal1.1"
            defaultOpenKeys={["personal"]}
          ></MenuSider>
          <Content>
            <Navbar></Navbar>
            <Layout>
              <Content className="site-layout" style={{ padding: "0 50px" }}>
                <Content>
                  <Row>
                    <Col span={24} lg={{ span: 12 }}></Col>
                  </Row>
                </Content>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default AgregarPersonal;
