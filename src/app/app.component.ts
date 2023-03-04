import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  
  title = 'CRM OPS';
  isLogged:boolean = false

  ValidarSesion(){
    this.isLogged = (sessionStorage.getItem('logged')=="true")?true:false;
  }
  
}
