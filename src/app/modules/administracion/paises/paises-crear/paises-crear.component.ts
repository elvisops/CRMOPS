import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';

import { PaisesService } from '../paises.service';

@Component({
  selector: 'app-paises-crear',
  templateUrl: './paises-crear.component.html',
  styleUrls: ['./paises-crear.component.css']
})
export class PaisesCrearComponent implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<PaisesCrearComponent>,
    private service:PaisesService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

/*variables*/
hide:boolean = true
usuario:string=""
pais:string=""

ListaPaises:any[] = []


ngOnInit(): void {
  this.genListaPaises();
}

CrearPais(){
  if(this.pais == ""){
    this.service.notificacion("Debe llenar todos los campos del formulario")
    return;
  }
  this.service.Crear(this.pais).subscribe(r=>{
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

genListaPaises(){
  this.service.getListaPaises().subscribe(r=>{
    var res = this.auth.desencriptar(r.data)
    this.ListaPaises = JSON.parse(res)
  })
}

resetForm(){
  this.usuario="";
  this.pais="";
}


CloseDialog():void{
  this.dialogRef.close()
}

}
