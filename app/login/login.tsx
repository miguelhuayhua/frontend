"use client";

import { Button, Col, Form, Input, Row, } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from 'next/legacy/image'
export const LoginForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    usuario: "",
    password: "",
  });
  const [error, setError] = useState(false);
  return (
    <>
      <img
        height={100}
        src={"/assets/logo-gamea.png"}
        width={180}
        style={{ position: "absolute", top: 20, left: 20 }}
      />

      <img
        src={"/assets/logo-elalto.png"}
        width={150}
        height={100}
        style={{ position: "absolute", top: 20, right: 20 }}
      />
      <Row>
        <Col span={12} offset={6} lg={{ span: 8, offset: 8 }}>
          <Form
            className="form-styles"
            onFinish={async () => {
              setFormValues({ usuario: "", password: "" });
              const res = await signIn("credentials", {
                redirect: false,
                usuario: formValues.usuario,
                password: formValues.password,
                callbackUrl: "/dashboard",
              });

              if (!res?.error) {
                router.push("/dashboard");
              } else {
                setError(true);
              }
            }}
          >
            <h1>Iniciar Sesión</h1>
            <Form.Item className="mt-5" name={"usuario"}>
              <span className="label">Nombre de usuario:</span>
              <Input
                type="text"
                className="input-style"
                placeholder="Introduzca su nombre de usuario..."
                onChange={(value) => {
                  setFormValues({ ...formValues, usuario: value.target.value });
                }}
              ></Input>
            </Form.Item>
            <Form.Item name={"password"}>
              <span className="label">Contraseña:</span>
              <Input.Password
                className="input-style"
                placeholder="Ingrese su contraseña..."
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(value) => {
                  setFormValues({
                    ...formValues,
                    password: value.target.value,
                  });
                }}
              />
            </Form.Item>
            {error ? (
              <p style={{ color: "red", textAlign: "center" }}>
                Usuarios y contraseña inválidos...
              </p>
            ) : null}

            <Button htmlType="submit">Iniciar Sesión </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
