import React, { useContext } from "react";
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

import { Persona } from "../../personal/agregar/data";
import { Caso, Citacion } from "../data";
import { AdultoMayor2, Citado, dias, dias2, meses } from "../nuevocaso/data";
import { DataContext2 } from "./citacion";
import dayjs from "dayjs";

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
  const data = useContext(DataContext2);
  let { caso, persona, adulto, nro_citacion, citacion, citados } = data as {
    caso: Caso;
    persona: Persona;
    adulto: AdultoMayor2;
    nro_citacion: string;
    citacion: Citacion;
    citados: Citado[];
  };
  let fecha = dayjs(citacion.fecha_citacion);
  let fecha_creacion = dayjs(citacion.fecha_creacion);
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
              marginHorizontal: "auto",
            }}
            src={"/assets/logo-elalto.png"}
          ></Image>

          <Svg style={{ marginHorizontal: "center" }} height="3" width="600">
            <Line
              x1="90"
              y1="2"
              x2="470"
              y2="2"
              strokeWidth={1}
              stroke="rgb(0,0,0)"
            />
          </Svg>
          <Text
            style={{
              fontSize: 9,
              ...styles.title,
            }}
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
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: 20,
              marginTop: 20,
              fontSize: 10,
              lineHeight: 1.5,
            }}
          >
            TIPOLOGÍA: {caso.tipologia}
            N° CASO: {caso.nro_caso}
          </Text>

          <Text
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 15,
              marginVertical: 20,
            }}
          >
            {nro_citacion.toUpperCase() + " CITACIÓN"}
          </Text>
          <Text style={{ fontSize: 12 }}>
            La unidad de Adultos Mayores, en el marco de sus atribuciones y
            competencias conferidas por la normativa vigente, cita a:
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {citados.map((citado, index) =>
              citado.citado == 1 ? (
                <Text
                  key={index}
                  style={{ textAlign: "center", marginTop: 10 }}
                >
                  {citado.nombres_apellidos.toUpperCase()}
                </Text>
              ) : null
            )}
          </View>
          <Text style={{ fontSize: 12, marginTop: 20, lineHeight: 1.5 }}>
            Apersonarse ante estas dependencias Unidad de Adultos Mayores,
            PLANTA BAJA JACHA UTA,(Alcaldía Municipal) para el día{" "}
            {dias2[fecha.day()]} {fecha.date()} de {meses[fecha.month()]} DE{" "}
            {fecha.year()} a horas {citacion.hora_citacion}, a objeto de tratar
            la situación del/la Adulta/o Mayor{" "}
            {adulto.nombre + " " + adulto.paterno + " " + adulto.materno} de{" "}
            {adulto.edad} años de edad.
          </Text>

          <Text style={{ fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
            El equipo multidisiciplinario de la Unidad de Adultos Mayores le
            informa que queda terminantemente PROHIBIDO EJERCER CUALQUIER TIPO
            DE MALTRATATO CONTRA EL/LA ADULTA/O MAYOR, y se le hace conocer que
            debe respetar sus derechos sin argüir desconocimiento.
          </Text>
          <Text
            style={{
              marginTop: 10,
              lineHeight: 1.5,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            DEBE PORTAR TODAS LAS MEDIDAS DE BIOSEGURIDAD AL MOMENTO DE ASITIR A
            NUESTRAS DEPENDENCIAS, ESTO CON EL FIN DE EVITAR LA PROPAGACIÓN DEL
            COVID-19
          </Text>
          <Text
            style={{
              marginTop: 10,
              lineHeight: 1.5,
              fontSize: 12,
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Se insinua puntualidad, portar su cédula de identidad y fotocopia
            del mismo.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: "#555",
              width: "100%",
              textAlign: "right",
            }}
          >
            El Alto, {fecha_creacion.date()} de {meses[fecha_creacion.month()]}{" "}
            de {fecha_creacion.year()}
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
