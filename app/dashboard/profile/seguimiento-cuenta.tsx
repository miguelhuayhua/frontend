import { Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { AccionesUsuario } from "./data";
import { NextPage } from "next";

interface Props {
  accionesUsuario: AccionesUsuario[];
}

const SeguimientoCuenta: NextPage<Props> = (props) => {
  return (
    <>
      <Content>
        <Row>
          <Col></Col>
        </Row>
      </Content>
    </>
  );
};

export default SeguimientoCuenta;
