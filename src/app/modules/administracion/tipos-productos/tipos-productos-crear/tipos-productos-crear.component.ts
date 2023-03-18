import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';


import { TiposProductosService } from '../tipos-productos.service';

@Component({
  selector: 'app-tipos-productos-crear',
  templateUrl: './tipos-productos-crear.component.html',
  styleUrls: ['./tipos-productos-crear.component.css']
})
export class TiposProductosCrearComponent implements OnInit{

  
  constructor(
    private dialogRef:MatDialogRef<TiposProductosCrearComponent>,
    private service:TiposProductosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ){}

 /*variables*/
 hide:boolean = true
 usuario:string=""
 tipoProducto:string=""
 descripcion:string=""
 
 ListaTproductos:any[] = []

  ngOnInit(): void {
    this.genListaTproductos()
  }

  CrearTproducto(){
    if(this.tipoProducto == ""||this.descripcion==""){
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return;
    }
    this.service.Crear(this.tipoProducto,this.descripcion).subscribe(r=>{
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

  genListaTproductos(){
    this.service.getListaTproductos().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaTproductos = JSON.parse(res)
    })
  }

  resetForm(){
    this.usuario="";
    this.tipoProducto="";
    this.descripcion="";
  }


  CloseDialog():void{
    this.dialogRef.close()
  }


}
