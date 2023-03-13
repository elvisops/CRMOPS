import { Component, Inject, OnInit  } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';

import { SociosService } from '../socios.service';


@Component({
  selector: 'app-socios-crear',
  templateUrl: './socios-crear.component.html',
  styleUrls: ['./socios-crear.component.css']
})
export class SociosCrearComponent implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<SociosCrearComponent>,
    private service:SociosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

/*variables*/
hide:boolean = true
usuario:string=""
socio:string=""
descripcion:string=""

ListaSocios:any[] = []


ngOnInit(): void {
  this.genListaSocios();
}

CrearSocio(){
  if(this.socio == ""||this.descripcion==""){
    this.service.notificacion("Debe llenar todos los campos del formulario")
    return;
  }
  this.service.Crear(this.socio,this.descripcion).subscribe(r=>{
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

genListaSocios(){
  this.service.getListaSocios().subscribe(r=>{
    var res = this.auth.desencriptar(r.data)
    this.ListaSocios = JSON.parse(res)
  })
}

resetForm(){
  this.usuario="";
  this.socio="";
  this.descripcion="";
}


CloseDialog():void{
  this.dialogRef.close()
}


}
