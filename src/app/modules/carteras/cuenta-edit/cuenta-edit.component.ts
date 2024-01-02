import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CuentaEditService } from './cuenta-edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta-edit',
  templateUrl: './cuenta-edit.component.html',
  styleUrls: ['./cuenta-edit.component.css']
})
export class CuentaEditComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CuentaEditComponent>,
    private service: CuentaEditService,
    private auth: AuthService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // crear proc para buscar por la identidad y personaid
  nombre: string = ""
  identidad: string = this.data.IDENTIFICACION
  nivelBuro: number = 0
  distribuidor: number = 0
  numeroCliente: string = ""
  confirmacion: number = 0
  refLaboral: string = ""
  telRefLaboral: string = ""
  resultadoRefLaboral: number = 0
  refPersonal: string = ""
  telRefPersonal: string = ""
  resultadoRefPersonal: number = 0
  refFamiliar: string = ""
  telRefFamiliar: string = ""
  resultadoRefFamiliar: number = 0
  cambioReferencia: boolean = false
  cambioReferenciaNumber: number = 0
  estadoValidacion: number = 0
  numeroOrden: string = "";
  comentario: string = ""

  personaid: number = 0

  carteraID: number = this.data.CARTERAID
  cuentaID: number = 0

  listaNivelBuro: any[] = []



  listaDistribuidor: any[] = []



  listaConfirmacion: any[] = []

  listaEstadoValidacion: any[] = []


  searchTerm!: string;  



  ngOnInit(): void {
    this.genListaBuro()
    this.genListaDistribuidores()
    this.genListaConfirmacion()
    this.genListaEstadoValidacion()

    this.genDataCliente()
    // console.log(this.identidad+" "+this.carteraID)
  }

  genListaBuro() {
    this.service.getListaBuro().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaNivelBuro = JSON.parse(data)
      console.log(this.listaNivelBuro)
    })
  }

  genListaDistribuidores() {
    this.service.getListaDistribuidores().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaDistribuidor = JSON.parse(data)
      console.log(this.listaDistribuidor)
    })
  }

  genListaConfirmacion() {
    this.service.getListaConfirmacion().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaConfirmacion = JSON.parse(data)
      console.log(this.listaConfirmacion)
    })
  }

  genListaEstadoValidacion() {
    this.service.getListaEstadoValidacion().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaEstadoValidacion = JSON.parse(data)
      console.log(this.listaEstadoValidacion)
    })
  }

  genDataCliente() {
    this.service.getDataCliente(this.identidad, this.carteraID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      console.log(respuesta)
      // console.log(respuesta[0])

      // this.nombre = respuesta[0].NOMBRE
      // this.nivelBuro = respuesta[0].BURO
      // const confirmacion = respuesta[0].IDENTIFICACION

      this.nombre = respuesta[0].NOMBRE
      this.nivelBuro = respuesta[0].BURO
      this.distribuidor = respuesta[0].DISTRIBUIDOR
      this.numeroCliente = respuesta[0].NUMERO
      this.confirmacion = respuesta[0].CONFIRMACION
      this.refLaboral = respuesta[0].REFLABORAL
      this.telRefLaboral = respuesta[0].TELREFLABORAL
      this.resultadoRefLaboral = respuesta[0].RESULTADOREFLABORAL
      this.refPersonal = respuesta[0].REFPERSONAL
      this.telRefPersonal = respuesta[0].TELREFPERSONAL
      this.resultadoRefPersonal = respuesta[0].RESULTADOREFPERSONAL
      this.refFamiliar = respuesta[0].REFFAMILIAR
      this.telRefFamiliar = respuesta[0].TELREFFAMILIAR
      this.resultadoRefFamiliar = respuesta[0].RESULTADOREFFAMILIAR
      // this.cambioReferenciaNumber = respuesta[0].CAMBIOREFERENCIAS
      this.estadoValidacion = respuesta[0].ESTADOVALIDACION
      this.numeroOrden = respuesta[0].NUMEROORDEN
      this.comentario = respuesta[0].COMENTARIO
      this.personaid = respuesta[0].PERSONAID
      this.cuentaID = respuesta[0].CUENTAID

      // if (this.cambioReferenciaNumber == 1) {
      //   this.cambioReferencia = true;
      // } else {
      //   this.cambioReferencia = false;
      // }
      this.cambioReferenciaNumber = respuesta[0].CAMBIOREFERENCIAS;

      console.log(this.cambioReferenciaNumber + " " + this.cambioReferencia + " ")
    })
  }

  ActualizarData() {




    if (this.nombre == "" || this.identidad == "" || this.nivelBuro == 0 || this.distribuidor == 0 || this.numeroCliente == "" ||
      this.refLaboral == "" || this.telRefLaboral == "" || this.refPersonal == "" || this.telRefPersonal == "" ||
      this.refFamiliar == "" || this.telRefFamiliar == "" || this.numeroOrden == "") {
      this.service.notificacion("Los campos con asteriscos son obligatorios")
      return
    }

    if (this.confirmacion === undefined) {
      this.confirmacion = 0
    }

    if (this.resultadoRefLaboral === undefined) {
      this.resultadoRefLaboral = 0
    }

    if (this.resultadoRefPersonal === undefined) {
      this.resultadoRefPersonal = 0
    }

    if (this.resultadoRefFamiliar === undefined) {
      this.resultadoRefFamiliar = 0
    }

    // CELESTE.RODRIGUEZ
    // ASTRYD.ELVIR
    console.log(this.confirmacion)

    const identidad = this.identidad.replace(/[^0-9]/g, "");
    console.log(identidad)
    const numeroCliente = this.numeroCliente.replace(/[^0-9]/g,"")
    console.log(numeroCliente)
    this.nombre = this.nombre.toUpperCase()

    this.service.updateData(this.nombre,
      identidad,
      this.nivelBuro,
      this.distribuidor,
      numeroCliente,
      this.confirmacion,
      this.refLaboral,
      this.telRefLaboral,
      this.resultadoRefLaboral,
      this.refPersonal,
      this.telRefPersonal,
      this.resultadoRefPersonal,
      this.refFamiliar,
      this.telRefFamiliar,
      this.resultadoRefFamiliar,
      this.cambioReferenciaNumber,
      this.estadoValidacion,
      this.numeroOrden,
      this.comentario,
      this.carteraID,
      this.personaid).subscribe(r => {
        var respuesta = this.auth.desencriptar(r.response)
        respuesta = JSON.parse(respuesta)
        respuesta = respuesta[0]
        console.log(respuesta)
        if (respuesta.status == 1) {
          this.service.notificacion(respuesta.message)
        } else {
          this.service.notificacion(respuesta.message)
        }
      })
  }

  validarTelefono(event: KeyboardEvent) {
    if (this.numeroCliente !== null) {
      const tecla = event.key;
      const longitudValor = this.numeroCliente.length;
      if (longitudValor >= 15 && tecla !== 'Backspace') {
        event.preventDefault()
      }
      // if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== 'Tab') {
      //   event.preventDefault();
      // }

      if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== 'Tab' && !(event.ctrlKey && (tecla === 'c' || tecla === 'v'))) {
        event.preventDefault();
      }
    }
  }

  validarIdentidad(event: KeyboardEvent){
    if (this.identidad !== null) {
      const tecla = event.key;
      const longitudValor = this.identidad.length;
      if (longitudValor >= 20 && tecla !== 'Backspace') {
        event.preventDefault()
      }

      // if (!/^-?\d*$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'Tab' && !(event.ctrlKey && (tecla === 'c' || tecla === 'v'))) {
        if (!/^-?\d*$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'Tab' && !(event.ctrlKey && (tecla === 'c' || tecla === 'v'))) {
        event.preventDefault();
      }
    }
  }


  CloseDiaglog(): void {
    this.dialogRef.close()
  }

  Gestiones() {
    // this.route.navigate(['carteras/cuentas_listas'], { queryParams: { cuentaID: this.cuentaID} })
    this.route.navigate(['carteras/atencion_cliente'], { queryParams: { cuentaID: this.cuentaID } })
    this.CloseDiaglog()
  }

  applyFilter(data: any[], searchTerm: string, property: string): any[] {
    if (searchTerm) {
      return data.filter((item) =>
        item[property].toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }
}
