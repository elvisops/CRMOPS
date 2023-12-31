import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-crear',
  templateUrl: './usuarios-crear.component.html',
  styleUrls: ['./usuarios-crear.component.css']
})
export class UsuariosCrearComponent implements OnInit {

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.])[A-Za-z\d.]{8,}$/)
  ]);

  /*variables*/
  hide:boolean = true
  usuario:string =""
  clave:string=""
  rolid:number | string=0
  
  ListaRoles:any[] = []
  
  constructor(
    private dialogRef:MatDialogRef<UsuariosCrearComponent>,
    private service:UsuariosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

  validarClave(event: KeyboardEvent){
    const key = event.key;

    if (!/^[A-Za-z0-9.]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.genListaRoles()
  }

  genListaRoles(){
    this.service.getListaRoles().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(res)
    })
  }

  CrearUsuario(){
    if(this.usuario == "" || this.clave == ""||this.rolid==0 || this.rolid==""){
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return;
    }
    if (this.passwordControl.invalid) {
      return
    }
    this.service.Crear(this.usuario,this.clave,this.rolid).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if(respuesta.status == 1){
        this.data = respuesta.data  
        this.resetForm()     
        this.service.notificacion(respuesta.message) 
      }else{
        this.service.notificacion(respuesta.message) 
      }
    })
  }

  resetForm(){
    this.usuario="";
    this.rolid=0;
    this.clave="";
  }

  CloseDialog():void{
    this.dialogRef.close()
  }

}