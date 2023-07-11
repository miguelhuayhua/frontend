"use client";
import { Avatar, Badge, Dropdown, Menu, MenuProps, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Link from "next/link";
const Navbar = () => {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderRadius: 10,
        padding: "40px 0",
      }}
    >
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />

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
  );
};

export default Navbar;
