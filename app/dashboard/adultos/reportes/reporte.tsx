import React, { useContext } from "react";
import {
    Document,
    Page,
    Text,
    StyleSheet,
    View,
    Image,
} from "@react-pdf/renderer";
import { Persona, meses } from "../../personal/agregar/data";
import { Caso } from "../../casos/data";
import { AdultoMayor2 } from "../../casos/nuevocaso/data";
import { Hijo } from "../../hijos/data";
import dayjs from "dayjs";

//estilos
const styles = StyleSheet.create({
    table: {
        width: "98%",
        marginTop: 10,
        marginHorizontal: "auto"
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    cellHeader: {
        backgroundColor: "white",
        color: "black",
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        textAlign: "center",
        width: "25%",
        border: "1px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10
    },
    cell: {
        fontFamily: "Helvetica",
        fontSize: 10,
        textAlign: "center",
        width: "25%",
        border: "1px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5
    },
    textItalic: { fontSize: 9, fontFamily: "Helvetica-Oblique" },
    title: {
        width: "100%",
        textAlign: "center",
        marginTop: 30,
        fontFamily: "Helvetica-Bold",
        fontSize: 20
    },
    page: {
        fontFamily: "Helvetica",
        fontSize: 12,
        padding: 30,
        position: "relative",
        paddingBottom: 35,
    },
    signatureBox: {
        display: "flex",
        flexDirection: "column",
        fontSize: 11,
        marginTop: 80,
        width: 250
    },
    textInfo: { width: "33%", color: "#999", textAlign: "center", fontSize: 8 },

    horizontal: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    text: {
        fontSize: 12,
    },
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
        lineHeight: 2,
        fontFamily: "Helvetica",
        fontSize: 12,
        marginTop: 20,
    },
    listItem: {
        marginLeft: 40,
    },
});
interface Props {
    persona: Persona;
    casos: Caso[];
    adulto: AdultoMayor2;
    hijos: Hijo[]
}
// Create Document Component
const ReporteAdulto = (props: Props) => {
    let f_nacimiento = dayjs(props.adulto.f_nacimiento);
    return (
        <Document>
            <Page size={"LETTER"} style={styles.page}>
                <Text
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 20,
                        color: "gray",
                        fontSize: 8,
                    }}
                    fixed
                >
                    Generado por:
                    {`${props.persona.nombres} ${props.persona.paterno} ${props.persona.materno}`}
                </Text>
                <Image
                    style={{
                        width: "105%",
                        height: "auto",
                        position: "absolute",
                        top: 20,
                        left: 18,
                    }}
                    fixed
                    src={"/assets/cabecera-documentos.png"}
                ></Image>
                <Text
                    style={{ fontSize: 10, position: 'absolute', top: 80, left: 122, textAlign: 'center' }}
                >
                    {"DIRECCCIÓN DE DESARROLLO INTEGRAL UNIDAD DE ADULTOS MAYORES"}
                </Text>
                <Text style={{ ...styles.text, marginTop: 90 }}>
                    <Text style={styles.textBold}>Nombres: </Text>
                    {props.adulto.nombre}
                </Text>
                <Text style={{ ...styles.text, marginTop: 5 }}>
                    <Text style={styles.textBold}>Apellidos: </Text>
                    {props.adulto.paterno + " " + props.adulto.materno}
                </Text>
                <Text style={{ ...styles.text, marginTop: 5 }}>
                    <Text style={styles.textBold}>Edad: </Text>
                    {props.adulto.edad}
                </Text>
                <Text style={styles.title}>REPORTE ADULTO MAYOR</Text >
                <Text style={styles.parraf}>
                    {`${props.adulto.genero == 'Femenino' ? 'La adulta' : 'El adulto'} mayor cuyo nombre es ${props.adulto.nombre} ${props.adulto.paterno} ${props.adulto.materno}, ${props.adulto.genero == 'Femenino' ? 'nacida' : 'nacido'} el ${f_nacimiento.date()} de ${meses[f_nacimiento.month()]} del ${f_nacimiento.year()}, es ${props.adulto.genero == 'Femenino' ? 'una mujer' : 'un hombre'} de ${props.adulto.edad} años de edad con cédula de identidad ${props.adulto.ci} ${props.adulto.expedido}, actualmente con estado civil ${props.adulto.estado_civil}. Su número de referencia es el ${props.adulto.nro_referencia} y con la ocupación de ${props.adulto.ocupacion}. ${props.adulto.nombre} recibe el beneficio de vejez: "${props.adulto.beneficios}" y con un grado de educación: "${props.adulto.grado}".`}
                </Text>
                <Text style={{ ...styles.textCenter, ...styles.textBold }}>
                    HISTORIAL DE CASOS
                </Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.cellHeader}>
                            <Text>ID CASO</Text>
                        </View>
                        <View style={styles.cellHeader}>
                            <Text>Fecha - Hora Registro</Text>
                        </View>
                        <View style={styles.cellHeader}>
                            <Text>Tipología</Text>
                        </View>
                        <View style={styles.cellHeader}>
                            <Text>Acción Realizada</Text>
                        </View>
                    </View>
                    {props.casos.map((value, index) => {
                        return (
                            <View key={index} style={styles.row}>
                                <View style={styles.cell}>
                                    <Text>{value.id_caso}</Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>{value.fecha_registro + " - " + value.hora_registro}</Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>{value.tipologia}</Text>
                                </View>
                                <View style={styles.cell}>
                                    <Text>{value.accion_realizada}</Text>
                                </View>
                            </View>
                        );
                    })}
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
        </Document >
    );
};
export default ReporteAdulto;