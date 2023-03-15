import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosService } from '../../socios.service';

@Component({
  selector: 'app-proyecto-crear',
  templateUrl: './proyecto-crear.component.html',
  styleUrls: ['./proyecto-crear.component.css']
})
export class ProyectoCrearComponent implements OnInit{  
  Proyecto:string = ""

  constructor(
    private dialogRef:MatDialogRef<ProyectoCrearComponent>,
    private service: SociosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){} 

  ngOnInit(): void {  
    
  }

  CrearProyecto(){
    if(this.Proyecto == ""){
      this.service.notificacion("Por favor ingrese el nombre del proyecto")
      return
    }
    this.service.CrearProyecto(this.data,this.Proyecto).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion("El proyecto se registro exitosamente!")
        this.CloseDialog()
      }else{
        this.service.notificacion(respuesta.message)        
      }
    })
  }

  CloseDialog(){
    this.dialogRef.close()
  }

}
