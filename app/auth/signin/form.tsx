"use client";

import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    usuario: "",
    password: "",
  });

  const [error, setShowError] = useState(false);
  return (
    <>
      <Form
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
            message.error("Credenciales inválidas...");
          }
        }}
      >
        <Form.Item label={"Nombre de usuario: "}>
          <Input
            type="text"
            onChange={(value) => {
              setFormValues((form) => {
                return { ...form, usuario: value.target.value };
              });
            }}
            value={formValues.usuario}
          ></Input>
        </Form.Item>
        <Form.Item label={"Contraseña: "}>
          <Input
            type="password"
            onChange={(value) => {
              setFormValues((form) => {
                return { ...form, password: value.target.value };
              });
            }}
            value={formValues.password}
          ></Input>
        </Form.Item>
        <Button htmlType="submit">Iniciar Sesión </Button>
      </Form>
    </>
  );
};
