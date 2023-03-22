import { Component, Inject, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ModulosService } from '../../modulos.service';

@Component({
  selector: 'app-roles-vistas',
  templateUrl: './roles-vistas.component.html',
  styleUrls: ['./roles-vistas.component.css']
})
export class RolesVistasComponent implements OnInit{
 
  favoriteSeason: string = "";
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  RolID:number | string = ""
  Rol:string = ""
  // toppings = new FormControl('');
  // defaultTopping = '1';


  // toppings = new FormControl(['Sausage']);
  // toppingList = ['Pepperoni', 'Sausage', 'Mushroom'];

  // Roles = new FormControl([this.data.ROLID]);
  ListaRoles: any[] = []
  RolesAsignados: any[] = []
  RolesDisponibles: any[] = []

  // RolesDisponibles = this.ListaRoles.filter(elemento => !this.RolesAsignados.includes(elemento))
  // .concat(this.RolesAsignados.filter(elemento => !this.ListaRoles.includes(elemento)))

  arreglo1:any[] = [1, 2, 3, 4, 5];
  arreglo2:any[] = [4, 5, 6, 7, 8];
  nuevoArreglo:any[] = this.ListaRoles.filter(elemento => !this.RolesAsignados.includes(elemento))
  .concat(this.RolesAsignados.filter(elemento => !this.ListaRoles.includes(elemento)));


  constructor(
    private dialogRef:MatDialogRef<RolesVistasComponent>,
    private service: ModulosService,
    private auth: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}


  
  ngOnInit(): void {
    this.genListaRoles()
    setTimeout(() => {
      this.genRolesAsignados()
    }, 100);

   
  }



  genListaRoles(){
    this.service.getListaRoles(this.data.VISTAID).subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(res)
    })
  }

  genRolesAsignados(){
    this.service.getRolesAsignados(this.data.VISTAID).subscribe(r =>{
      var res = this.auth.desencriptar(r.data)
      this.RolesAsignados = JSON.parse(res)
    })
  }

  AgregarRol(RolID:any){
    // alert("Agregar rol " + RolID)
    this.service.Guardar(RolID, this.data.VISTAID).subscribe( r =>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }else{
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }
    })
  } 

  EliminarRol(RolID:any){
    this.service.Eliminar(RolID, this.data.VISTAID).subscribe( r =>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }else{
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }
    })
  }

  
  CloseDialog(){
    this.dialogRef.close()
  }
}
