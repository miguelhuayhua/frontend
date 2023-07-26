import { LoginForm } from "./login";
import "./estilos.scss";
import { Col, Row } from "antd";
export default function LoginPage() {
  return (
    <>
      <section className="login-body">
        <LoginForm />
      </section>
    </>
  );
}
