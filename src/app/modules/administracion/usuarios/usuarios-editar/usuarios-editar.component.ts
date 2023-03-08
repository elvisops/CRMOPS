import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {

  

  constructor(
    private dialogRef:MatDialogRef<UsuariosEditarComponent>,
    private service:UsuariosService,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){

  }

  /*variables*/
  hide:boolean = true
  usuario:string = this.data.USUARIO
  clave:string=""
  rolid:any=this.data.ROLID
  
  ListaRoles:any[] = []

  ngOnInit(): void {
    this.genListaRoles()
  }

  genListaRoles(){
    this.service.getListaRoles().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(res)
    })
  }
  EditarUsuario(){

  }
  CloseDialog():void{
    this.dialogRef.close()
  }

}
