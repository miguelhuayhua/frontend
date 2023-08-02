"use client";

import { Button, Col, Form, Input, Row, message, Image } from "antd";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
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
        src={"/assets/logo-gamea.png"}
        width={180}
        style={{ position: "absolute", top: 20, left: 20 }}
      />

      <img
        src={"/assets/logo-elalto.png"}
        width={120}
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
              <span>Nombre de usuario:</span>
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
              <span>Contraseña:</span>
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
            <Link
              className="py-3"
              style={{
                color: "black",
                textAlign: "center",
                display: "block",
              }}
              href={"/forgotpassword"}
            >
              Olvidé mi contraseña
            </Link>
            <Button htmlType="submit">Iniciar Sesión </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
