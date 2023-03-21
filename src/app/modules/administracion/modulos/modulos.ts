//Definicion de un objeto modulos
export interface Modulos{
    MODULOID:number,
    MODULO:string,
    DESCRIPCION:string,
    CREACION:string,
    ACTUALIZACION:string
}

export interface ModulosVistas{
    VISTAID:number,
    VISTA:string,
    V_URL:string,
    MODULOID:number,
    CREACION:string,
    ACTUALIZACION:string
}