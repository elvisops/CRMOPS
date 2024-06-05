import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ContactoTelefonosService } from './contacto-telefonos.service';

import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto-telefonos',
  templateUrl: './contacto-telefonos.component.html',
  styleUrls: ['./contacto-telefonos.component.css']
})
export class ContactoTelefonosComponent implements OnInit {

  telefonoForm = this.formBuilder.group({
    telefono: ['', [Validators.required, Validators.minLength(8)]],
    telefonoID: ['', [Validators.required, Validators.min(1)]]
  })
  constructor(
    private dialogRef: MatDialogRef<ContactoTelefonosComponent>,
    private service: ContactoTelefonosService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  get TelefonoControl(): FormControl {
    return this.telefonoForm.get('telefono') as FormControl
  }

  get TipoTelefonoControl(): FormControl {
    return this.telefonoForm.get('telefonoID') as FormControl
  }

  personaID: number = this.data

  telefono: string = ""
  tipoTelefonoID: number = 0
  sms: boolean | number = 0
  ivr: boolean | number = 0


  ListaTiposTelefonos: any[] = []


  ngOnInit(): void {
    this.genListaTiposTelefonos()
  }

  genListaTiposTelefonos() {
    this.service.getListaTiposTelefonos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaTiposTelefonos = JSON.parse(res)
      // console.log(this.ListaTiposTelefonos)
    })
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  CrearTelefono() {
    this.markFormGroupTouched(this.telefonoForm);

    // if (this.telefono.length < 8 || this.tipoTelefonoID == 0) {
    if (this.TelefonoControl.hasError('required') || this.TelefonoControl.hasError('minlength') || this.TipoTelefonoControl.hasError('required') || this.TipoTelefonoControl.hasError('min')) {
      this.service.notificacionError("Debe ingresar los datos solicitados")
      return
    }

    if (this.sms) {
      this.sms = 1
    } else {
      this.sms = 0
    }

    if (this.ivr) {
      this.ivr = 1
    } else {
      this.ivr = 0
    }

    this.service.GuardarTelefono(this.personaID,this.telefono,this.tipoTelefonoID,this.sms,this.ivr).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      // console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.resetForm()
      }else{
        this.service.notificacionError(respuesta.message) 
      }
    })
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[^0-9]/g, ''); // Filtrar caracteres no numéricos
    this.telefonoForm.get('telefono')?.setValue(sanitizedValue); // Actualizar el valor del campo
  }

  resetForm() {
    this.telefono = ""
    this.tipoTelefonoID = 0
    this.sms = false
    this.ivr = false
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
