// pendiente de borrar por filtro manual
export interface GestionDeContactos {
  COMENTARIO: string;
  CREACION: string;
  CUENTAID: number;
  GESTIONID: number;
  GESTIONTIPOID: number;
  SUBTIPIFICACION: string;
  SUBTIPIFICACIONID: number;
  TELEFONO: string;
  USUARIO: string;
  USUARIOID: number;
  TIPO: number;
  ACCION: string;
  RESULTADO: string;
  TIPIFICACION: string;
  SUBTIPIFICAICON: string;

}


export interface GestionDeContactosHistorial {
  COMENTARIO: string;
  CREACION: string;
  CUENTAID: number;
  GESTIONID: number;
  GESTIONTIPOID: number;
  SUBTIPIFICACION: string;
  SUBTIPIFICACIONID: number;
  USUARIO: string;
  USUARIOID: number;
  TIPO: number;
  ACCION: string;
  RESULTADO: string;
  TIPIFICACION: string;
  // SUBTIPIFICAICON: string;

}

export interface Detalles {
  CARTERA: string,
  CARTERAID: number,
  CUENTA: string,
  CUENTAID: number,
  IDENTIFICACION: string,
  NOMBRE: string,
  PROYECTO: string,
  TIPOCARTERA: string,
  ACCION: string,
  RESULTADO: string,
  TIPIFICACION: string,
  SUBTIPIFICACION: string,
  CREACION: string,
  SALDOLEMPIRAS: string,
  SALDODOLARES: string,
  USUARIO: string,
}

export interface GestionDeContactosTelefonos extends TipoDeContacto {
  TELEFONOID: number,
  TELEFONO: string,
  TIPO: string,
  TELEFONOTIPOID: number,
  CREACION: string,
  ACTUALIZACION: string,
  SMS: number,
  IVR: number,
}

export interface GestionDeContactosRazonMora extends TipoDeContacto {
  RAZONMORAID: number,
  CARTERAID: number,
  RAZON: string,
  FECHA: Date,
  CREACION: string,
  ACTUALIZACION: string,
}

export interface GestionDeContactosPagos extends TipoDeContacto {
  PAGOID: number,
  CUENTAID: number,
  MONTO: string,
  CREACION: string,
  ACTUALIZACION: string,
  // PAGOID,CUENTAID,MONTO,CREACION
}




export interface GestionDeContactosConfirmaciones extends TipoDeContacto {
  CONFIRMACIONID: number,
  CUENTAID: number,
  MONTO: string,
  USUARIOID: number,
  CREACION: string,
  ACTUALIZACION: string,
  FECHA: Date,
  USUARIO: string,
}

export interface GestionDeContactosDirecciones {
  COLONIA: string,
  DEPARTAMENTO: string,
  DIRECCION: string,
  MUNICIPIO: string,
  TIPODIRECCION: string,
  CREACION: string,
  ACTUALIZACION: string,
}

export interface GestionDeContactosCorreos extends TipoDeContacto {
  CORREO: string,
  TIPOCORREO: string,
  CREACION: string,
  ACTUALIZACION: string,
}

export interface TipoDeContacto {
  // TELEFONO: string,
  // TIPO: string,
}

export interface GestionDeContactosPromesas {
  ACTUALIZACION: string,
  CARTERAID: number,
  CREACION: string,
  ESFINAL: number,
  ESTADO: string,//cambio
  FECHA: string,
  GESTIONID: number,
  MONTO: number,
  PROMESAESTADOID: number,
}

