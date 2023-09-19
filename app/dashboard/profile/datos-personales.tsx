import { Col, DatePicker, Form, Input, InputNumber, Radio, Row } from "antd";
import { Content } from "antd/es/layout/layout";

const DatosPersonales = () => {
  return (
    <>
      <Content>
        <Row>
          <Col span={12}>
            <Form>
              <Row gutter={[24, 24]}>
                <Col span={24} md={{ span: 20, offset: 2 }}>
                  <Form.Item label="C.I.:">
                    <InputNumber style={{ width: "100%" }} name="ci" />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 20, offset: 2 }}>
                  <Form.Item label="Celular:">
                    <InputNumber style={{ width: "100%" }} name="celular" />
                  </Form.Item>
                </Col>
                <Col span={24} md={{ span: 20, offset: 2 }}>
                  <Form.Item label="Fecha de Nacimiento">
                    <DatePicker name="f_nacimiento" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Content>
    </>
  );
};

export default DatosPersonales;
