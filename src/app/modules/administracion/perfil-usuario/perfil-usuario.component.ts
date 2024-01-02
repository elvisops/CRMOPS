import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PerfilUsuarioService } from './perfil-usuario.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.])[A-Za-z\d.]{8,}$/)
  ]);

  phoneControl = new FormControl('', [
    Validators.pattern(/^\d+$/)
  ]);


  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions!: any[];

  searchTerm!: string;  
  filteredMunicipios: any[] = [];

  constructor(
    private service: PerfilUsuarioService,
    private auth: AuthService
  ) {
    this.filteredMunicipios = this.listaMunicipios.slice();
   }


  datos: any[] = []
  usuarioid: number | string = ""
  usuario: string = ""
  identidad: string = ""
  nombre: string = ""
  telefono: string = ""
  email: string = ""
  direccion: string = ""

  chPass: boolean = false
  hide: boolean = true
  clave: string = ""
  claveConfirm: string = ""

  listaTiposTelefono: any[] = []
  tipoTelefonoId: number | string = 0
  listaTiposCorreos: any[] = []
  tipoCorreoId: number | string = 0
  listaTiposDirecciones: any[] = []
  tipoDireccionId: number | string = 0
  listaMunicipios: any[] = []
  municipioId: number | string = 0
  existeIdentiad: boolean = false

  colonia: string = ""


  filtroMunicipios: string = '';
  municipioNames: string[] = [];
  // myControl = new FormControl();
  selectedMunicipio!: any; // Aquí se almacenará el nombre del municipio seleccionado

  validarTelefono(event: KeyboardEvent) {
    if (this.telefono !== null) {
      const tecla = event.key;
      const longitudValor = this.telefono.length;
      if (longitudValor >= 15 && tecla !== 'Backspace') {
        event.preventDefault()
      }
      if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== 'Tab') {
        event.preventDefault();
      }
    }
  }

  validarIdentidad(event: KeyboardEvent) {
    const tecla = event.key

    if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== '-' && tecla !== 'Tab') {
      event.preventDefault()
    }
  }

  validarClave(event: KeyboardEvent) {
    const key = event.key;

    if (!/^[A-Za-z0-9.]$/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight' && key !== 'Tab') {
      event.preventDefault();
    }
  }


  ngOnInit(): void {
    this.traerUsuario()
    this.genListaTiposTelefono()
    this.genListaTiposCorreos()
    this.genListaTiposDirecciones()
    this.genListaMunicipios()
  }

  traerUsuario() {
    this.service.traerDatosUsuario().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.datos = JSON.parse(res)
      var data = this.datos[0]
      this.usuarioid = data.USUARIOID
      this.usuario = data.USUARIO

      this.identidad = data.IDENTIFICACION
      this.nombre = data.NOMBRE
      this.telefono = data.TELEFONO
      this.tipoTelefonoId = data.TELEFONOTIPOID
      this.email = data.CORREO
      this.tipoCorreoId = data.TIPOCORREOID
      this.direccion = data.DIRECCION
      this.tipoDireccionId = data.TIPODIRECCIONID
      this.municipioId = data.MUNICIPIOID
      this.colonia = data.COLONIA

      if (this.identidad !== null) {
        this.existeIdentiad = true
      }

      // console.log(data)
      // console.log(this.existeIdentiad)
      // console.log(this.identidad)
    })
  }

  genListaTiposTelefono() {
    this.service.getListaTiposTelefonos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.listaTiposTelefono = JSON.parse(res)
    })
  }

  genListaTiposCorreos() {
    this.service.getListaTiposCorreos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.listaTiposCorreos = JSON.parse(res)
    })
  }

  genListaTiposDirecciones() {
    this.service.getListaTiposDirecciones().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.listaTiposDirecciones = JSON.parse(res)
    })
  }

  genListaMunicipios() {
    this.service.getListaMunicipios().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.listaMunicipios = JSON.parse(res)
      console.log(JSON.parse(res))
    })
  }

  GuardarCambios() {

    // console.log(this.municipioId)
    // return
    if (this.phoneControl.invalid) {
      return
    }

    if (this.identidad == "" || this.nombre == "" || this.telefono == "" || this.tipoTelefonoId == 0 || this.tipoTelefonoId == undefined ||
        this.email == "" || this.tipoCorreoId == 0 || this.tipoCorreoId == undefined || this.direccion == "" ||
        this.tipoDireccionId == 0 || this.tipoDireccionId == undefined || this.municipioId == 0 || this.municipioId == undefined || this.colonia == "") {
      this.service.notificacion("Debe llenar todos los campos")
      return
    }

    console.log(this.usuarioid, this.identidad, this.nombre, this.telefono, this.tipoTelefonoId,
      this.email, this.tipoCorreoId, this.direccion, this.tipoDireccionId,
      this.municipioId, this.colonia)

    const identidad = this.identidad.replace(/-/g,"")

    this.service.Update(this.usuarioid, identidad, this.nombre, this.telefono, this.tipoTelefonoId,
      this.email, this.tipoCorreoId, this.direccion, this.tipoDireccionId,
      this.municipioId, this.colonia).subscribe(r => {
        var respuesta = this.auth.desencriptar(r.response)
        respuesta = JSON.parse(respuesta)
        respuesta = respuesta[0]
        if (respuesta.status == 1) {
          this.service.notificacion(respuesta.message)
          this.existeIdentiad = true
        } else {
          this.service.notificacion(respuesta.message)
        }
      })
  }

  CambiarClave() {
    if (this.passwordControl.invalid) {
      return
    }
    if (this.clave == "" || this.claveConfirm == "") {
      this.service.notificacion("Las claves no pueden estar vacias")
      return
    }
    if (this.clave != this.claveConfirm) {
      this.service.notificacion("Las contraseñas no coinciden")
      return
    }

    this.service.ChPass(this.usuario, this.clave).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.response)
      respuesta = JSON.parse(respuesta)
      respuesta = respuesta[0]

      if (respuesta.status == 1) {
        this.service.notificacion("Cambio de contraseña aplicado!")
        this.chPass = false
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  // filter(): void {
  //   const filterValue = this.input.nativeElement.value.toLowerCase();
  //   this.filteredOptions = this.listaMunicipios.filter(o => o.toLowerCase().includes(filterValue));
  // }

  // filter() {
  //   const filterValue = this.myControl.value!;
  //   this.filteredOptions = this.listaMunicipios.filter(option =>
  //     option.toLowerCase().includes(filterValue)
  //   );
  // }


  // municipioFilter(municipio: any): boolean {
  //   return municipio.MUNICIPIO.toLowerCase().includes(this.filtroMunicipios.toLowerCase());
  // }

  filter() {
    const filterValue = this.myControl.value!.toLowerCase();
    this.filteredOptions = this.listaMunicipios.filter(option =>
      option.MUNICIPIO.toLowerCase().includes(filterValue)
    );
  }


  onSearchChange() {
    this.filteredMunicipios = this.listaMunicipios.filter((municipio) =>
      municipio.MUNICIPIO.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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

}
