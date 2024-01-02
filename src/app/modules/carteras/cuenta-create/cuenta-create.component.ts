import { Component, OnInit } from '@angular/core';
import { CuentaCreateService } from './cuenta-create.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-cuenta-create',
  templateUrl: './cuenta-create.component.html',
  styleUrls: ['./cuenta-create.component.css']
})
export class CuentaCreateComponent implements OnInit {


  nombre: string = "";
  identidad: string = "";
  nivelBuro: number = 0;
  distribuidor: number = 0;
  numeroCliente: string = "";
  confirmacion: number = 0;
  refLaboral: string = "";
  telRefLaboral: string = "";
  resultadoRefLaboral: number = 0;
  refPersonal: string = "";
  telRefPersonal: string = "";
  resultadoRefPersonal: number = 0;
  refFamiliar: string = "";
  telRefFamiliar: string = "";
  resultadoRefFamiliar: number = 0;
  cambioReferencia: boolean = false
  estadoValidacion: number = 0;
  comentario: string = "";
  numeroOrden: string = "";

  listaNivelBuro: any[] = []



  listaDistribuidor: any[] = []



  listaConfirmacion: any[] = []

  listaEstadoValidacion: any[] = []

  carteraID: number = 0

  //tiempo de pantalla
  contador: number = 0
  timerSubscription!: Subscription;
  tiempoTranscurridoSegundos: number = 0;
  flagTimer: boolean = false

  searchTerm!: string;  


  constructor(
    private service: CuentaCreateService,
    private auth: AuthService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }


  // ngOnInit(): void {
  //   this.router.queryParams.subscribe(params => {
  //     this.carteraID = params['carteraID']
  //   })
  //   this.genListaBuro()
  //   this.genListaDistribuidores()
  //   this.genListaConfirmacion()
  //   this.genListaEstadoValidacion()

  //   //tiempo pantalla
  //   // this.genTiempoPantalla()

  //   // setInterval(() => {
  //   var estadoOperativo = sessionStorage.getItem('EstadoOperativo')
  //   var valestadoOperativo = this.auth.desencriptar(estadoOperativo)
  //   console.log(estadoOperativo)
  //   console.log(valestadoOperativo)

  //   if (!estadoOperativo || valestadoOperativo == 3) {
  //     // this.startTimer()
  //     this.genTiempoPantalla()
  //     const contadorGuardado = localStorage.getItem('contador');
  //     if (contadorGuardado !== null) {
  //       this.contador = parseInt(contadorGuardado, 10);
  //       // this.startTimer();
  //     }
  //   }
  //   // }, 1000);

