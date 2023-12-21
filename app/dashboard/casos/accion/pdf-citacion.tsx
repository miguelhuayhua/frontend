import React, { useContext } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";

import { Persona } from "../../personal/agregar/data";
import { Caso, Citacion } from "../data";
import { AdultoMayor2, Citado, dias, dias2, meses } from "../nuevocaso/data";
import { DataContext2 } from "./citacion";
import dayjs from "dayjs";

// Create styles
//estilos
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
    lineHeight: 1.3,
    fontFamily: "Helvetica",
    fontSize: 12,
    marginTop: 12,
  },
  page: {
    paddingLeft: 25,
    paddingRight: 30,
    paddingVertical: 25,
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
              top: -15,
              right: 20,
              color: "gray",
              fontSize: 7,
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
          <Text style={{ ...styles.textCenter, ...styles.textBold }}>
            DIRECCCIÓN DE DESARROLLO INTEGRAL
          </Text>
          <Text style={{ ...styles.textCenter, ...styles.textBold }}>
            UNIDAD DE ADULTOS MAYORES
          </Text>
          <Text style={{ ...styles.textCenter, ...styles.textBold }}>
            PROGRAMA: DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
          </Text>
          <Text style={styles.parraf}>TIPOLOGÍA: {caso.tipologia}</Text>
          <Text style={styles.parraf}>N° CASO: {caso.nro_caso}</Text>
          <Text style={{ ...styles.bigTitle, ...styles.underline }}>
            {nro_citacion.toUpperCase() + " CITACIÓN"}
          </Text>
          <Text style={styles.parraf}>
            La unidad de Adultos Mayores, en el marco de sus atribuciones y
            competencias conferidas por la normativa vigente, cita a:
          </Text>

          {citados.map((citado, index) =>
            citado.citado == 1 ? (
              <Text
                key={index}
                style={{
                  ...styles.parraf,
                  ...styles.textCenter,
                  ...styles.textBold,
                }}
              >
                {citado.nombres_apellidos.toUpperCase()}
              </Text>
            ) : null
          )}
          <Text style={styles.parraf}>
            Apersonarse ante estas dependencias Unidad de Adultos Mayores,
            PLANTA BAJA JACHA UTA,(Alcaldía Municipal) para el día{" "}
            {dias2[fecha ? fecha.day() : 0] + " "} {fecha ? fecha.date() : null} de {meses[fecha ? fecha.month() : 0]} DE{" "}
            {fecha ? fecha.year() : 0} a horas {citacion.hora_citacion}, a objeto de tratar
            la situación{" "}
            {adulto.genero == "Masculino" ? "del Adulto" : "la Adulta "}Mayor{" "}
            <Text style={styles.textBold}>
              {adulto.nombre + " " + adulto.paterno + " " + adulto.materno}
            </Text>{" "}
            de {adulto.edad} años de edad.
          </Text>

          <Text style={styles.parraf}>
            El equipo multidisiciplinario de la Unidad de Adultos Mayores le
            informa que queda terminantemente PROHIBIDO EJERCER CUALQUIER TIPO
            DE MALTRATATO CONTRA{" "}
            {adulto.genero == "Masculino" ? "EL ADULTO" : "LA ADULTA"} MAYOR, y
            se le hace conocer que debe respetar sus derechos sin argüir
            desconocimiento.
          </Text>

          <Text
            style={{
              ...styles.parraf,
              ...styles.textBold,
              ...styles.underline,
            }}
          >
            Se insinua puntualidad, portar su cédula de identidad y fotocopia
            del mismo.
          </Text>
          <Text style={{ ...styles.parraf, ...styles.textEnd }}>
            El Alto, {fecha_creacion.date()} de {meses[fecha_creacion.month()]}{" "}
            de {fecha_creacion.year()}
          </Text>

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
export default FormularioSeguimiento;
