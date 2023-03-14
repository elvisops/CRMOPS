//Definicion de un objeto Socios
export interface Socios{
    SOCIOID:number,
    SOCIO:string,
    DESCRIPCION:string,
    CREACION:string,
    ACTUALIZACION:string    
}

export interface SociosContactos{
    SOCIOID: number | null,
    SOCIOCONTACTOID:number | null,
    NOMBRE:string,
    TELEFONO:string,
    CORREO:string,  
    PUESTO:string,  
    DESCRIPCION:string,
    CREACION:string,
    ACTUALIZACION:string
}
