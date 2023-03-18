import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { TiposProductosService } from '../tipos-productos.service';

@Component({
  selector: 'app-tipos-productos-editar',
  templateUrl: './tipos-productos-editar.component.html',
  styleUrls: ['./tipos-productos-editar.component.css']
})
export class TiposProductosEditarComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private servicio: TiposProductosService,
    private dialogRef: MatDialogRef<TiposProductosEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  //variables locales
  tipoProductoID:number=this.data.TIPOPRODUCTOID;
  tipoProducto:string=this.data.TIPO_PRODUCTO;
  descripcion:string=this.data.DESCRIPCION;

  ActualizarTproducto(){
    if(this.tipoProducto=="" || this.descripcion ==""){
      this.servicio.notificacion("Debe de llenar los campos del formulario");
      return;
    }
     this.servicio.update(this.tipoProductoID,this.tipoProducto, this.descripcion).subscribe(r =>{
     var respuesta = this.authService.desencriptar(r.response) 
     respuesta = JSON.parse(respuesta)
     respuesta = respuesta[0]
     if(respuesta.status==1){
      this.servicio.notificacion("El Tipo de Producto ha sido modificado correctamente")
      this.CloseDialog()
     }else{
      this.servicio.notificacion(respuesta.message)
     }
     
     })
    

  }

  ngOnInit(): void {
    
  }

  CloseDialog():void{
    this.dialogRef.close()
  }

}
