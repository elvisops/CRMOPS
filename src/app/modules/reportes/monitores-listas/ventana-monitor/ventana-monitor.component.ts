import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MonitoresListasService } from '../monitores-listas.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ScaleLinear, ScalePoint, ScaleTime } from 'd3-scale'
import { ModalConfirmacionComponent } from '../../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-ventana-monitor',
  templateUrl: './ventana-monitor.component.html',
  styleUrls: ['./ventana-monitor.component.css']
})
export class VentanaMonitorComponent implements OnInit {
  monitorID: number = 0
  graficoID: number = 0
  datos: any = []
  nuevaVentana: string | any = ""

  encabezados: string[] = []

  // graficos
  single!: any[];
  // multi!: any[];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // fin graficos
  constructor(
    private service: MonitoresListasService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: ActivatedRoute,


  ) {
    // Object.assign(this, { multi })
  }

  //data
  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];
  //  multi = [
  //     {
  //       "name": "Germany",
  //       "series": [
  //         {
  //           "name": "2010",
  //           "value": 7300000
  //         },
  //         {
  //           "name": "2011",
  //           "value": 8940000
  //         }
  //       ]
  //     },

  //     {
  //       "name": "USA",
  //       "series": [
  //         {
  //           "name": "2010",
  //           "value": 7870000
  //         },
  //         {
  //           "name": "2011",
  //           "value": 8270000
  //         }
  //       ]
  //     },

  //     {
  //       "name": "France",
  //       "series": [
  //         {
  //           "name": "2010",
  //           "value": 5000002
  //         },
  //         {
  //           "name": "2011",
  //           "value": 5800000
  //         }
  //       ]
  //     }
  //   ];

  // onSelect(event) {
  //   console.log(event);
  // }



  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.monitorID = params['monitorID'],
        this.graficoID = params['grafico']
    })
    this.abrirPopup()
  }

  // eventos graficos
  onSelect(event: any) {
    console.log(event);
  }
  // fin eventos graficos

  abrirPopup() {
    // Crea el contenido inicial de la ventana emergente si es la primera vez que se abre
    // if (!this.nuevaVentana || this.nuevaVentana.closed) {
    // this.nuevaVentana.document.write(`
    //         <!DOCTYPE html>
    //         <html lang="en">
    //         <head>
    //           <meta charset="UTF-8">
    //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //           <title>Reporte de Monitores</title>
    //           <style>
    //           </style>
    //         </head>
    //         <body>
    //           <h1>Reporte de Monitores</h1>
    //           <table class="table">
    //             <thead>
    //               <tr>
    //                 <th>FECHA INICIO</th>
    //                 <th>ESTADOOPERATIVOID</th>
    //                 <th>ESTADOOPERATIVO</th>
    //                 <th>USUARIO</th>
    //                 <th>CARTERA</th>
    //               </tr>
    //             </thead>
    //             <tbody id="tabla-body">
    //               <!-- Los datos serán insertados aquí dinámicamente -->
    //             </tbody>
    //           </table>
    //         </body>
    //         </html>
    //        `);
    // }

    // Configura una actualización periódica de la tabla cada minuto
    const refreshInterval = 2000; // 60000 milisegundos = 1 minuto
    let intervalId: any; // Variable para almacenar el ID del intervalo

    const refreshTable = () => {
      // Llama a la función genDatos para obtener datos actualizados
      // this.genDatos(this.monitorID);
      this.genDatos(this.monitorID);
    };

    // Llamar a refreshTable inicialmente
    refreshTable();

    // Configurar una actualización periódica de la tabla y almacenar el ID del intervalo
    intervalId = setInterval(refreshTable, refreshInterval);

    // Agregar un evento beforeunload para detectar el cierre de la ventana emergente
    if (this.nuevaVentana) {
      this.nuevaVentana.addEventListener('beforeunload', () => {
        // Detener el intervalo cuando la ventana se está cerrando
        clearInterval(intervalId);
      });
    }
  }

  genDatos(MONITORID: any, fechaInicio: any = "", fechaFin: any = "") {
    this.service.getDatos(MONITORID, fechaInicio, fechaFin).subscribe(r => {
      var data = this.auth.desencriptar(r.data);
      this.datos = JSON.parse(data);
      //dar formato para el grafico
      const resultadoFormateado = this.datos.map((item: any) => ({
        "name": item.DESCRIPCION,
        "value": item.VALOR
      }))

      this.encabezados = Object.keys(this.datos[0])
      console.log(this.encabezados)
      this.single = resultadoFormateado;
      console.log(this.datos);

      // // Actualiza la tabla en la ventana emergente con los datos obtenidos
      // const tablaBody = this.nuevaVentana.document.getElementById('tabla-body');
      // if (tablaBody) {
      //   tablaBody.innerHTML = '';

      //   this.datos.forEach((item: any) => {
      //     const fila = this.nuevaVentana.document.createElement('tr');
      //     for (const prop in item) {
      //       const celda = this.nuevaVentana.document.createElement('td');
      //       celda.textContent = item[prop];
      //       fila.appendChild(celda);
      //     }
      //     if (tablaBody) {
      //       tablaBody.appendChild(fila);
      //     }
      //   });
      // }
    });
  }

  DesloguearUsuario(usuarioID: number) {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '400px',
      data: `¿Está seguro que desea desloguear al asesor?`
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.Desloguear(usuarioID).subscribe(r => {
          var respuesta = this.auth.desencriptar(r.response)
          respuesta = JSON.parse(respuesta)
          respuesta = respuesta[0]
          console.log(respuesta)
          if (respuesta.status == 1) {
            this.service.notificacion(respuesta.message)
          } else {
            this.service.notificacion(respuesta.message)
          }
        })
      }
    })
  }

  QuitarPausaUsuario(usuarioID: number, estadoOperativo: string) {
    if (estadoOperativo != 'LISTO') {
      const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
        width: '400px',
        data: `¿Está seguro que desea quitar la pausa del gestor?`
      })

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.quitarPausa(usuarioID).subscribe(r => {
            var respuesta = this.auth.desencriptar(r.response)
            respuesta = JSON.parse(respuesta)
            respuesta = respuesta[0]
            if (respuesta.status == 1) {
              this.service.notificacion(respuesta.message)
            } else {
              this.service.notificacion(respuesta.message)
            }
          })
        }
      })
    }
  }

  // isColumnRed(columnName: string): boolean {
  //   // Verifica si el nombre de la columna es 'ESTADO OPERATIVO'
  //   // y si el valor en esa columna no es 'LISTO'
  //   return columnName === 'ESTADO OPERATIVO' && this.datos.some((item: any) => item[columnName] !== 'LISTO');
  // }

}
