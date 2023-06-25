--TABLA DE ADULTO MAYOR
CREATE TABLE IF NOT EXISTS public.adulto_mayor
(
    id_adulto character varying(20)   NOT NULL,
    nombre character varying(200)   NOT NULL,
    paterno character varying(200)   NOT NULL,
    materno character varying(200)   NOT NULL,
    edad integer,
    ci integer NOT NULL,
    genero character varying(10)   NOT NULL,
    f_nacimiento date NOT NULL,
    estado_civil character varying(15)  ,
    nro_referencia integer,
    ocupacion character varying(20)  ,
    beneficios character varying(20)  ,
    CONSTRAINT adulto_mayor_pkey PRIMARY KEY (id_adulto)
)
COMMENT ON TABLE public.adulto_mayor
    IS 'Tabla de registro para el adulto mayor';

--TABLA DE LOS HIJOS DEL ADULTO MAYOR
CREATE TABLE IF NOT EXISTS public.hijo
(
    id_hijo character varying  NOT NULL,
    nombres_apellidos character varying(400)   NOT NULL,
    id_adulto character varying(20)   NOT NULL,
    CONSTRAINT pk_id_hijo PRIMARY KEY (id_hijo),
    CONSTRAINT fk_id_adultomayor1 FOREIGN KEY (id_adulto)
        REFERENCES public.adulto_mayor (id_adulto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

COMMENT ON TABLE public.hijo
    IS 'Tabla de datos del hijos del adultos mayor denunciante.';


--TABLA DEL DOMICILIO DEL ADULTO MAYOR
CREATE TABLE IF NOT EXISTS public.domicilio
(
    id_domicilio character varying(20) COLLATE pg_catalog."default" NOT NULL,
    distrito integer,
    zona text COLLATE pg_catalog."default",
    calle_av text COLLATE pg_catalog."default",
    nro_vivienda integer,
    area character varying(20) COLLATE pg_catalog."default",
    otra_area text COLLATE pg_catalog."default",
    actual smallint,
    estado smallint NOT NULL DEFAULT 1,
    ult_modificacion timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_adulto character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT domicilio_pkey PRIMARY KEY (id_domicilio),
    CONSTRAINT fk_id_adulto2 FOREIGN KEY (id_adulto)
        REFERENCES public.adulto_mayor (id_adulto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


COMMENT ON TABLE public.domicilio
    IS 'Domicilio del adulto mayor denunciante.';