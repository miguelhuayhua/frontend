"use client";
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Menu,
  MenuProps,
  Row,
  Tooltip,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Link from "next/link";
const Navbar = () => {
  return (
    <Row>
      <Col
        span={24}
        style={{
          borderRadius: 10,
        }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            margin: "4px auto",

            zIndex: 100,
            width: "99%",
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            padding: "35px 0",
          }}
        >
          <div style={{ position: "absolute", right: 100 }}>
            <Badge count={99} overflowCount={10} style={{ border: "none" }}>
              <Avatar icon={<BellOutlined />} size="large" />
            </Badge>
          </div>

          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div>
                      <Link href={"/logout"}>Cerrar Sesión</Link>
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Avatar
              style={{
                backgroundColor: "#87d068",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 20,
                cursor: "pointer",
                width: 45,
                height: 45,
                fontSize: 25,
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>
      </Col>
    </Row>
  );
};

export default Navbar;
