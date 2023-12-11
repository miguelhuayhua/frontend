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
    Font,
} from "@react-pdf/renderer";
import HTMLReactParser from "html-react-parser";
import { Adulto } from "@/app/dashboard/adultos/data";
import { Caso } from "../../data";

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
    textItalic: { fontSize: 10, fontFamily: "Helvetica-Oblique" },
    textBoldItalic: { fontSize: 10, fontFamily: "Helvetica-BoldOblique" },
    parraf: {
        lineHeight: 1.35,
        fontFamily: "Helvetica",
        fontSize: 10,
        marginTop: 7.5,
        textAlign: 'justify'
    },
    page: {
        paddingLeft: 25,
        paddingRight: 30,
    },
    listItem: {
        marginLeft: 40,
    },
    title: {
        textAlign: 'center',
        fontSize: 11,
        fontFamily: 'Helvetica-Bold'
    },
    text: {
        fontSize: 10
    }
});
const parseHtml = (text: string) => {
    let list: any[] = [];
    HTMLReactParser(text, {
        transform( dom: any, index:any) {
            if (dom.type == 'tag') {
                let listaP: any[] = [];
                if (dom.name == 'p') {
                    dom.children.forEach((child: any) => {
                        if (child.type == 'text') {
                            listaP.push(<Text key={dom.type + index} style={styles.text} >{child.data}</Text>)
                        }
                        else {
                            if (child.name == 'strong') {
                                if (child.children[0].data == 'under-A') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>PRIMERO</Text>
                                        {" (ANTECEDENTES). -"}
                                    </Text>);
                                }
                                else if (child.children[0].data == 'under-D') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>SEGUNDO</Text>
                                        {" (DECLARACIÓN). -"}
                                    </Text>);
                                }
                                else if (child.children[0].data == 'under-F') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>TERCERO</Text>
                                        {" (FUNDAMENTO LEGAL). -"}
                                    </Text>);
                                }
                                else if (child.children[0].data == 'under-O') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>CUARTO</Text>
                                        {" (OBJETO DEL COMPROMISO). -"}
                                    </Text>);
                                }
                                else if (child.children[0].data == 'under-I') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>QUINTO</Text>
                                        {" (INCUMPLIMIENTO). -"}
                                    </Text>);
                                }
                                else if (child.children[0].data == 'under-CONF') {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >
                                        <Text style={{ textDecoration: 'underline' }}>SEXTO</Text>
                                        {" (CONFORMIDAD). -"}
                                    </Text>);
                                }

                                else {
                                    listaP.push(<Text key={dom.type + index} style={styles.textBold} >{child.children[0].data}</Text>)
                                }

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
                    list.push(<View key={dom.type + "----" + index} style={{ marginTop: 7.5, marginBottom:5.5, marginLeft: 18 }}>{listaLi}</View>);                }
            }
        }
    });
    return list
}
//propiedades
interface Props {
    antecedentes: string;
    declaracion: string;
    fundamento_legal: string;
    objeto: string;
    incumplimiento: string;
    conformidad: string;
    adulto: Adulto;
    introduccion: string;
    caso: Caso;
}
// Create Document Component
const ActaCompromisoCuidadoProteccion = (props: Props) => {

    return (
        <Document>
            <Page style={styles.page}>
            <Image fixed src={"/assets/actas/cabecera-acta.png"} style={{ width: 595, height: 70, position: 'absolute', top: 15 }}></Image>
                <View style={{ marginTop: 80, padding: 10 }}>
                    <Text style={styles.title}>
                        SECRETARÍA MUNICIPAL DE DESARROLLO HUMANO Y SOCIAL INTEGRAL
                    </Text>
                    <Text style={styles.title}>
                        DIRECCIÓN DE DESARROLLO INTEGRAL
                    </Text>
                    <Text style={styles.title}>
                        UNIDAD DE ADULTOS MAYORES
                    </Text>
                    <Text style={styles.title}>
                        PROGRAMA DEFENSA Y RESTITUCIÓN DE DERECHOS
                    </Text>
                    <Text style={{ ...styles.title, marginVertical: 10 }}>ACTA DE COMPROMISO, CUIDADO Y PROTECCIÓN</Text>

                    <Text style={{ ...styles.title, textAlign: 'right', marginVertical: 5 }}>{"CASO: " + props.caso.nro_caso}</Text>
                    <Text style={styles.parraf}>
                        {parseHtml(props.introduccion)}
                    </Text>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.antecedentes)}
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.declaracion)}
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.fundamento_legal)}
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.objeto)}
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.incumplimiento)}
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        {parseHtml(props.conformidad)}
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>
                        {`${props.adulto.nombre} ${props.adulto.paterno} ${props.adulto.materno}`}
                    </Text>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>
                        {`C.I.: ${props.adulto.ci} ${props.adulto.expedido}`}
                    </Text>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>
                        {`(Adulto(a) Mayor)`}
                    </Text>
                </View>
                <Image fixed src={"/assets/actas/footer-actas.png"} style={{ width: 670, height: 20, position: 'absolute', bottom: 30, left: -40 }}></Image>

            </Page>
        </Document>
    );
};
export default ActaCompromisoCuidadoProteccion;
