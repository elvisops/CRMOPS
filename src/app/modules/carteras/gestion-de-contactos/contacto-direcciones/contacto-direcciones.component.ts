import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ContactoDireccionesService } from './contacto-direcciones.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto-direcciones',
  templateUrl: './contacto-direcciones.component.html',
  styleUrls: ['./contacto-direcciones.component.css']
})
export class ContactoDireccionesComponent implements OnInit {
  direccionForm = this.formBuilder.group({
    direccion: ['', [Validators.required, Validators.minLength(10)]],
    tipoDireccion: ['', [Validators.required, Validators.min(1)]],
    municipio: ['', [Validators.required, Validators.min(1)]],
    colonia: ['', [Validators.required, Validators.minLength(10)]],
  })

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<ContactoDireccionesComponent>,
    private service: ContactoDireccionesService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

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

  filteredMunicipios!: any
  personaID: number = this.data
  direccion: string = ""
  municipioID: number = 0
  tipoDireccionID: number = 0
  colonia: string = ""
  ListaMunicipios: any[] = []
  ListaTiposDirecciones: any[] = []
  searchTermMunicipio!: string;
  // isMunicipioTouched: boolean = false; // Variable para controlar si se tocó el campo
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  Crear() {
    this.markFormGroupTouched(this.direccionForm);
    if (this.direccionControl.hasError('required') || this.direccionControl.hasError('minlength') ||
      this.tipoDireccionControl.hasError('required') || this.tipoDireccionControl.hasError('min') ||
      this.municipio.hasError('required') || this.municipio.hasError('min') || this.coloniaD.hasError('required') ||
      this.coloniaD.hasError('minlength')) {
      this.service.notificacion("Debe llenar todos los datos del formulario")
      return
    }

    this.service.Guardar(this.personaID, this.direccion, this.municipioID, this.colonia, this.tipoDireccionID).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]
      console.log(respuesta)
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.resetForm()
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

  // private _filterMunicipios(value: string): any[] {
  //   const filterValue = value.toLowerCase();
  //   return this.ListaMunicipios.filter(option =>
  //     option.MUNICIPIO.toLowerCase().includes(filterValue)
  //   );
  // }

  resetForm() {
    this.direccion = ""
    this.municipioID = 0
    this.colonia = ""
    this.tipoDireccionID = 0
    this.searchTermMunicipio = ""
  }

  CloseDialog() {
    this.dialogRef.close()
  }
}
