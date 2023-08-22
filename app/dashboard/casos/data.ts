import dayjs from "dayjs";

export interface Caso {
    nro_caso: string;
    fecha_registro: string;
    hora_registro: string;
    peticion: string;
    ult_modificacion: string;
    id_adulto: string;
    id_caso: string;
    tipologia: string;
    descripcion_hechos: string;
    accion_realizada: string;
    estado: number;
}

export let datosCaso: Caso = {
    nro_caso: "",
    fecha_registro: "",
    hora_registro: "",
    peticion: "",
    ult_modificacion: "",
    id_adulto: "",
    id_caso: "",
    tipologia: "",
    descripcion_hechos: "",
    accion_realizada: "",
    estado: 1,
}



export interface Denunciado {
    nombres: string;
    paterno: string;
    materno: string;
    parentezco: string;
    estado: number;
    genero: string;
    ult_modificacion: string;
    id_caso: string;
    id_denunciado: string;
}


export let DatosDenunciado = {
    nombres: "",
    paterno: "",
    materno: "",
    parentezco: "",
    estado: 1,
    genero: "",
    ult_modificacion: "",
    id_caso: "",
    id_denunciado: "",
}

export interface Seguimiento {
    id_seguimiento: string;
    detalle_seguimiento: string;
    id_caso: string;
    fecha_seguimiento: string;
    hora_seguimiento: string;
    ult_modificacion: string;
    estado: number;
}

export let dataSeguimiento: Seguimiento = {
    detalle_seguimiento: "",
    estado: 1,
    fecha_seguimiento: dayjs().format('YYYY-MM-DD'),
    hora_seguimiento: dayjs().format('HH:mm:ss'),
    id_caso: "",
    id_seguimiento: "",
    ult_modificacion: ""

}


export interface Citacion {
    id_citacion: string;
    id_caso: string;
    fecha_citacion: string;
    hora_citacion: string;
    fecha_creacion: string;
    ult_moficacion: string;
    numero: number;
    estado: number;
}

export let dataCitacion: Citacion = {
    id_citacion: "",
    id_caso: "",
    fecha_citacion: dayjs().format("YYYY-MM-DD"),
    hora_citacion: dayjs().format("HH:mm:ss"),
    fecha_creacion: dayjs().format("YYYY-MM-DD"),
    ult_moficacion: "",
    numero: 0,
    estado: 1
}