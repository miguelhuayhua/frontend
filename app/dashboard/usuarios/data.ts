export interface Usuario {
    id_usuario: string;
    usuario: string;
    password: string;
    fotografia: string;
    ult_modificacion: string;
    estado: number;
    id_persona: string;
}

export let dataUsuario = {
    id_usuario:"",
    usuario:"",
    password:"",
    fotografia:"",
    ult_modificacion:"",
    estado: 0,
    id_persona:"",
}