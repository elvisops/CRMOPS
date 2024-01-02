import { Component, OnInit } from '@angular/core';
import { ReportesService } from './reportes.service';
import { AuthService } from 'src/app/guards/auth/auth.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit{

  datos = [
    // { Nombre: 'John', Edad: 30, Ciudad: 'Nueva York' },
    // { Nombre: 'Jane', Edad: 28, Ciudad: 'Los Ángeles' },
  ];

  constructor(
    private excelService: ReportesService,
    private auth: AuthService,
    
  ){}

  ngOnInit(): void {
    this.genDatos()
    
  }

  genDatos(){
    this.excelService.getDatos().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.datos = JSON.parse(data)
      console.log(this.datos)
      this.generarReporte()
    })
  }
  
  generarReporte(){
    this.excelService.generarReporte(this.datos,'reporte')
  }
}