  // }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.carteraID = params['carteraID']
    });
  
    // console.log(this.carteraID)
    this.genListaBuro();
    this.genListaDistribuidores();
    this.genListaConfirmacion();
    this.genListaEstadoValidacion();
  
    var estadoOperativo = sessionStorage.getItem('EstadoOperativo');
    var valestadoOperativo = this.auth.desencriptar(estadoOperativo);
  
    if (!estadoOperativo || valestadoOperativo == 3) {
      this.genTiempoPantalla();
      const contadorGuardado = localStorage.getItem('contador');
      if (contadorGuardado !== null) {
        this.contador = parseInt(contadorGuardado, 10);
      }
    }
  
    // Intervalo para validar cada segundo
    // interval(1000).subscribe(() => {
    //   var estadoOperativo = sessionStorage.getItem('EstadoOperativo');
    //   var valestadoOperativo = this.auth.desencriptar(estadoOperativo);
    //   if ((this.contador === 0 || this.contador === null) && valestadoOperativo == 3) {
    //     // Realizar la acción que necesitas cuando el temporizador está en 0 y valestadoOperativo es igual a 3
    //     console.log('Temporizador en 0 y valestadoOperativo igual a 3');
    //     this.startTimer()
    //   }
    // });
  }

  genTiempoPantalla() {
    const tiempoAlmacenado = localStorage.getItem('tiempoPantalla');

    if (tiempoAlmacenado !== null) {
      this.contador = parseInt(tiempoAlmacenado, 10); //de cadena a numero entero
      this.startTimer();
    } else {
      this.service.getTiempoPantalla(this.carteraID, 'BUSCAR').subscribe(r => {
        var respuesta = this.auth.desencriptar(r.data);
        respuesta = JSON.parse(respuesta);
        console.log(respuesta);

        if (respuesta.length > 0 && respuesta[0].TIEMPOSEGUNDOS) {
          this.contador = respuesta[0].TIEMPOSEGUNDOS;
          localStorage.setItem('tiempoPantalla', this.contador.toString());
          this.startTimer();
        }
      });
    }
  }

  startTimer() {
    this.flagTimer = true
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.contador > 0) {
        this.contador--;
        localStorage.setItem('contador', this.contador.toString());
        console.log('Tiempo transcurrido:', this.contador);
      } else {
        this.timerSubscription.unsubscribe();
        localStorage.removeItem('contador'); // Elimina el contador del almacenamiento local al finalizar
        console.log('Temporizador finalizado');
        window.location.reload()
        // this.service.GuadarGestionATCTimeOut(this.carteraID,this.cuentaID).subscribe(r => {
        //   var respuesta = this.auth.desencriptar(r.response)
        //   respuesta = JSON.parse(respuesta)
        //   console.log(respuesta)
        // })
      }
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    localStorage.removeItem('tiempoPantalla');
    localStorage.removeItem('contador');
  }


  genListaBuro() {
    this.service.getListaBuro().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaNivelBuro = JSON.parse(data)
      console.log(this.listaNivelBuro)
    })
  }

  genListaDistribuidores() {
    this.service.getListaDistribuidores().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaDistribuidor = JSON.parse(data)
      console.log(this.listaDistribuidor)
    })
  }

  genListaConfirmacion() {
    this.service.getListaConfirmacion().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaConfirmacion = JSON.parse(data)
      console.log(this.listaConfirmacion)
    })
  }

  genListaEstadoValidacion() {
    this.service.getListaEstadoValidacion().subscribe(r => {
      var data = this.auth.desencriptar(r.data)
      this.listaEstadoValidacion = JSON.parse(data)
      console.log(this.listaEstadoValidacion)
    })
  }

  EnviarDatos() {


    var cambioref = 0;
    if (this.cambioReferencia == true) {
      cambioref = 1;
    } else {
      cambioref = 0;
    }

    // || this.nivelBuro == 0 || this.distribuidor == 0 ||
    if (this.nombre == "" || this.identidad == "" || this.numeroCliente == "" ||
      this.refLaboral == "" || this.telRefLaboral == "" || this.refPersonal == "" || this.telRefPersonal == "" ||
      this.refFamiliar == "" || this.telRefFamiliar == "" || this.numeroOrden == "") {
      this.service.notificacion("Los campos con asteriscos son obligatorios")
      return
    }


    if (this.confirmacion === undefined) {
      this.confirmacion = 0
    }

    if (this.resultadoRefLaboral === undefined) {
      this.resultadoRefLaboral = 0
    }

    if (this.resultadoRefPersonal === undefined) {
      this.resultadoRefPersonal = 0
    }

    if (this.resultadoRefFamiliar === undefined) {
      this.resultadoRefFamiliar = 0
    }

    // const identidad = this.identidad.replace(/-/g, "")
    // const identidad = this.identidad.replace(/[^0-9]/g, "");
    const identidad = this.identidad.replace(/[ -]/g, "");
    // console.log(identidad)
    // return
    const numeroCliente = this.numeroCliente.replace(/[^0-9]/g,"")
    // console.log(numeroCliente)
    // return
    
    // console.log(identidad)
    // return
    this.nombre = this.nombre.toUpperCase()

    this.service.insertCliente(this.nombre,
      identidad,
      this.nivelBuro,
      this.distribuidor,
      numeroCliente,
      this.confirmacion,
      this.refLaboral,
      this.telRefLaboral,
      this.resultadoRefLaboral,
      this.refPersonal,
      this.telRefPersonal,
      this.resultadoRefPersonal,
      this.refFamiliar,
      this.telRefFamiliar,
      this.resultadoRefFamiliar,
      cambioref,
      this.estadoValidacion,
      this.numeroOrden,
      this.comentario,
      this.carteraID).subscribe(r => {
        var respuesta = this.auth.desencriptar(r.response)
        respuesta = JSON.parse(respuesta)
        respuesta = respuesta[0]
        console.log(respuesta)
        if (respuesta.status == 1) {
          this.service.notificacion(respuesta.message)
          this.limpiarInputs()
          const cuentaID = respuesta.data
          // console.log(respuesta.data)
          this.route.navigate(['carteras/atencion_cliente'], { queryParams: { cuentaID: cuentaID,carteraID: this.carteraID } })
        } else {
          this.service.notificacion(respuesta.message)
        }
      })
  }

  validarTelefono(event: KeyboardEvent) {
    if (this.numeroCliente !== null) {
      const tecla = event.key;
      const longitudValor = this.numeroCliente.length;
      if (longitudValor >= 15 && tecla !== 'Backspace') {
        event.preventDefault()
      }
      // if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== 'Tab') {
      //   event.preventDefault();
      // }

      if (!/^\d$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'ArrowRight' && tecla !== 'Tab' && !(event.ctrlKey && (tecla === 'c' || tecla === 'v'))) {
        event.preventDefault();
      }
    }
  }

  // validarIdentidad(event: KeyboardEvent) {
  //   if (this.identidad !== null) {
  //     const tecla = event.key;
  //     const longitudValor = this.identidad.length;
  //     if (longitudValor >= 20 && tecla !== 'Backspace') {
  //       event.preventDefault()
  //     }

  //     if (!/^-?\d*$/.test(tecla) && tecla !== 'Backspace' && tecla !== 'ArrowLeft' && tecla !== 'Tab' && !(event.ctrlKey && (tecla === 'c' || tecla === 'v'))) {
  //       event.preventDefault();
  //     }
  //   }
  // }
  validarIdentidad(event: KeyboardEvent) {
    if (this.identidad !== null) {
      const tecla = event.key;
      const longitudValor = this.identidad.length;
  
      if (longitudValor >= 20 && tecla !== 'Backspace') {
        event.preventDefault();
      }
  
      if (!/^[0-9-]*$/.test(tecla) && tecla !== 'Backspace') {
        event.preventDefault();
      }
    }
  }
  

  limpiarInputs() {
    this.nombre = "",
      this.identidad = "",
      this.nivelBuro = 0,
      this.distribuidor = 0,
      this.numeroCliente = "",
      this.confirmacion = 0,
      this.refLaboral = "",
      this.telRefLaboral = "",
      this.resultadoRefLaboral = 0,
      this.refPersonal = "",
      this.telRefPersonal = "",
      this.resultadoRefPersonal = 0,
      this.refFamiliar = "",
      this.telRefFamiliar = "",
      this.resultadoRefFamiliar = 0,
      this.cambioReferencia = false,
      this.estadoValidacion = 0,
      this.comentario = "",
      this.carteraID
  }

  goBack() {
    this.route.navigate(['carteras/carteras_listas'])
    // window.history.back();
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


















