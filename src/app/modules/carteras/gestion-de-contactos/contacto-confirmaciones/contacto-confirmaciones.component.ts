import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ContactoConfirmacionesService } from './contacto-confirmaciones.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-confirmaciones',
  templateUrl: './contacto-confirmaciones.component.html',
  styleUrls: ['./contacto-confirmaciones.component.css']
})
export class ContactoConfirmacionesComponent implements OnInit{
  confirmacionForm = this.formBuilder.group({
    fechaV: ['', [Validators.required]],
    montoV: ['', [Validators.required, Validators.min(10)]]
  });

  constructor(
    private dialogRef: MatDialogRef<ContactoConfirmacionesComponent>,
    private service: ContactoConfirmacionesService,
    private auth:AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  get fechaControl(): FormControl {
    return this.confirmacionForm.get('fechaV') as FormControl;
  }
  get montoControl(): FormControl {
    return this.confirmacionForm.get('montoV') as FormControl;
  }

  cuentaID: number = this.data

  fecha!: Date | null
  monto: string = ""

  ngOnInit(): void {
    
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  CrearConfirmacion(){
    this.markFormGroupTouched(this.confirmacionForm);
    if (this.fecha == null || this.fechaControl.hasError('required') || this.montoControl.hasError('required') || this.montoControl.hasError('min')) {
      this.service.notificacion("Debe llenar todos los datos del formulario")
      return
    }
    
    this.service.GuardarConfirmacion(this.cuentaID,this.fecha,this.monto).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.resetForm()
      }else{
        this.service.notificacion(respuesta.message) 
      }
    })

  }

  getFechaMinima(): Date {
    return new Date(); // Devuelve la fecha actual
  }
  
  resetForm(){
    this.fecha = null
    this.monto = ""

  }

  CloseDialog(){
    this.dialogRef.close()
  }
}
