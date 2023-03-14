import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { SociosContactos } from '../socios';
import { SociosService } from '../socios.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit{

  constructor(
    private auth:AuthService,
    private service:SociosService,
    private dialogRef:MatDialogRef<ContactosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  //Variables locales
  SocioID:any = this.data
  showFormCreate:boolean = false
  spinner:boolean = false
  NewContact:SociosContactos = {
    SOCIOCONTACTOID:null,
    SOCIOID:this.SocioID,        
    NOMBRE:"",
    TELEFONO:"",
    CORREO:"",
    PUESTO:"",
    DESCRIPCION:"",
    CREACION:"",
    ACTUALIZACION:""
  }


  ListaContactos:SociosContactos[] = []
  DataSource:MatTableDataSource<SociosContactos> = new MatTableDataSource()
  Columnas:string[] = ['NOMBRE','TELEFONO','CORREO','DESCRIPCION','CREACION','ACTUALIZACION','OPCIONES']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  ngOnInit(): void {
    this.getContactos()
  }

  getContactos(){
    this.service.getSociosContacts(this.SocioID).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      this.ListaContactos = respuesta
      this.FillTable(respuesta)
    })
  }

  CrearContacto(){
    this.spinner = true
    if(this.NewContact.NOMBRE == "" ||
      this.NewContact.TELEFONO == "" ||
      this.NewContact.CORREO == "" ||
      this.NewContact.PUESTO == ""){
      this.service.notificacion("Debe llenar los campos de Nombre, Telefono y Correo")
      return;
    }
    this.service.CrearContacto(
      this.SocioID,
      this.NewContact.NOMBRE,
      this.NewContact.TELEFONO,
      this.NewContact.CORREO,
      this.NewContact.DESCRIPCION,
      this.NewContact.PUESTO
    ).subscribe(r=>{
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      if(respuesta.status == 1){  
        this.service.notificacion("Contacto Creado con exito!")
        this.getContactos() 
        this.resetForm()       
        this.spinner = false
      }else{
        this.service.notificacion(respuesta.message)
        this.spinner = false
      }
    })
  }

  resetForm(){
    this.NewContact = {
      SOCIOCONTACTOID:null,
      SOCIOID:this.SocioID,        
      NOMBRE:"",
      TELEFONO:"",
      CORREO:"",
      PUESTO:"",
      DESCRIPCION:"",
      CREACION:"",
      ACTUALIZACION:""
    }
  }

  ContactFormShow(){
    this.showFormCreate = true
  }

  ContactFormHide(){
    this.showFormCreate = false
  }

  CloseDialog(){
    this.dialogRef.close()
  }



  FillTable(Datos:SociosContactos[]){
    this.DataSource = new MatTableDataSource(Datos)
    this.DataSource.paginator = this.paginator
    this.DataSource.sort = this.sort
  }

}
