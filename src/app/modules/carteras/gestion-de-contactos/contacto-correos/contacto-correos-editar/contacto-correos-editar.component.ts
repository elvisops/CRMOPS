import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ContactoCorreosService } from '../contacto-correos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-correos-editar',
  templateUrl: './contacto-correos-editar.component.html',
  styleUrls: ['./contacto-correos-editar.component.css']
})
export class ContactoCorreosEditarComponent implements OnInit {

  correoForm = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    tipoCorreoID: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(
    private dialogRef: MatDialogRef<ContactoCorreosEditarComponent>,
    private service: ContactoCorreosService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  get correoControl(): FormControl {
    return this.correoForm.get('correo') as FormControl;
  }
  get tipoCorreoControl(): FormControl {
    return this.correoForm.get('tipoCorreoID') as FormControl;
  }

  personaID: number = this.data.PERSONAID

  correoID: number = this.data.CORREOID
  correo: string = this.data.CORREO
  tipoCorreoID: number = this.data.TIPOCORREOID

  ListaTiposCorreos: any[] = []

  ngOnInit(): void {
    this.genListaTiposCorreos()
  }

  genListaTiposCorreos() {
    this.service.getListaTiposCorreos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaTiposCorreos = JSON.parse(res)
      console.log(this.ListaTiposCorreos)
    })
  }

  Actualizar() {
    if (this.correoControl.hasError('required') || this.correoControl.hasError('email') || this.tipoCorreoControl.hasError('required') || this.tipoCorreoControl.hasError('min')) {
      this.service.notificacion("Debe llenar todos los datos del formulario")
      return
    }

    this.service.Editar(this.personaID, this.correoID, this.correo, this.tipoCorreoID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.resetForm()
        this.CloseDialog()
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  resetForm() {
    this.correo = ""
    this.tipoCorreoID = 0
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
