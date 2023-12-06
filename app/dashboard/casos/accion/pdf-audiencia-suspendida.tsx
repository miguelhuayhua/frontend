import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Line,
  Svg,
} from "@react-pdf/renderer";

import { Caso, Citacion } from "../data";
import {
  AdultoMayor2,
  Audiencia,
  meses,
} from "../nuevocaso/data";
import dayjs from "dayjs";
import { Persona } from "../../personal/agregar/data";
const styles = StyleSheet.create({
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  textCenter: {
    textAlign: "center",
  },
  textEnd: {
    textAlign: "right",
  },
  parraf: {
    lineHeight: 1.4,
    fontFamily: "Helvetica",
    fontSize: 12,
    marginTop: 12,
  },
  page: {
    paddingLeft: 35,
    paddingRight: 35,
    paddingVertical: 25,
  },
  listItem: {
    marginLeft: 40,
  },
  bigTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  underline: {
    textDecoration: "underline",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 20,
    height: 20,
    border: "1px solid black",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
const FormularioAudienciaSuspendida = (props: {
  caso: Caso;
  persona: Persona;
  adulto: AdultoMayor2;
  citacion: Citacion;
  audiencia: Audiencia;
}) => {
  let { caso, persona, adulto, citacion, audiencia } = props;
  let fecha_citacion = dayjs(citacion.fecha_citacion ? citacion.fecha_citacion : null);
  return (
    <Document>
      <Page size={"LETTER"} style={styles.page}>
        <View style={{ position: "relative" }}>
        <Text
            style={{
              position: "absolute",
              top: -15,
              right: 20,
              color: "gray",
              fontSize: 8,
            }}
          >
            Generado por:
            {`${persona.nombres} ${persona.paterno} ${persona.materno}`}
          </Text>
          <Image
            style={{
              width: "100%",
              height: 75,
              position: "absolute",
              top: -2.5,
              left: 0,
            }}
            fixed
            src={"/assets/cabecera-documentos.png"}
          ></Image>

          <Text style={{ ...styles.textBold, ...styles.textCenter, marginTop: 70 }}>
            SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            DIRECCCIÓN DE DESARROLLO INTEGRAL
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            UNIDAD DE ADULTOS MAYORES
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            PROGRAMA: DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 30 }}>
            <Text style={styles.textBold}>CASO N°: </Text>
            <View
              style={{
                border: "1px solid black",
                borderRadius: 5,
                width: 100,
                padding: 2.5,
              }}
            >
              <Text style={{ ...styles.parraf, marginTop: 0 }}>
                {caso.nro_caso}
              </Text>
            </View>
          </View>
          <Text
            style={{ ...styles.textBold, ...styles.bigTitle, marginTop: 20 }}
          >
            AUDIENCIA SUSPENDIDA
          </Text>
          <Text style={styles.parraf}>
            En la ciudad de El Alto, a los {fecha_citacion ? fecha_citacion.date() : null + " "}
            días del mes de {fecha_citacion ? meses[fecha_citacion.month()] : null} del año{" "}
            {fecha_citacion ? fecha_citacion.year() : null} a horas {citacion.hora_citacion}, en el
            marco de la normativa legal vigente aplicable a esta población
            {" (Ley N° 369 y Ley N° 708)"}, en oficinas del PROGRAMA: DEFENSA
            y Restitución de Derechos de los Adultos Mayores, se{" "}
            <Text style={styles.textBold}> SUSPENDE LA CONCILIACIÓN </Text>
            señalada para la presente fecha, debido a:
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 15 }}>
            <Text
              style={{ ...styles.parraf, ...styles.listItem, marginTop: 0 }}
            >
              {"A) Inasistencia del (la) Adulto (a) Mayor: "}
            </Text>
            <View style={styles.box}>
              {audiencia.causa == "ina_adulto" ? (
                <Text style={{ fontSize: 12, textAlign: "center" }}>X</Text>
              ) : (
                null
              )}
            </View>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 15 }}>
            <Text
              style={{ ...styles.parraf, ...styles.listItem, marginTop: 0 }}
            >
              {"B) Inasistencia de la Parte Invitada: "}
            </Text>
            <View style={styles.box}>
              {audiencia.causa == "ina_invitado" ? (
                <Text style={{ fontSize: 12, textAlign: "center" }}>X</Text>
              ) : (
                null
              )}
            </View>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 15 }}>
            <Text
              style={{ ...styles.parraf, ...styles.listItem, marginTop: 0 }}
            >
              {"C) Ambas Partes: "}
            </Text>
            <View style={styles.box}>
              {audiencia.causa == "ambos" ? (
                <Text style={{ fontSize: 12, textAlign: "center" }}>X</Text>
              ) : (
                null
              )}
            </View>
          </View>
          <Text style={styles.parraf}>
            Observaciones:{" "}
            {audiencia.observacion == ""
              ? "Sin observaciones"
              : audiencia.observacion}
          </Text>
        </View>
        <View
          style={{
            ...styles.horizontal,
            marginTop: 100,
            justifyContent: "flex-start",
          }}
        >
          <View>
            <View
              style={{
                ...styles.horizontal,
                width: 300,
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.textBold}>Firma:</Text>
              <View
                style={{
                  height: 15,
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
              <Text style={styles.textBold}>Nombre Completo:</Text>
              <Text
                style={{
                  ...styles.parraf,
                  borderBottom: "0.5px solid black",
                  paddingHorizontal: 10,
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
              <Text style={styles.textBold}>N° Celular:</Text>
              <Text
                style={{
                  ...styles.parraf,
                  borderBottom: "0.5px solid black",
                  paddingHorizontal: 10,
                  marginLeft: 10,
                }}
              >
                {adulto.nro_referencia}
              </Text>
            </View>
          </View>

        </View>

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
  );
};
export default FormularioAudienciaSuspendida;
