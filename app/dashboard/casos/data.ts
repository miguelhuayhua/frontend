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
