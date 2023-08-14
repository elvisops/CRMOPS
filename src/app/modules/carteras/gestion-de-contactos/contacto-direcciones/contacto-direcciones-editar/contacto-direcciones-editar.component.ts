import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ContactoDireccionesService } from '../contacto-direcciones.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto-direcciones-editar',
  templateUrl: './contacto-direcciones-editar.component.html',
  styleUrls: ['./contacto-direcciones-editar.component.css']
})
export class ContactoDireccionesEditarComponent implements OnInit {

  direccionForm = this.formBuilder.group({
    direccion: ['', [Validators.required, Validators.minLength(10)]],
    tipoDireccion: ['', [Validators.required, Validators.min(1)]],
    municipio: ['', [Validators.required, Validators.min(1)]],
    colonia: ['', [Validators.required, Validators.minLength(10)]],
  })

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<ContactoDireccionesEditarComponent>,
    private service: ContactoDireccionesService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  get direccionControl(): FormControl {
    return this.direccionForm.get('direccion') as FormControl
  }
  get tipoDireccionControl(): FormControl {
    return this.direccionForm.get('tipoDireccion') as FormControl
  }
  get municipio(): FormControl {
    return this.direccionForm.get('municipio') as FormControl
  }
  get coloniaD(): FormControl {
    return this.direccionForm.get('colonia') as FormControl
  }

  personaID: number = this.data.PERSONAID
  direccion: string = this.data.DIRECCION
  direccionID: number = this.data.DIRECCIONID
  municipioID: number = this.data.MUNICIPIOID
  tipoDireccionID: number = this.data.TIPODIRECCIONID
  colonia: string = this.data.COLONIA

  ListaMunicipios: any[] = []
  ListaTiposDirecciones: any[] = []

  searchTermMunicipio!: string;


  ngOnInit(): void {
    this.genListaMunicipios()
    this.genListaTiposDirecciones()
  }

  genListaMunicipios() {
    this.service.getListaTiposMunicipio().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaMunicipios = JSON.parse(res)
      console.log(this.ListaMunicipios)
    })
  }

  genListaTiposDirecciones() {
    this.service.getListaTiposTiposDirecciones().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaTiposDirecciones = JSON.parse(res)
      console.log(this.ListaTiposDirecciones)
    })
  }

  Actualizar() {
    // if (this.direccion == "" || this.municipioID == 0 || this.colonia == "" || this.tipoDireccionID == 0) {
    //   this.service.notificacion("Debe ingresar los datos solicitados")
    //   return
    // }
    if (this.direccionControl.hasError('required') || this.direccionControl.hasError('minlength') ||
      this.tipoDireccionControl.hasError('required') || this.tipoDireccionControl.hasError('min') ||
      this.municipio.hasError('required') || this.municipio.hasError('min') || this.coloniaD.hasError('required') ||
      this.coloniaD.hasError('minlength')) {
      this.service.notificacion("Debe llenar todos los datos del formulario")
      return
    }

    this.service.Editar(this.personaID, this.direccion, this.municipioID, this.colonia, this.tipoDireccionID, this.direccionID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        // this.resetForm()
        this.CloseDialog()
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  applyFilter(data: any[], searchTerm: string, property: string): any[] {
    if (searchTerm) {
      return data.filter((item) =>
        item[property].toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return data;
    }
  }

  handleSelectOpened(opened: boolean) {
    if (opened) {
      this.searchInput.nativeElement.focus();
    }
  }

  resetForm() {
    this.direccion = ""
    this.municipioID = 0
    this.colonia = ""
    this.tipoDireccionID = 0
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
