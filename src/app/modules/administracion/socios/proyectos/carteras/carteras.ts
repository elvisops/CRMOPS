export interface Carteras {

    CARTERAID:number | null,
    CARTERA:string,
    TIPOCARTERAID: number,
    TIPOCARTERA:string,
    PROYECTOID:number,
    CREACION:string,
    ACTUALIZACION:string,
    PREFIJO: number

}

export interface CarterasTipos{
    TIPOCARTERAID: number | null,
    TIPOCARTERA:string,
    CREACION:string,
    ACTULIZACION:string,
    ESTADO:number
}
