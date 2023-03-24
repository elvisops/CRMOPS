import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { RolesVistasService } from './roles-vistas.service';

@Component({
  selector: 'app-roles-vistas',
  templateUrl: './roles-vistas.component.html',
  styleUrls: ['./roles-vistas.component.css']
})
export class RolesVistasComponent implements OnInit {

  RolID: number | string = ""
  Rol: string = ""

  ListaRoles: any[] = []
  RolesAsignados: any[] = []

  constructor(
    private dialogRef: MatDialogRef<RolesVistasComponent>,
    private service: RolesVistasService,
    private auth: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.genListaRoles()
    setTimeout(() => {
      this.genRolesAsignados()
    }, 100);
  }

  genListaRoles() {
    this.service.getListaRoles(this.data.VISTAID).subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaRoles = JSON.parse(res)
    })
  }

  genRolesAsignados() {
    this.service.getRolesAsignados(this.data.VISTAID).subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.RolesAsignados = JSON.parse(res)
    })
  }

  AgregarRol(RolID: any) {
    // alert("Agregar rol " + RolID)
    this.service.Guardar(RolID, this.data.VISTAID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      } else {
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }
    })
  }

  EliminarRol(RolID: any) {
    this.service.Eliminar(RolID, this.data.VISTAID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      } else {
        this.service.notificacion(respuesta.message)
        this.ngOnInit()
      }
    })
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
