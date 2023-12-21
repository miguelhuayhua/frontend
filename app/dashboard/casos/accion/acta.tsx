"use client";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import {
    Button,
    Card,
    Col,
    Drawer,
    Modal,
    Row,
    Segmented,
    notification,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import { NextPage } from "next";
import { Adulto } from "../../adultos/data";
import { Caso, Denunciado } from "../data";
import { Persona, meses } from "../../personal/agregar/data";
import { createContext, useState } from "react";
export const DataContext = createContext({});
import Image from 'next/legacy/image';
import "./estilos.scss";
import { Usuario } from "../../usuarios/data";
import { EditorState, } from 'draft-js';
import dynamic from 'next/dynamic';
import 'draft-js/dist/Draft.css'; // Importa los estilos de Draft.js
const DynamicEditor = dynamic(
    () => import('react-draft-wysiwyg').then((module) => module.Editor),
    { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from "draft-js-export-html";
import ActaCompromiso from "./actas/pdf-acta-compromiso";
import Paragraph from "antd/es/typography/Paragraph";
import dayjs from "dayjs";
import ActaCompromisoBuenaConducta from "./actas/pdf-acta-compromiso-buena-conducta";
import ActaCompromisoFallida from "./actas/pdf-acta-compromiso-fallida";
import ActaReconomientoDeudaPago from "./actas/pdf-acta-reconocimiento-deuda-pago";
import ActaCumplimiento from "./actas/pdf-acta-cumplimiento";
import ActaCompromisoCuidadoProteccion from "./actas/pdf-acta-compromiso-cuidado-proteccion";
import axios from "axios";
import { useRouter } from "next/navigation";
interface Props {
    setOpen: any;
    open: boolean;
    caso: Caso;
    persona: Persona;
    adulto: Adulto;
    loaded: boolean;
    denunciado: Denunciado;
    setDenunciado: any;
    usuario: Usuario;
}

const ActaOptions: NextPage<Props> = (props) => {
    const router = useRouter();
    const [showDrawer, setShowDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    let fecha_registro = dayjs(props.caso.fecha_registro);
    const [textos, setTextos] = useState({
        antecedentes: "",
        objeto: "",
        declaracion: "",
        incumplimiento: "",
        conformidad: "",
        fundamento_legal: "",
        cumplimiento: "",
        conclusion: "",
        introduccion: ""
    });
    const [activo, setActivo] = useState(0);
    const [editorState, setEditorState] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState1, setEditorState1] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );

    const [editorState2, setEditorState2] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState3, setEditorState3] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState4, setEditorState4] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState5, setEditorState5] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState6, setEditorState6] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState7, setEditorState7] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    const [editorState8, setEditorState8] = useState(
        () => {
            return EditorState.createEmpty();
        }
    );
    return (
        <>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <h3>Seleccione el tipo de acta a crear</h3>

                </Col>
                <Col span={24}>
                    <Segmented className="flex-wrap" rootClassName="flex-wrap" onChange={(value) => {
                        setActivo(Number.parseInt(value.toString()));
                    }} defaultValue={10} options={[{
                        value: 1,
                        label: <Image src={"/assets/actas/1.png"} width={85} height={110} layout="fixed" />,

                    }, {
                        value: 2,
                        label: <Image src={"/assets/actas/2.png"} width={85} height={110} layout="fixed" />
                    },
                    {
                        value: 3,
                        label: <Image src={"/assets/actas/3.png"} width={85} height={110} layout="fixed" />
                    },
                    {
                        value: 4,
                        label: <Image src={"/assets/actas/4.png"} width={85} height={110} layout="fixed" />
                    },
                    {
                        value: 5,
                        label: <Image src={"/assets/actas/5.png"} width={85} height={110} layout="fixed" />
                    },
                    {
                        value: 6,
                        label: <Image src={"/assets/actas/6.png"} width={85} height={110} layout="fixed" />
                    },

                    ]}
                    />

                </Col>
                <Col span={24}>
                    <Card>
                        <h6>Información rápida</h6>

                        <Row>
                            <Col span={16}>
                                <p><b>Adulto implicado: </b>{props.adulto.nombre + " " + props.adulto.paterno + " " + props.adulto.materno}</p>
                                <p><b>Hijos del adulto mayor: </b>{props.adulto.hijos.map(value => { return `${value.nombres_apellidos},` })}</p>
                            </Col>
                            <Col span={8}><p><b>Caso: </b>{props.caso.nro_caso}</p></Col>
                            <Col span={24}>
                                <Paragraph style={{ color: "#AAA" }} copyable> En la ciudad de El Alto, a los {fecha_registro.date()} días del mes de {meses[fecha_registro.month()]} de {fecha_registro.year() + " "}
                                    a horas {props.caso.hora_registro}, en instancias de la Unidad de Adultos Mayores - DDI - SMDHSI, del Gobierno Autónomo Municipal de El Alto, se hacen
                                    presente de manera libre, voluntaria y sin que medie presión, dolo o vicio del consentimiento alguno: los Sres.</Paragraph>
                            </Col>
                        </Row>
                    </Card>
                    <Button
                        className="mt-3 mx-2"
                        type="primary"
                        onClick={() => {
                            let introduccion = stateToHTML(editorState1.getCurrentContent());
                            let conformidad = stateToHTML(editorState5.getCurrentContent());
                            let declaracion = stateToHTML(editorState2.getCurrentContent());
                            let incumplimiento = stateToHTML(editorState4.getCurrentContent());
                            let objeto = stateToHTML(editorState3.getCurrentContent());
                            let cumplimiento = stateToHTML(editorState8.getCurrentContent());
                            let fundamento_legal = stateToHTML(editorState6.getCurrentContent());
                            let antecedentes = stateToHTML(editorState.getCurrentContent());
                            let conclusion = stateToHTML(editorState7.getCurrentContent());
                            setTextos({
                                antecedentes: antecedentes,
                                conclusion: conclusion,
                                conformidad: conformidad,
                                cumplimiento: cumplimiento,
                                declaracion: declaracion,
                                fundamento_legal: fundamento_legal,
                                incumplimiento: incumplimiento,
                                objeto: objeto,
                                introduccion: introduccion
                            })
                            setShowDrawer(true);

                        }}>Vista Previa</Button>
                    <Button onClick={() => {
                        setOpen(true);
                    }}>Generar Acta y Cerrar Caso</Button>
                </Col>
                <Col span={24} className={activo != 0 ? 'd-block' : 'd-none'}>
                    <h5>Rellene los campos acontinuación:</h5>
                    <Row gutter={[24, 24]}>
                        <Col span={24} >
                            <b>INTRODUCCIÓN</b>
                            <DynamicEditor
                                editorState={editorState1}
                                onEditorStateChange={setEditorState1}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history',],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }}>
                            <b>ANTECEDENTES</b>
                            <DynamicEditor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 5 ? 'd-none' : 'd-block'}>
                            <b>DECLARACIÓN</b>
                            <DynamicEditor
                                editorState={editorState2}
                                onEditorStateChange={setEditorState2}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 2 || activo == 6 ? 'd-block' : 'd-none'}>
                            <b>FUNDAMENTO LEGAL</b>
                            <DynamicEditor
                                editorState={editorState6}
                                onEditorStateChange={setEditorState6}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 5 || activo == 3 ? 'd-none' : 'd-block'}>
                            <b>OBJETO DEL COMPROMISO</b>
                            <DynamicEditor
                                editorState={editorState3}
                                onEditorStateChange={setEditorState3}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 5 ? 'd-block' : 'd-none'}>
                            <b>DEL CUMPLIMIENTO</b>
                            <DynamicEditor
                                editorState={editorState8}
                                onEditorStateChange={setEditorState8}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 5 || activo == 3 ? 'd-none' : 'd-block'}>
                            <b>INCUMPLIMIENTO</b>
                            <DynamicEditor
                                editorState={editorState4}
                                onEditorStateChange={setEditorState4}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 3 ? 'd-none' : 'd-block'}>
                            <b>CONFORMIDAD</b>
                            <DynamicEditor
                                editorState={editorState5}
                                onEditorStateChange={setEditorState5}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                        <Col span={24} lg={{ span: 12 }} className={activo == 3 ? 'd-block' : 'd-none'}>
                            <b>CONCLUSIÓN</b>
                            <DynamicEditor
                                editorState={editorState7}
                                onEditorStateChange={setEditorState7}
                                editorStyle={{ border: '1px solid #DDD', borderRadius: 5 }}
                                toolbar={{
                                    options: ['inline', 'history', 'list'],  // Agregamos 'list' a las opciones del toolbar
                                    inline: {
                                        options: ['bold', 'italic'], // Agregamos las opciones de lista
                                    },
                                    list: { options: ['unordered'] }
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Drawer
                title={`Vista previa del Documento`}
                placement="right"
                size={"large"}
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
            >
                <PDFViewer showToolbar={false} style={{ width: "100%", height:650 }}>
                    {activo == 1 ? <ActaCompromiso
                        adulto={props.adulto}
                        introduccion={textos.introduccion}
                        caso={props.caso}
                        conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                        declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                        denunciado={props.denunciado}
                        incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                        objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                        antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} /> :
                        activo == 2 ? <ActaCompromisoBuenaConducta
                            adulto={props.adulto}
                            antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                            conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                            declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                            fundamento_legal={textos.fundamento_legal.slice(0, 3) + "<strong>under-F</strong>" + textos.fundamento_legal.slice(3)}
                            incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                            introduccion={textos.introduccion}
                            objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                        /> :
                            activo == 3 ? <ActaCompromisoFallida adulto={props.adulto}
                                antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                conclusion={textos.conclusion.slice(0, 3) + "<strong>under-CONC</strong>" + textos.conclusion.slice(3)}
                                declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                introduccion={textos.introduccion} /> :
                                activo == 4 ? <ActaReconomientoDeudaPago adulto={props.adulto}
                                    antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                    conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                    declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                    incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                    introduccion={textos.introduccion}
                                    objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                /> :
                                    activo == 5 ? <ActaCumplimiento adulto={props.adulto}
                                        antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                        conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                        cumplimiento={textos.cumplimiento.slice(0, 3) + "<strong>under-CUM</strong>" + textos.cumplimiento.slice(3)}
                                        introduccion={textos.introduccion} /> :
                                        activo == 6 ? <ActaCompromisoCuidadoProteccion adulto={props.adulto}
                                            antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                            conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                            declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                            fundamento_legal={textos.fundamento_legal.slice(0, 3) + "<strong>under-F</strong>" + textos.fundamento_legal.slice(3)}
                                            incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                            introduccion={textos.introduccion}
                                            objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                        /> : undefined}

                </PDFViewer>

            </Drawer>
            <Modal
                title="¿Continuar?"
                open={open}
                onOk={() => {
                    if (activo == 0) {
                        notification.warning({ message: 'Por favor, seleccione el tipo de acta.' })
                    }
                    else {
                        axios
                            .post(process.env.BACKEND_URL + "/caso/acta-compromiso", {
                                id_caso: props.caso.id_caso,
                                usuario: props.usuario
                            })
                            .then((res) => {
                                if (res.data.status == 1) {
                                    notification.success({ message: "Acta generada con éxito" });
                                    pdf(
                                        activo == 1 ? <ActaCompromiso
                                            adulto={props.adulto}
                                            introduccion={textos.introduccion}
                                            caso={props.caso}
                                            conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                            declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                            denunciado={props.denunciado}
                                            incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                            objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                            antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} /> :
                                            activo == 2 ? <ActaCompromisoBuenaConducta
                                                adulto={props.adulto}
                                                antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                                conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                                declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                                fundamento_legal={textos.fundamento_legal.slice(0, 3) + "<strong>under-F</strong>" + textos.fundamento_legal.slice(3)}
                                                incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                                introduccion={textos.introduccion}
                                                objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                            /> :
                                                activo == 3 ? <ActaCompromisoFallida adulto={props.adulto}
                                                    antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                                    conclusion={textos.conclusion.slice(0, 3) + "<strong>under-CONC</strong>" + textos.conclusion.slice(3)}
                                                    declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                                    introduccion={textos.introduccion} /> :
                                                    activo == 4 ? <ActaReconomientoDeudaPago adulto={props.adulto}
                                                        antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                                        conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                                        declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                                        incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                                        introduccion={textos.introduccion}
                                                        objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                                    /> :
                                                        activo == 5 ? <ActaCumplimiento adulto={props.adulto}
                                                            antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                                            conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                                            cumplimiento={textos.cumplimiento.slice(0, 3) + "<strong>under-CUM</strong>" + textos.cumplimiento.slice(3)}
                                                            introduccion={textos.introduccion} /> :
                                                            activo == 6 ? <ActaCompromisoCuidadoProteccion adulto={props.adulto}
                                                                antecedentes={textos.antecedentes.slice(0, 3) + "<strong>under-A</strong>" + textos.antecedentes.slice(3)} caso={props.caso}
                                                                conformidad={textos.conformidad.slice(0, 3) + "<strong>under-CONF</strong>" + textos.conformidad.slice(3)}
                                                                declaracion={textos.declaracion.slice(0, 3) + "<strong>under-D</strong>" + textos.declaracion.slice(3)}
                                                                fundamento_legal={textos.fundamento_legal.slice(0, 3) + "<strong>under-F</strong>" + textos.fundamento_legal.slice(3)}
                                                                incumplimiento={textos.incumplimiento.slice(0, 3) + "<strong>under-I</strong>" + textos.incumplimiento.slice(3)}
                                                                introduccion={textos.introduccion}
                                                                objeto={textos.objeto.slice(0, 3) + "<strong>under-O</strong>" + textos.objeto.slice(3)}
                                                            /> : undefined
                                    )
                                        .toBlob()
                                        .then((blob) => {
                                            const url = URL.createObjectURL(blob);
                                            const link = document.createElement("a");
                                            link.href = url;
                                            let { nombre, paterno, materno } = props.adulto;
                                            link.setAttribute(
                                                "download",
                                                nombre + paterno + materno + ".pdf"
                                            );
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            router.replace("/dashboard/casos");
                                        });
                                } else {
                                    notification.error({ message: res.data.message });
                                }
                            });
                    }
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                okText="Sí"
                cancelText="No"
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <QuestionCircleOutlined
                        style={{ fontSize: "4em", color: "#555", marginBottom: ".5em" }}
                    />
                    <p className="h5 text-center">
                        ¿Está seguro de continuar?, el caso cerrará...
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default ActaOptions;
