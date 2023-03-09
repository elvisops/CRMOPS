import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';


import { ModulosService } from '../modulos.service';

@Component({
  selector: 'app-modulos-crear',
  templateUrl: './modulos-crear.component.html',
  styleUrls: ['./modulos-crear.component.css']
})
export class ModulosCrearComponent implements OnInit{


  constructor(
    private dialogRef:MatDialogRef<ModulosCrearComponent>,
    private service:ModulosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

 /*variables*/
 hide:boolean = true
 usuario:string=""
 modulo:string=""
 descripcion:string=""
 
 ListaModulos:any[] = []

  ngOnInit(): void {
    this.genListaModulos()
  }

  CrearModulo(){
    if(this.modulo == ""||this.descripcion==""){
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return;
    }
    this.service.Crear(this.modulo,this.descripcion).subscribe(r=>{
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

  genListaModulos(){
    this.service.getListaModulos().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaModulos = JSON.parse(res)
    })
  }

  resetForm(){
    this.usuario="";
    this.modulo="";
    this.descripcion="";
  }


  CloseDialog():void{
    this.dialogRef.close()
  }

  

}
