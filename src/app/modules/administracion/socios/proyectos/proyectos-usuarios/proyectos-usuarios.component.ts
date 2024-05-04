import { Component, OnInit, Inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { SociosService } from '../../socios.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-proyectos-usuarios',
  templateUrl: './proyectos-usuarios.component.html',
  styleUrls: ['./proyectos-usuarios.component.css']
})
export class ProyectosUsuariosComponent implements OnInit {

  doneList: string | CdkDropList<any> = ""; 

  ListaUsuarios: any = []
  ListaUsuariosDisponibles: any = []
  proyecto: any = ''

  constructor(
    private dialogRef: MatDialogRef<ProyectosUsuariosComponent>,
    private service: SociosService,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.proyecto = this.data.PROYECTO
    this.genUsuarioCarteras()
    this.genUsuariosDisponibles()
  }

  genUsuarioCarteras() {
    this.service.getUsuariosCarteras(this.data.PROYECTOID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaUsuarios = respuesta
    })
  }

  genUsuariosDisponibles() {
    this.service.getUsuariosCarterasDisponibles(this.data.PROYECTOID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaUsuariosDisponibles = respuesta
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    const usuarioMovido = event.item.data; // Captura el elemento que se movió

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.service.updatePermisoUsuario(usuarioMovido.USUARIOID, this.data.PROYECTOID).subscribe(r => {
        var respuesta = this.auth.desencriptar(r.response)
        respuesta = JSON.parse(respuesta)
        respuesta = respuesta[0]
        if (respuesta.status == 1) {
          this.service.notificacion(respuesta.message)
        } else {
          this.service.notificacion(respuesta.message)
        }
      })

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Función de seguimiento para *ngFor
  trackFn(index: number, item: any) {
    return index;
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
