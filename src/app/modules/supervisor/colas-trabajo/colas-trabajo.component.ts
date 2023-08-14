import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { SupervisorService } from '../supervisor.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-colas-trabajo',
  templateUrl: './colas-trabajo.component.html',
  styleUrls: ['./colas-trabajo.component.css']
})
export class ColasTrabajoComponent {
  constructor(
    private service: SupervisorService,
    private auth: AuthService,
    private http: HttpClient
  ){}

  data!: any[] 
  readonly: boolean = false

  // usuario!: string;

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     // Verificar si el archivo es de tipo Excel
  //     if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  //       // Aquí puedes realizar las acciones que necesites con el archivo Excel
  //       console.log('Archivo Excel seleccionado:', file.name);
  //     } else {
  //       // Mostrar un mensaje de error si el archivo no es de tipo Excel
  //       console.error('Por favor, selecciona un archivo Excel válido.');
  //     }
  //   }
  // }

  ExcelFile(event: any){
    const file: File = event.target.files[0];

    if (file) {
      // Leer el archivo .xlsx
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer: any = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        // const data: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        this.data = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        console.log(this.data)
        // Enviar el archivo a Node-RED
        // return
       
      };
      fileReader.readAsArrayBuffer(file);
    }
  }

  GenColaTrabajo(){
    if (!this.data) {
      this.service.notificacion("Debe seleccionar un archivo excel")
      return
    }

    this.service.GuardarColaTrabajo(this.data).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      respuesta = JSON.parse(respuesta)
      // respuesta = respuesta[0]
      // console.log(respuesta)
      // return
      if (respuesta.status == 1) {
        this.service.notificacion(respuesta.message)
        this.readonly = true
      }else{
        this.service.notificacion("Ocurrio un error al generar la cola de trabajo")
      }
    })
  }

  GetFormato(){
    
    const url = 'http://10.8.8.115/FORMATO/CRMOPS/colasTrabajo.xlsx';
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Tipo MIME para archivos de Excel
      const urlArchivo = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlArchivo;
      link.download = 'nombre_del_archivo.xlsx'; // Reemplaza 'nombre_del_archivo' con el nombre que desees para el archivo
      link.click();
      window.URL.revokeObjectURL(urlArchivo);
    });
    
  }


  convertirFechaSerial(serial: number) {
    // Convertir la fecha serial en una fecha JavaScript válida
    const baseDate = new Date('1899-12-30'); // Fecha base de Excel
    const fecha = new Date(baseDate.getTime() + (serial - 1) * 86400000); // Multiplicar por el número de milisegundos en un día
    return fecha;
  }
}
