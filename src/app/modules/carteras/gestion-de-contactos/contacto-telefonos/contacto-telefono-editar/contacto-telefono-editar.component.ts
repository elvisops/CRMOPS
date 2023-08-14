import { Component, OnInit, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactoTelefonosService } from '../contacto-telefonos.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-telefono-editar',
  templateUrl: './contacto-telefono-editar.component.html',
  styleUrls: ['./contacto-telefono-editar.component.css']
})
export class ContactoTelefonoEditarComponent implements OnInit{

  telefonoForm = this.formBuilder.group({
    telefono: ['',[Validators.required, Validators.minLength(8)]],
    telefonoID: ['',[Validators.required, Validators.min(1)]]
  })

  constructor(
    private dialogRef: MatDialogRef<ContactoTelefonoEditarComponent>,
    private service: ContactoTelefonosService,
    private auth:AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  get TelefonoControl():FormControl{
    return this.telefonoForm.get('telefono') as FormControl
  }

  get TipoTelefonoControl():FormControl{
    return this.telefonoForm.get('telefonoID') as FormControl
  }

  personaID: number = this.data.PERSONAID
  telefono: string = this.data.TELEFONO
  telefonoID: number = this.data.TELEFONOID
  tipo:string = this.data.TIPO
  tipoTelefonoID:number = this.data.TELEFONOTIPOID
  sms: boolean | number = this.data.SMS
  ivr: boolean | number = this.data.IVR
  

  ListaTiposTelefonos: any[] = []

  ngOnInit(): void {
    this.genListaTiposTelefonos()
  }

  genListaTiposTelefonos(){
    this.service.getListaTiposTelefonos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaTiposTelefonos = JSON.parse(res)
    })
  }

  EditarTelefono(){
    if (this.TelefonoControl.hasError('required') || this.TelefonoControl.hasError('minlength') || this.TipoTelefonoControl.hasError('required') || this.TipoTelefonoControl.hasError('min')) {
      this.service.notificacion("Debe ingresar los datos solicitados")
      return
    }
    if (this.sms) {
      this.sms = 1
    }else{
      this.sms = 0
    }

    if(this.ivr){
      this.ivr = 1
    }else{
      this.ivr = 0
    }

    this.service.EditarTelefono(this.personaID,this.telefonoID,this.telefono,this.tipoTelefonoID,this.sms,this.ivr).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.resetForm()
        this.CloseDialog()
      }else{
        this.service.notificacion(respuesta.message) 
      }
    })
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
    this.telefonoForm.get('telefono')?.setValue(sanitizedValue); // Actualizar el valor del campo
  }

  resetForm(){
    this.telefono = ""
    this.tipoTelefonoID = 0
    this.sms = false
    this.ivr = false
  }

  CloseDialog(){
    this.dialogRef.close()
  }
}
