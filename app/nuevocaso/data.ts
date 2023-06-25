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