import dayjs from "dayjs";
import { now } from "moment";


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

export interface Persona {
    id_persona: string;
    nombres: string;
    paterno: string;
    materno: string;
    ci: number;
    celular: number;
    f_nacimiento: string;
    cargo: string;
    genero: string;
    ult_modificacion: string;
    estado: number;
}

export let dataPersona = {
    id_persona: "",
    nombres: "",
    paterno: "",
    materno: "",
    ci: 0,
    celular: 0,
    f_nacimiento: dayjs().toISOString(),
    cargo: "",
    genero: "Femenino",
    ult_modificacion: "",
    estado: 0,
}
