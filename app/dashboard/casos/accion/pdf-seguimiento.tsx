import React, { useContext } from "react";
import ReactPDF, {
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
import { Caso, Seguimiento } from "../data";
import { AdultoMayor2 } from "../nuevocaso/data";
import HTMLReactParser from "html-react-parser";

// Create styles
//estilos
const styles = StyleSheet.create({
  textBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  textBold2: {
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
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 20,
    position: "relative",
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
  text: {
    fontSize: 10,
  },
  textItalic: { fontSize: 10, fontFamily: "Helvetica-Oblique" },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 20,
  },
  signatureBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 10,
    justifyContent: "center",
    marginRight: 20,
  },
  textBoldItalic: { fontSize: 10, fontFamily: "Helvetica-BoldOblique" }
});
// Create Document Component
const FormularioSeguimiento = (props: { caso: Caso, persona: Persona, seguimiento: Seguimiento, adulto: AdultoMayor2 }) => {
  let { caso, persona, seguimiento, adulto } = props;
  const parseHtml = (text: string) => {
    let list: any[] = [];
    HTMLReactParser(text, {
      transform(dom: any, index: any) {
        if (dom.type == 'tag') {
          let listaP: any[] = [];
          if (dom.name == 'p') {
            dom.children.forEach((child: any) => {
              if (child.type == 'text') {
                listaP.push(<Text key={dom.type + index} style={styles.text} >{child.data}</Text>)
              }
              else if (child.name == 'em') {
                if (child.children[0].type == 'text') {
                  listaP.push(<Text key={dom.type + index} style={styles.textItalic} >{child.children[0].data}</Text>)
                }
                else {
                  listaP.push(<Text key={dom.type + index} style={styles.textBoldItalic} >{child.children[0].children[0].data}</Text>)
                }
              }
              else if (child.name == 'br') {
                listaP.push(<Text key={dom.type + index} style={styles.text} >{"\n"}</Text>)
              }
              else {
                if (child.name == 'strong') {

                  listaP.push(<Text key={dom.type + index} style={styles.textBold} >{child.children[0].data}</Text>)
                }
              }
            }
            );
            list.push(listaP);
          }
          else if (dom.name == 'ul') {
            let listaLi: any[] = [];
            dom.children.forEach((child: any) => {
              if (child.type == 'tag') {
                let elemLi: any[] = [];
                elemLi.push(<Text key={dom.type + "---" + index}>{"\t• "}</Text>)
                //ENTRA EN EL CASO DE SER li
                child.children.forEach((child2: any) => {
                  //revisamos los hijos de li
                  if (child2.type == 'text') {
                    elemLi.push(<Text key={dom.type + index} style={styles.text} >{child2.data}</Text>)
                  }
                  else {
                    if (child2.name == 'strong') {
                      elemLi.push(<Text key={dom.type + index} style={styles.textBold} >{child2.children[0].data}</Text>)
                    }
                    else if (child2.name == 'em') {
                      if (child2.children[0].type == 'text') {
                        elemLi.push(<Text key={dom.type + index} style={styles.textItalic} >{child2.children[0].data}</Text>)
                      }
                      else {
                        elemLi.push(<Text key={dom.type + index} style={styles.textBoldItalic} >{child2.children[0].children[0].data}</Text>)
                      }
                    }
                  }
                });
                listaLi.push(<Text key={dom.type + "---" + index} style={styles.text}>{elemLi}</Text>)
              }
            });
            list.push(<View key={dom.type + "----" + index} style={{ marginTop: 7.5, marginBottom: 5.5, marginLeft: 18 }}>{listaLi}</View>);
          }
        }
      }
    });
    return list
  }
  console.log(parseHtml(seguimiento.detalle_seguimiento));
  let detalle = parseHtml(seguimiento.detalle_seguimiento);
  console.log(detalle)
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
              fontSize: 8,
            }}
          >
            Generado por:
            {`${persona.nombres} ${persona.paterno} ${persona.materno}`}
          </Text>
          <Image
            style={{
              width: "100%",
              height: "auto",
              position: "absolute",
              top: -2.5,
              left: 0,
            }}
            fixed
            src={"/assets/cabecera-documentos.png"}
          ></Image>
          <Text style={{ ...styles.textBold, ...styles.textCenter, marginTop: 85 }}>
            SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES
          </Text>
          <Text style={{ ...styles.textBold, ...styles.textCenter }}>
            PROGRAMA: DEFENSA Y RESTITUCIÓN DE DERECHOS DEL ADULTO MAYOR
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 10 }}>
            <Text style={{ ...styles.parraf, color: "gray", fontSize: 8 }}>
              {"Fecha y hora de registro: " +
                seguimiento.fecha_seguimiento +
                " " +
                seguimiento.hora_seguimiento}
            </Text>
            <Text style={styles.textBold}>TIPOLOGÍA:</Text>
            <Text style={{ ...styles.textBox, ...styles.parraf }}>
              {caso.tipologia}
            </Text>
            <Text style={styles.textBold}>N° CASO:</Text>
            <Text style={{ ...styles.textBox, ...styles.parraf }}>
              {caso.nro_caso}
            </Text>
          </View>
          <Text style={styles.textBold}>
            I. NOMBRES Y APELLIDOS DE LA PERSONA ADULTA MAYOR:
          </Text>
          <Text style={{ ...styles.textBox, ...styles.parraf, marginTop: 2 }}>
            {adulto.nombre + " " + adulto.paterno + " " + adulto.materno}
          </Text>
          <Text style={{ ...styles.textBold, marginTop: 20 }}>
            II. DETALLES DEL SEGUIMIENTO DEL CASO:
          </Text>
          <Text
            style={{
              ...styles.textBox,
              ...styles.parraf,
              marginTop: 2,
              fontFamily: "Helvetica-Oblique",
            }}
          >
            {detalle}
          </Text>
          <View style={{ ...styles.horizontal, marginTop: 40, justifyContent: 'flex-start' }}>
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
export default FormularioSeguimiento;
