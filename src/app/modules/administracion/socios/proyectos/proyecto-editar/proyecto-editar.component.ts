import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosService } from '../../socios.service';

@Component({
  selector: 'app-proyecto-editar',
  templateUrl: './proyecto-editar.component.html',
  styleUrls: ['./proyecto-editar.component.css']
})
export class ProyectoEditarComponent implements OnInit {
  
  constructor(
    private service:SociosService,
    private auth:AuthService,
    private dialogRef:MatDialogRef<ProyectoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  ngOnInit(): void {
    
  }

  EditarProyecto(){
    if(this.data.PROYECTO == ""){
      this.service.notificacion("Por favor ingrese el nombre del proyecto")
      return
    }
    this.service.UpdateProyecto(this.data.PROYECTOID,this.data.PROYECTO).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion("El proyecto se actualizo exitosamente!")
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
