import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposTelefonosService } from '../tipos-telefonos.service';

@Component({
  selector: 'app-tipos-telefonos-crear',
  templateUrl: './tipos-telefonos-crear.component.html',
  styleUrls: ['./tipos-telefonos-crear.component.css']
})
export class TiposTelefonosCrearComponent implements OnInit{

  constructor(
    private dialogRef:MatDialogRef<TiposTelefonosCrearComponent>,
    private service: TiposTelefonosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}
  /*variables*/
  tipo:string=""

  ListaTipsoTelefonos:any[] = []
  
  ngOnInit(): void {
    
  }

  CrearTipoTelefono(){
    if(this.tipo == ""){
      this.service.notificacion("Debe llenar el tipo de telefono")
      return;
    }
    this.service.Crear(this.tipo).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
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
    this.tipo="";
  }
  

  CloseDialog():void{
    this.dialogRef.close()
  }
}
