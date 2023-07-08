import dayjs from "dayjs";
import moment from "moment";

export const dias = [
    "Dom",
    "Lun",
    "Mar",
    "Mie",
    "Jue",
    "Vie",
    "Sab",
];

export const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];


//esquemas
export interface AdultoMayor {

    nombre: string;
    paterno: string;
    materno: string;
    sexo: string;
    edad: number;
    ci: number;
    fecha_nac: string;
    referencia: number;
    estado_civil: string;
    hijos: string[];
    grado: string;
    ocupacion: string;
    beneficios: string;

}

export interface DatosUbicacion {

    tipo_domicilio: string;
    distrito: number;
    zona: string;
    calle: string;
    n_vivienda: number;
    area: string;
    otro_domicilio: string;
    otra_area: string;

}
export interface DatosDenunciado {
    nombres: string;
    paterno: string;
    materno: string;
    parentezco: string;
};
export interface DatosDenuncia {
    fecha: string,
    hora: string,
    tipologia: string,
    nro_caso: string
}
//datos
export let dataDatosGenerales = {
    ci: 0,
    edad: -dayjs("1960-01-01").diff(moment.now(), "years"),
    estado_civil: "Viudo",
    fecha_nac: "1960-01-01",
    materno: "",
    nombre: "",
    paterno: "",
    referencia: 0,
    sexo: "Femenino",
    hijos: [],
    grado: "",
    beneficios: "",
    ocupacion: "",
};

export let dataDatosUbicacion = {
    area: "",
    otra_area: "",
    calle: "",
    distrito: 1,
    n_vivienda: 0,
    tipo_domicilio: "",
    zona: "",
    otro_domicilio: "",
};

export let dataDatosDenunciado = {
    nombres: "",
    parentezco: "Hijo(a)",
    paterno: "",
    materno: "",

}
export let dataDatosDenuncia = {
    fecha: dayjs().format('YYYY-MM-DD'),
    hora: dayjs().format('HH:mm:ss'),
    tipologia: "",
    nro_caso: ""

}