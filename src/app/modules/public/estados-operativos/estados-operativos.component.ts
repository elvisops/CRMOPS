import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { EstadosOperativosService } from './estados-operativos.service';

@Component({
  selector: 'app-estados-operativos',
  templateUrl: './estados-operativos.component.html',
  styleUrls: ['./estados-operativos.component.css']
})
export class EstadosOperativosComponent implements  OnInit{

  constructor(
    private auth:AuthService,
    private service:EstadosOperativosService
  ) { }

  EstadosOperativos: any[] = []

  openlink(event: MouseEvent){    
    event.preventDefault();
  }

  ListarEstadosOperativos(){
    this.service.getEstadosOperativos().subscribe(res=>{      
      var respuesta = this.auth.desencriptar(res.data)
      respuesta = JSON.parse(respuesta)
      this.EstadosOperativos = respuesta      
    })    
  }


  ngOnInit(): void {    
    this.ListarEstadosOperativos()
  }

}
