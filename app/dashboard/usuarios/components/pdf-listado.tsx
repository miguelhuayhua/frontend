import React, { useContext } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Svg,
  Line,
} from "@react-pdf/renderer";
import { Persona, meses } from "../../personal/agregar/data";
import dayjs from "dayjs";
import { context5 } from "./informacion";
import { Usuario } from "../data";
const PdfUsuarios = () => {
  const data = useContext(context5);
  let { usuarios, persona } = data as {
    usuarios: Usuario[];
    persona: Persona;
  };
  const styles = StyleSheet.create({
    textBold: {
      fontFamily: "Helvetica-Bold",
      fontSize: 10,
    },
    textCenter: {
      textAlign: "center",
    },
    textEnd: {
      textAlign: "right",
    },
    parraf: {
      lineHeight: 1.3,
      fontFamily: "Helvetica",
      fontSize: 10,
      marginTop: 10,
    },
    page: {
      paddingLeft: 25,
      paddingRight: 30,
      paddingVertical: 15,
    },
    textBox: {
      border: "1px solid black",
      borderRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 7.5,
      paddingVertical: 2,
    },
    listItem: {
      marginLeft: 40,
    },
    bigTitle: {
      fontFamily: "Helvetica-Bold",
      fontSize: 15,
      textAlign: "center",
    },
    underline: {
      textDecoration: "underline",
    },
    horizontal: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      width: "100%",
      marginTop: 5,
    },
    signatureBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: 10,
      justifyContent: "center",
      marginRight: 20,
    },
    table: {
      width: "98%",
      marginTop: 10,
      marginHorizontal: "auto",
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    cellHeader: {
      backgroundColor: "#202123",
      color: "white",
      fontFamily: "Helvetica-Bold",
      fontSize: 10,
      textAlign: "center",
      width: "25%",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    cell: {
      fontFamily: "Helvetica",
      fontSize: 8,
      textAlign: "center",
      width: "25%",
      border: "1px solid gray",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <>
      <Document>
        <Page style={styles.page} orientation="landscape" size={"LETTER"}>
          <Text
            style={{
              position: "absolute",
              top: 5,
              left: 50,
              color: "gray",
              fontSize: 7,
            }}
          >
            Generado por:{" "}
            {`${persona.nombres} ${persona.paterno} ${persona.materno}`}
          </Text>
          <Text
            style={{
              position: "absolute",
              top: 5,
              right: 60,
              color: "gray",
              fontSize: 8,
            }}
          >
            Fecha y hora:{" "}
            {`${dayjs().date()}/${dayjs().month()}/${dayjs().year()}-${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`}
          </Text>
          <Image
            style={{
              width: "100%",
              height: "110",
              position: "absolute",
              top: 15,
              left: 20,
            }}
            fixed
            src={"/assets/cabecera-documentos.png"}
          ></Image>
          <Text
            style={{ ...styles.textBold, ...styles.textCenter, marginTop: 80 }}
          >
            SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            PROGRAMA: DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
          </Text>
          <Text style={{ ...styles.bigTitle, marginVertical: 10 }}>
            LISTADO DE USUARIOS
          </Text>

          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cellHeader}>
                <Text>ID Usuario</Text>
              </View>
              <View style={styles.cellHeader}>
                <Text>ID Persona</Text>
              </View>
              <View style={styles.cellHeader}>
                <Text>Usuario</Text>
              </View>
              <View style={styles.cellHeader}>
                <Text>Última Modificación</Text>
              </View>
            </View>
            {usuarios.map((value, index) => {
              return (
                <View key={index} style={styles.row}>
                  <View style={styles.cell}>
                    <Text>{value.id_usuario}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{value.id_persona}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{value.usuario}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{value.ult_modificacion}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={{ ...styles.parraf, ...styles.textEnd }}>
            El Alto, {dayjs().date()} de {meses[dayjs().month()]} de{" "}
            {dayjs().year()}
          </Text>
          <Image
            style={{
              width: "90%",
              height: "auto",
              position: "absolute",
              bottom: 10,
              left: "9%",
            }}
            fixed
            src={"/assets/footer-pdf.jpg"}
          ></Image>
        </Page>
      </Document>
    </>
  );
};

export default PdfUsuarios;
