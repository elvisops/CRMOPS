import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { UsuariosService } from '../usuarios.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {

  rolID: any
  
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.])[A-Za-z\d.]{8,}$/)
  ]);


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
  UsuarioID=this.data.USUARIOID
  clave:string=""
  claveConfirm:string=""
  rolid:any=this.data.ROLID
  estado=(this.data.ESTADO==1)?true:false
  txtEstado = (this.estado)?"Activo":"Inactivo"  

  chPass:boolean = false
  
  ListaRoles:any[] = []

  validarClave(event: KeyboardEvent){
    const key = event.key;

    if (!/^[A-Za-z0-9.]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.genListaRoles()

    this.rolID = sessionStorage.getItem('rolID')
  }

  genListaRoles(){
    this.service.getListaRoles().subscribe(r=>{
      var res = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(res)
    })
  }
  GuardarCambios(){
    if(this.usuario=="" || this.rolid < 1  || this.estado == undefined){
      this.service.notificacion("Debe llenar los campos del formulario")
      return
    }
    this.service.Update(this.UsuarioID,this.usuario,this.rolid,this.estado).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)      
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]      
      if(respuesta.status==1){
        this.service.notificacion("Usuario actualizado con exito!")
        this.CloseDialog()        
      }else{
        this.service.notificacion(respuesta.message)        
      }
    })
  }

  CambiarClave(){

    if (this.passwordControl.invalid) {
      return
    }
    if(this.clave != this.claveConfirm){
      this.service.notificacion("Las contraseñas no coinciden")
      return
    }
    if(this.clave == "" || this.claveConfirm == ""){
      this.service.notificacion("Las claves no pueden estar vacias")
      return
    }
    this.service.ChPass(this.usuario,this.clave).subscribe(r=>{
      console.log(r)
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      
      console.log(respuesta)
      if(respuesta.status == 1){
        this.service.notificacion("Cambio de contraseña aplicado!")
        this.chPass = false
      }else{
        this.service.notificacion(respuesta.message)
      }
    })

  }



  
  CloseDialog():void{
    this.dialogRef.close()
  }

}
