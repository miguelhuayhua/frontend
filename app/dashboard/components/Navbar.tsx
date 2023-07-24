"use client";
import {
  Affix,
  Avatar,
  Badge,
  Button,
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
import { CiLogout } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import "./estilos.scss";
import { signOut } from "next-auth/react";
import dayjs from "dayjs";
const Navbar = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item（disabled）",
      key: "3",
      disabled: true,
    },
  ];

  return (
    <Affix>
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

              zIndex: 1000,
              width: "99.6%",
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
              padding: "35px 0",
            }}
          >
            <div
              className="fecha-container"
              style={{ position: "absolute", right: 160 }}
            >
              <span>
                <FaCalendarAlt style={{ marginRight: 10 }} />
                {`${dayjs().date()}/${dayjs().month()}/${dayjs().year()}`}
              </span>
            </div>
            <div style={{ position: "absolute", right: 100 }}>
              <Dropdown placement="bottom" menu={{ items }}>
                <Badge count={99} overflowCount={10} style={{ border: "none" }}>
                  <Avatar icon={<BellOutlined />} size="large" />
                </Badge>
              </Dropdown>
            </div>

            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <div style={{ width: 200 }}>
                        <button
                          onClick={() => {
                            signOut({ redirect: true });
                          }}
                          className="btn w-100"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CiLogout style={{ fontSize: 18, marginRight: 20 }} />
                          Cerrar Sesión
                        </button>
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
                  backgroundColor: "#1677ff",
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
    </Affix>
  );
};

export default Navbar;
