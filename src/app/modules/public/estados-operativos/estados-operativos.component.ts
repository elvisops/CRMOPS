import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-estados-operativos',
  templateUrl: './estados-operativos.component.html',
  styleUrls: ['./estados-operativos.component.css']
})
export class EstadosOperativosComponent implements  OnInit{

  constructor() { }

  openlink(event: MouseEvent){    
    event.preventDefault();
  }

  ngOnInit(): void {
  }

}
