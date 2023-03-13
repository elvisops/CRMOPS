import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';

import { TiposCorreosService } from '../tipos-correos.service';

@Component({
  selector: 'app-tipos-correos-crear',
  templateUrl: './tipos-correos-crear.component.html',
  styleUrls: ['./tipos-correos-crear.component.css']
})
export class TiposCorreosCrearComponent implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<TiposCorreosCrearComponent>,
    private service:TiposCorreosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

/*variables*/
hide:boolean = true
usuario:string=""
tipocorreo:string=""

ListaTcorreos:any[] = []


ngOnInit(): void {
  this.genListaTcorreos();
}

CrearTcorreo(){
  if(this.tipocorreo == ""){
    this.service.notificacion("Debe llenar todos los campos del formulario")
    return;
  }
  this.service.Crear(this.tipocorreo).subscribe(r=>{
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

genListaTcorreos(){
  this.service.getListaTcorreos().subscribe(r=>{
    var res = this.auth.desencriptar(r.data)
    this.ListaTcorreos = JSON.parse(res)
  })
}

resetForm(){
  this.usuario="";
  this.tipocorreo="";
}


CloseDialog():void{
  this.dialogRef.close()
}
}
