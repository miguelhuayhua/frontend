import React, { useContext } from "react";
import ReactPDF, {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Line,
} from "@react-pdf/renderer";

import { Persona } from "../../personal/agregar/data";
import { Caso, Seguimiento } from "../data";
import { AdultoMayor2 } from "../nuevocaso/data";
import { DataContext } from "./seguimiento";

// Create styles
//estilos
const styles = StyleSheet.create({
  title: {
    width: "100%",
    textAlign: "center",
    marginTop: 10,
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
    position: "relative",
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    border: "1px solid black",
    borderRadius: 3,
    fontSize: 10,
  },

  textInfo: { width: "33%", color: "#999", textAlign: "center", fontSize: 8 },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
  },
  signatureBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 10,
    justifyContent: "center",
    marginRight: 20,
  },
});

// Create Document Component
const FormularioSeguimiento = () => {
  const data = useContext(DataContext);
  let { caso, persona, seguimiento, adulto } = data as {
    caso: Caso;
    persona: Persona;
    seguimiento: Seguimiento;
    adulto: AdultoMayor2;
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={{ position: "relative" }}>
          <Text
            style={{
              position: "absolute",
              top: 0,
              right: 50,
              color: "gray",
              fontSize: 8,
            }}
          >
            Generado por:
            {`${persona.nombres} ${persona.paterno} ${persona.materno}`}
          </Text>
          <Image
            style={{
              width: 80,
              height: 50,
              position: "absolute",
              top: 10,
              right: 5,
            }}
            src={"/assets/logo-gamea.png"}
          ></Image>
          <Image
            style={{
              width: 500,
              height: 100,
              position: "absolute",
              top: -20,
              right: 35,
              zIndex: -1,
            }}
            src={"/assets/linea-aymara.png"}
          ></Image>
          <Image
            style={{
              width: 80,
              height: 50,
              position: "absolute",
              top: 15,
              left: 5,
            }}
            src={"/assets/logo-elalto.png"}
          ></Image>
          <View style={{ width: "70%", marginHorizontal: "auto" }}>
            <Text
              style={{ fontWeight: "light", fontSize: 12, ...styles.title }}
            >
              GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
            </Text>
            <Text
              style={{ fontWeight: "extrabold", fontSize: 9, ...styles.title }}
            >
              SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
            </Text>
            <Text style={{ fontSize: 9, ...styles.title, marginTop: 5 }}>
              DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES
            </Text>
            <Text
              style={{
                fontSize: 9,
                ...styles.title,
                marginTop: 5,
              }}
            >
              PROGRAMA DE DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
            </Text>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 10 }}>
            <Text style={styles.textInfo}>
              {"Fecha y hora de registro: " +
                seguimiento.fecha_seguimiento +
                " " +
                seguimiento.hora_seguimiento}
            </Text>
            <Text style={{ fontWeight: "bold", marginLeft: 30, fontSize: 10 }}>
              TIPOLOGÍA:
            </Text>
            <Text style={styles.textContainer}>{caso.tipologia}</Text>
            <Text
              style={{ fontWeight: "bold", marginHorizontal: 30, fontSize: 10 }}
            >
              N° CASO:
            </Text>
            <Text style={styles.textContainer}>{caso.nro_caso}</Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            I. NOMBRES Y APELLIDOS DE LA PERSONA ADULTA MAYOR
          </Text>
          <Text style={styles.textContainer}>
            {adulto.nombre + " " + adulto.paterno + " " + adulto.materno}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 10, marginTop: 20 }}>
            II. DETALLES DEL SEGUIMIENTO DEL CASO{" "}
          </Text>
          <Text
            style={{
              ...styles.textContainer,

              fontStyle: "italic",
            }}
          >
            {seguimiento.detalle_seguimiento}
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 100 }}>
            <View>
              <View
                style={{
                  ...styles.horizontal,
                  width: 300,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontSize: 10 }}>Firma:</Text>
                <View
                  style={{
                    height: 10,
                    borderBottom: "0.5px solid black",
                    width: 150,
                    marginLeft: 10,
                  }}
                ></View>
              </View>
              <View
                style={{
                  ...styles.horizontal,
                  width: 300,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  Nombre Completo:
                </Text>
                <Text
                  style={{
                    borderBottom: "0.5px solid black",
                    paddingHorizontal: 10,
                    fontSize: 10,
                    marginLeft: 10,
                  }}
                >
                  {adulto.nombre + " " + adulto.paterno + " " + adulto.materno}
                </Text>
              </View>
              <View
                style={{
                  ...styles.horizontal,
                  width: 300,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  N° Celular:
                </Text>
                <Text
                  style={{
                    borderBottom: "0.5px solid black",
                    fontSize: 10,
                    paddingHorizontal: 10,
                    marginLeft: 10,
                  }}
                >
                  {adulto.nro_referencia}
                </Text>
              </View>
            </View>
            <View style={styles.signatureBox}>
              <Text style={{ borderTop: "0.5px solid black", paddingTop: 10 }}>
                {persona.profesion +
                  " " +
                  persona.nombres +
                  " " +
                  persona.paterno +
                  " " +
                  persona.materno}
              </Text>
              <Text>Sello y Firma del (la) profesional</Text>
            </View>
          </View>
        </View>
        <View
          fixed
          style={{ position: "absolute", bottom: 15, marginLeft: 35 }}
        >
          <Text
            fixed
            style={{ width: "100%", fontSize: 7, textAlign: "center" }}
          >
            Avenida Costanera Nro. 5002, urbanización libertad entre calles J.J.
            Torres y Hernán Siles.
          </Text>
          <Text
            fixed
            style={{ width: "100%", fontSize: 7, textAlign: "center" }}
          >
            {
              "Zuazo, Casa Municipal (Jach'a Uta), a media cuadra de la Estación de Bomberos El Alto."
            }
          </Text>
        </View>
      </Page>
    </Document>
  );
};
export default FormularioSeguimiento;
