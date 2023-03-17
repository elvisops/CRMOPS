export interface Carteras {

    CARTERAID:number | null,
    CARTERA:string,
    TIPOCARTERAID: number,
    TIPOCARTERA:string,
    PROYECTOID:number,
    CREACION:string,
    ACTUALIZACION:string

}

export interface CarterasTipos{
    TIPOCARTERAID: number | null,
    TIPOCARTERA:string,
    CREACION:string,
    ACTULIZACION:string,
    ESTADO:number
}
