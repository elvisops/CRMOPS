import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ModulosService } from '../../modulos.service';

@Component({
  selector: 'app-vistas-editar',
  templateUrl: './vistas-editar.component.html',
  styleUrls: ['./vistas-editar.component.css']
})
export class VistasEditarComponent implements OnInit{
  constructor(
    private service: ModulosService,
    private auth: AuthService,
    private dialogRef:MatDialogRef<VistasEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  ngOnInit(): void {
    
  }

  EditarVista(){
    if (this.data.VISTA == "") {
      this.service.notificacion("Debe llenar todos los campos del formulario")
      return
    }
    this.service.UpdateVista(this.data.VISTAID,this.data.VISTA,this.data.V_URL).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion("La vista se actualizo exitosamente!")
        this.CloseDialog();
      }else{
        this.service.notificacion(respuesta.message)
      }
    })
    // alert("id: "+this.data.VISTAID+" VISTA: "+ this.data.VISTA + " V_URL: " + this.data.V_URL)
  }

  CloseDialog():void{
    this.dialogRef.close()
  }
}
