import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { CarterasTipos } from '../carteras';
import { CarterasService } from '../carteras.service';

@Component({
  selector: 'app-carteras-crear',
  templateUrl: './carteras-crear.component.html',
  styleUrls: ['./carteras-crear.component.css']
})
export class CarterasCrearComponent implements OnInit {

  constructor(
    private FormBuilder:FormBuilder,
    private service: CarterasService,
    private auth:AuthService
  ){}

  ListaCarterasTipos:CarterasTipos[] = []
  StepOneCompleted:boolean = false
  

  firstFormGroup: FormGroup = this.FormBuilder.group(
    {
      NombreCartera: ['',Validators.required],
      TipoCartera: ['',Validators.required]
    }
  );
  secondFormGroup: FormGroup = this.FormBuilder.group({secondCtrl: ['']});

  ngOnInit(): void {
    this.ObtenerTiposCarteras()
  }

  ObtenerTiposCarteras(){
    this.service.getCarterasTipos().subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaCarterasTipos = respuesta
    })
  }

  CrearCartera(){
    this.StepOneCompleted = true
  }
}
