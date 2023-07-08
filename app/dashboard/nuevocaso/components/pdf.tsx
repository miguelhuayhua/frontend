import React, { useContext } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Tspan,
  Image,
} from "@react-pdf/renderer";
import { DataContext } from "./detalles";
import {
  AdultoMayor,
  DatosDenuncia,
  DatosDenunciado,
  DatosUbicacion,
} from "../data";

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
  },
  container: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    padding: 10,
  },
  textContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3.5,
    border: " 1px solid black",
    borderRadius: 2,
  },
  table: {
    marginBottom: 10,
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    marginBottom: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  tableHeaderCell: {
    marginBottom: 5,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  letterBox: {
    border: "1 solid black",
    borderLeft: "0 solid black",
    padding: 2,
    width: 15,
    textAlign: "center",
    fontWeight: "bold",
    margin: 0,
  },
  checker: {
    width: 10,
    height: 10,
    margin: 5,
    border: "1px solid black",
    borderRadius: 2.5,
  },
  checked: {
    width: 10,
    height: 10,
    margin: 5,
    border: "1px solid black",
    borderRadius: 2.5,
    backgroundColor: "black",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

// Create Document Component
const MyDocument = () => {
  const data = useContext(DataContext);
  let {
    datosGenerales,
    datosUbicacion,
    descripcionHechos,
    descripcionPeticion,
    datosDenunciado,
    accionesRealizadas,
    datosDenuncia,
  } = data as {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    descripcionHechos: string;
    descripcionPeticion: string;
    datosDenunciado: DatosDenunciado;
    accionesRealizadas: string;
    datosDenuncia: DatosDenuncia;
  };
  return (
    <Document>
      <Page style={styles.page}>
        <Image
          style={{ width: 70, height: 50 }}
          source={"assets/logo-gamea.png"}
        ></Image>
        <Text style={{ fontWeight: "bold", fontSize: 14, ...styles.title }}>
          SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
        </Text>
        <Text style={{ fontSize: 10, ...styles.title }}>
          DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES
        </Text>
        <Text style={{ fontSize: 11, paddingHorizontal: 60, ...styles.title }}>
          PROGRAMA DE DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
        </Text>
        <Text style={{ fontSize: 10, marginTop: 15 }}>
          I. DATOS GENERALES DE LA PERSONA ADULTA MAYOR
        </Text>
        <View style={styles.container}>
          <Text>NOMBRES Y APELLIDOS: </Text>
          <Text style={styles.textContainer}>
            {datosGenerales.nombre +
              " " +
              datosGenerales.paterno +
              " " +
              datosGenerales.materno}
          </Text>
          <View style={styles.horizontal}>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text>SEXO: FEMENINO</Text>
              <View
                style={
                  datosGenerales.sexo == "Femenino"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text> MASCULINO</Text>
              <View
                style={
                  datosGenerales.sexo == "Masculino"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
            </View>
            <View style={{ width: "25%", ...styles.horizontal }}>
              <Text>EDAD:</Text>
              <Text style={styles.textContainer}>{datosGenerales.edad}</Text>
            </View>
            <View style={{ width: "25%", ...styles.horizontal }}>
              <Text>N° C.I.:</Text>
              <Text style={styles.textContainer}>{datosGenerales.ci}</Text>
            </View>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 20 }}>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text>FECHA DE NACIMIENTO:</Text>
              <Text style={styles.textContainer}>
                {datosGenerales.fecha_nac}
              </Text>
            </View>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text>NRO. DE REFERENCIA:</Text>
              <Text style={styles.textContainer}>
                {datosGenerales.referencia}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: 10 }}>I. DATOS DE LA PERSONA</Text>

        <View style={styles.container}>
          <View style={styles.textContainer}></View>
          <View style={{ ...styles.textContainer, marginTop: 2 }}></View>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
