import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CarterasService } from '../../administracion/socios/proyectos/carteras/carteras.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proyectos-usuario',
  templateUrl: './proyectos-usuario.component.html',
  styleUrls: ['./proyectos-usuario.component.css']
})
export class ProyectosUsuarioComponent implements OnInit{

  constructor(
    private router: ActivatedRoute,
    private auth:AuthService,
    private service: CarterasService,
    private dialog:MatDialog,
    private navigate:Router,    
  ){}

  ngOnInit(): void {
    
  }

  ObtenerListaProyectos(){
    
    this.service.getSociosProyectos().subscribe(r=>{      
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      // this.ListaProyectos = respuesta
      // this.FillTable(respuesta)
    })

  }
}
