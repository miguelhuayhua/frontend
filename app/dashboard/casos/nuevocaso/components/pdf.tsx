import React, { useContext } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { DataContext } from "./detalles";
import {
  AdultoMayor,
  DatosDenuncia,
  DatosDenunciado,
  DatosUbicacion,
} from "../data";
import dayjs from "dayjs";
import { Persona } from "@/app/dashboard/personal/agregar/data";

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
  container: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "5px",
    padding: 10,
  },
  textContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3.5,
    border: "1px solid black",
    borderRadius: 2,
  },
  checker: {
    width: 10,
    height: 10,
    margin: 5,
    border: "1px solid black",
    borderRadius: 2.5,
  },
  textInfo: { width: "33%", color: "#999", textAlign: "center", fontSize: 8 },
  checked: {
    width: 10,
    height: 10,
    margin: 5,
    border: "1px solid black",
    borderRadius: 2.5,
    backgroundColor: "#1a9bcd",
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  Text: {
    fontSize: 8,
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
    accionRealizada,
    datosDenuncia,
  } = data as {
    datosGenerales: AdultoMayor;
    datosUbicacion: DatosUbicacion;
    descripcionHechos: string;
    descripcionPeticion: string;
    datosDenunciado: DatosDenunciado;
    accionRealizada: string;
    datosDenuncia: DatosDenuncia;
  };
  let { persona } = data as { persona: Persona };
  return (
    <Document>
      <Page style={styles.page}>
        <Text
          style={{
            position: "absolute",
            top: 8,
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
            width: 90,
            height: 60,
            position: "absolute",
            top: 15,
            right: 10,
          }}
          src={"/assets/logo-gamea.png"}
        ></Image>
        <Image
          style={{
            width: 500,
            height: 100,
            position: "absolute",
            top: 0,
            right: 40,
            zIndex: -1,
          }}
          src={"/assets/linea-aymara.png"}
        ></Image>
        <Image
          style={{
            width: 90,
            height: 60,
            position: "absolute",
            top: 20,
            left: 10,
          }}
          src={"/assets/logo-elalto.png"}
        ></Image>
        <View style={{ width: "70%", marginHorizontal: "auto" }}>
          <Text style={{ fontWeight: "light", fontSize: 14, ...styles.title }}>
            GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
          </Text>
          <Text
            style={{ fontWeight: "extrabold", fontSize: 14, ...styles.title }}
          >
            SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
          </Text>
          <Text style={{ fontSize: 10, ...styles.title, marginTop: 5 }}>
            DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES
          </Text>
          <Text
            style={{
              fontSize: 9,
              paddingHorizontal: 60,
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
              datosDenuncia.fecha_registro +
              " " +
              datosDenuncia.hora_registro}
          </Text>
          <Text style={styles.textInfo}>
            {"Tipología: " + datosDenuncia.tipologia}
          </Text>
          <Text style={styles.textInfo}>
            {"N° de caso: " + datosDenuncia.nro_caso + "/" + dayjs().year()}
          </Text>
        </View>
        <Text style={{ fontSize: 10, marginTop: 15, marginBottom: 5 }}>
          I. DATOS GENERALES DE LA PERSONA ADULTA MAYOR
        </Text>
        <View style={styles.container}>
          <Text style={{ fontSize: 10 }}>NOMBRES Y APELLIDOS: </Text>
          <Text style={{ ...styles.textContainer, fontSize: 10 }}>
            {datosGenerales.nombre +
              " " +
              datosGenerales.paterno +
              " " +
              datosGenerales.materno}
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 5 }}>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>SEXO: FEMENINO</Text>
              <View
                style={
                  datosGenerales.sexo == "Femenino"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}> MASCULINO</Text>
              <View
                style={
                  datosGenerales.sexo == "Masculino"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
            </View>
            <View style={{ width: "25%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>EDAD: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosGenerales.edad}
              </Text>
            </View>
            <View style={{ width: "25%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>N° C.I.: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosGenerales.ci}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 5 }}>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>FECHA DE NACIMIENTO: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosGenerales.f_nacimiento}
              </Text>
            </View>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>NRO. DE REFERENCIA: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosGenerales.nro_referencia}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 5, ...styles.horizontal }}>
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>
              ESTADO CIVIL:
            </Text>
            <Text style={{ fontSize: 10 }}>SOLTERO(A)</Text>
            <View
              style={
                datosGenerales.estado_civil == "Soltero(a)"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> CASADO(A)</Text>
            <View
              style={
                datosGenerales.estado_civil == "Casado(a)"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> CONCUBINO(A)</Text>
            <View
              style={
                datosGenerales.estado_civil == "Concubino(a)"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> DIVORCIADO(A)</Text>
            <View
              style={
                datosGenerales.estado_civil == "Divorciado(a)"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> VIUDO(A)</Text>
            <View
              style={
                datosGenerales.estado_civil == "Viudo(a)"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
          </View>
          <View style={{ width: "50%", marginTop: 5, ...styles.horizontal }}>
            <Text style={{ fontSize: 10 }}>N° Y NOMBRE DE HIJOS: </Text>
            <Text style={{ ...styles.textContainer, fontSize: 10 }}>
              {datosGenerales.hijos.length + " hijos(as). "}
              {datosGenerales.hijos.map((hijo, i) => {
                return i < datosGenerales.hijos.length
                  ? hijo + ","
                  : hijo + ". ";
              })}
            </Text>
          </View>
          <View style={{ width: "100%", marginTop: 5, ...styles.horizontal }}>
            <Text style={{ fontSize: 10 }}>
              GRADO DE INSTRUCCIÓN: PRIMARIA{" "}
            </Text>
            <View
              style={
                datosGenerales.grado == "Primaria"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> SECUNDARIA </Text>
            <View
              style={
                datosGenerales.grado == "Secundaria"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> TÉCNICO </Text>
            <View
              style={
                datosGenerales.grado == "Tecnico"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> UNIVERSITARIO </Text>
            <View
              style={
                datosGenerales.grado == "Universitario"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> SIN INSTRUCCIÓN </Text>
            <View
              style={
                datosGenerales.grado == "S/Inst."
                  ? styles.checked
                  : styles.checker
              }
            ></View>
          </View>
          <View style={{ ...styles.horizontal, marginTop: 0 }}>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>OCUPACIÓN: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosGenerales.ocupacion}
              </Text>
            </View>
            <View style={{ width: "50%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>BENEFICIOS: RENTA DIGNIDAD </Text>
              <View
                style={
                  datosGenerales.beneficios == "Renta Dignidad"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}> JUBILADO </Text>
              <View
                style={
                  datosGenerales.beneficios == "Jubilado"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}> NINGUNO </Text>
              <View
                style={
                  datosGenerales.beneficios == "Ninguno"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 2, ...styles.horizontal }}>
            <Text style={{ fontSize: 10 }}>DOMICILIO: PROPIO </Text>
            <View
              style={
                datosUbicacion.tipo_domicilio == "Propio"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> ALQUILADO </Text>
            <View
              style={
                datosUbicacion.tipo_domicilio == "Alquilado"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> ANTICRÉTICO </Text>
            <View
              style={
                datosUbicacion.tipo_domicilio == "Anticretico"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> CEDIDO </Text>
            <View
              style={
                datosUbicacion.tipo_domicilio == "Cedido"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}> OTRO </Text>
            <View
              style={
                datosUbicacion.tipo_domicilio == "Otro"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            {datosUbicacion.tipo_domicilio == "Otro" ? (
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosUbicacion.otro_domicilio}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        <Text style={{ fontSize: 10, marginTop: 15, marginBottom: 5 }}>
          II. DESCRIPCIÓN DE LOS HECHOS
        </Text>
        <View style={styles.container}>
          <Text style={{ fontSize: 10 }}>{descripcionHechos}</Text>
        </View>
        <Text style={{ fontSize: 10, marginTop: 15, marginBottom: 5 }}>
          III. PETICIÓN DE LA PERSONA ADULTA MAYOR
        </Text>
        <View style={styles.container}>
          <Text style={{ fontSize: 10 }}>{descripcionPeticion}</Text>
        </View>
        <Text style={{ fontSize: 10, marginTop: 15, marginBottom: 5 }}>
          IV. DATOS PERSONALES DEL DENUNCIADO(A)
        </Text>
        <View style={styles.container}>
          <View style={{ ...styles.horizontal, marginTop: 5 }}>
            <View style={{ width: "100%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>NOMBRES Y APELLIDOS: </Text>
              <Text style={{ ...styles.textContainer, fontSize: 10 }}>
                {datosDenunciado.nombres +
                  " " +
                  datosDenunciado.paterno +
                  " " +
                  datosDenunciado.materno}
              </Text>
            </View>
            <View style={{ width: "100%", ...styles.horizontal }}>
              <Text style={{ fontSize: 10 }}>PARENTEZCO: HIJO(A) </Text>
              <View
                style={
                  datosDenunciado.parentezco == "Hijo(a)"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}>FAMILIAR </Text>
              <View
                style={
                  datosDenunciado.parentezco == "Familiar"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}>CONOCIDO </Text>
              <View
                style={
                  datosDenunciado.parentezco == "Conocido"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
              <Text style={{ fontSize: 10 }}>DESCONOCIDO </Text>
              <View
                style={
                  datosDenunciado.parentezco == "Desconocido"
                    ? styles.checked
                    : styles.checker
                }
              ></View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 10, marginTop: 15, marginBottom: 5 }}>
          V. ACCIONES REALIZADAS
        </Text>
        <View style={styles.container}>
          <View style={{ width: "100%", ...styles.horizontal }}>
            <Text style={{ fontSize: 10 }}>APERTURA </Text>
            <View
              style={
                accionRealizada == "Apertura" ? styles.checked : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}>ORIENTACIÓN </Text>
            <View
              style={
                accionRealizada == "Orientacion"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}>CITACIÓN </Text>
            <View
              style={
                accionRealizada == "Citacion" ? styles.checked : styles.checker
              }
            ></View>
            <Text style={{ fontSize: 10 }}>DERIVACIÓN </Text>
            <View
              style={
                accionRealizada == "Derivacion"
                  ? styles.checked
                  : styles.checker
              }
            ></View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
