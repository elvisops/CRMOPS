import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ChatService } from './chat.service';
import { AuthService } from 'src/app/guards/auth/auth.service';
import { Chat } from './chat';
import { HttpClient } from '@angular/common/http';
import { IMqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() mensajes: EventEmitter<string>;


  ListaContactos: any[] = []
  ListaChats: any[] = []
  columnas: string[] = [];
  usuarioIdEmisor: number | null = 0
  usuarioIdReceptor: number | null = 0
  mensaje: string = ""
  selectedUserId: any;
  grupoChat: number = 0

  nombreArchivo: string | undefined = '';
  selectedFile: File | null = null;
  extencion: string | null = ''
  previsualizacion: string = ''

  isZoomed: boolean = false;
  imageCache: { [fileName: string]: string } = {};
  imagenAmpliadaIndex: number | null = null;

  mqttData: any;

  messages: string | null = null;

  emisor: number | null = 0
  recibidos: string | null = ""


  notificacion: string | null = localStorage.getItem('notificacion')

  prueba: string = ""

  idUsuarioOGrupo: string | null = ""
  esGrupo: number = 0
  // prueba: string = ''

  isLoading: boolean = false
  archivo: string = ""

  filtrar: string = ""

  listaMensajesFiltrados: any[] = []



  @ViewChild('chatContainer') chatContainer!: ElementRef;
  constructor(
    private service: ChatService,
    private auth: AuthService,
    private http: HttpClient,
    private elementRef: ElementRef
  ) {

    this.mensajes = new EventEmitter();
  }



  ngAfterViewInit() {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      this.chatContainer.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    }
  }


  onScroll() {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      const container = this.chatContainer.nativeElement;
      const atTop = container.scrollTop === 0;

      if (atTop) {
        // console.log('El scroll está en la parte superior');

        var primerMensaje = this.ListaChats[0]
        primerMensaje = primerMensaje.CHATID
        // console.log(primerMensaje)

        // Llamar a la función con los siguientes mensajes
        // console.log("getMensajes2: ",this.idUsuarioOGrupo, ' ', this.esGrupo, ' ', primerMensaje)
        this.service.getMasMensajes(this.idUsuarioOGrupo, this.esGrupo, primerMensaje).subscribe(r => {
          var res = this.auth.desencriptar(r.data);

          if (JSON.parse(res).length > 0) {
            const nuevosChats = JSON.parse(res);
            // console.log('Nuevos chats: ', nuevosChats);

            // mover el scroll
            container.scrollTop += container.scrollHeight * 0.005;

            // Concatenar los nuevos chats al principio de la lista existente
            this.ListaChats = nuevosChats.concat(this.ListaChats);


            // console.log('nuevos msj: ', this.ListaChats)
            // Opcional: Limitar la longitud de la lista, si es necesario
            // const maxLength = 1000; // Límite máximo de longitud de la lista
            // if (this.ListaChats.length > maxLength) {
            // this.ListaChats = this.ListaChats.slice(0);
            // }

            // console.log('Lista actualizada: ', this.ListaChats);
            this.traerArchivos()
          }


        });
      }
    }
  }


  ngOnInit(): void {

    this.genListaContactos();
    // this.genIdUsuario()
    this.usuarioIdEmisor = Number(this.auth.desencriptar(sessionStorage.getItem('usuarioID')).toString());

    this.eventListener()


    var not = localStorage.getItem('recibido')

    if (not != null) {
      // console.log('notificaciones: ', not)
      this.recibidos = not
    }

    // console.log(this.usuarioIdReceptor)
  }



  eventListener() {
    const eventSource = new EventSource('http://10.8.8.115:3004/events');
    eventSource.addEventListener('message', (event: any) => {
      // this.messages.push(event.data);
      // console.log(this.messages)
      const jsonData = JSON.parse(event.data)
      const dataContent = jsonData.data
      const resultado = this.auth.desencriptar(dataContent)
      // console.log("topic crmchat_RECIVE: ", resultado)

      var respuesta = JSON.parse(resultado)
      respuesta = respuesta[0]

      // console.log("respuesta: ", respuesta.status)

      if (respuesta.status == 1) {
        var dataResult = JSON.parse(respuesta.data)
        dataResult = dataResult[0]
        // console.log('data resulta: ', dataResult)

        var usuarioId = sessionStorage.getItem('usuarioID')
        usuarioId = this.auth.desencriptar(usuarioId)



        // if (dataResult.RECEPTOR == this.idUsuarioOGrupo) {


        this.prueba = dataResult.RECEPTOR
        dataResult["EMISOR"] = parseInt(dataResult.EMISOR);
        dataResult["RECEPTOR"] = parseInt(dataResult.RECEPTOR);

        if (dataResult.RECEPTOR == this.idUsuarioOGrupo) {
          this.ListaChats.push(dataResult);
        }
        // console.log('nuevos msj: ', this.ListaChats)

        // localStorage.setItem('mensaje', JSON.stringify(dataResult))

        // var notificacionStr = localStorage.getItem('mensaje')

        // if (notificacionStr != null) {
        //   // this.messages = JSON.parse(this.messages)
        //   // if (this.messages != null) {
        //   var notificacion: { emisor: number } = JSON.parse(notificacionStr)
        //   var emisor = notificacion.emisor
        //   // console.log('en el chat: ', emisor)
        //   this.emisor = emisor
        //   // this.messages = this.messages.emisor
        //   // }
        // }

        // guardar notificaciones de msj
        let arregloDatos: any[] = JSON.parse(localStorage.getItem('recibido') || '[]');

        // Agregar el nuevo valor de dataResult.emisor al arreglo si no existe previamente
        const nuevoValor = dataResult.RECEPTOR.toString();
        if (!arregloDatos.includes(nuevoValor)) {
          arregloDatos.push(nuevoValor);
        }



        // console.log("arreglo de datos modificado: ", arregloDatos)
        // Almacenar el arreglo actualizado en el localStorage
        localStorage.setItem('recibido', JSON.stringify(arregloDatos));


        var not = localStorage.getItem('recibido')

        if (not != null) {
          // console.log('notificaciones: ', not)
          this.recibidos = not
        }


        // console.log("Lista chats", this.ListaChats)
        // console.log("Recibidos: ", this.recibidos)
        this.traerArchivos()


        setTimeout(() => {
          if (this.chatContainer && this.chatContainer.nativeElement) {
            this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;

          }
        }, 0);
        // console.log("fin event source")
        // }

      }
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('mensaje')
  }

  // genIdUsuario(){
  //   this.service.getIdUsuario().subscribe(r => {
  //     var res = this.auth.desencriptar(r.data)
  //     res = JSON.parse(res)
  //     console.log(res)
  //   })
  // }

  genListaContactos() {
    this.service.getListaContactos().subscribe(r => {
      var res = this.auth.desencriptar(r.data)
      this.ListaContactos = JSON.parse(res)

      // Genera dinámicamente las columnas
      if (this.ListaContactos.length > 0) {
        this.columnas = Object.keys(this.ListaContactos[0]);
      }

      // res = JSON.parse(res)
      // console.log("lista contactos: ", this.ListaContactos)
    })
  }
  getPropiedades(objeto: any): string[] {
    // Devuelve las propiedades del objeto como un array de strings
    return Object.keys(objeto);
  }



  VerChat(IdUsuario_o_Grupo: string | null, esGrupo: number) {

    // console.log(this.usuarioIdReceptor)

    // this.eventListener()

    this.idUsuarioOGrupo = IdUsuario_o_Grupo
    this.esGrupo = esGrupo
    // console.log("IdUsuario_o_Grupo: ",IdUsuario_o_Grupo, " ","grupo: ", grupo)

    // if (IdUsuario_o_Grupo == this.emisor) {
    // this.emisor = 0
    // localStorage.removeItem('mensaje')




    // Obtener el arreglo actual del localStorage, si existe
    let arregloDatos: any[] = JSON.parse(localStorage.getItem('recibido') || '[]');

    // Supongamos que deseas quitar el elemento que tiene el valor 'elementoAQuitar'
    const elementoAQuitar = IdUsuario_o_Grupo;

    // Filtrar el arreglo para excluir el elemento que deseas quitar
    arregloDatos = arregloDatos.filter(elemento => elemento != elementoAQuitar);

    // Almacenar el arreglo actualizado en el localStorage
    localStorage.removeItem('recibido')
    localStorage.setItem('recibido', JSON.stringify(arregloDatos));

    // console.log('chats recibidos: ', arregloDatos)
    this.recibidos = localStorage.getItem('recibido')



    // console.log('datos recibidos',this.recibidos?.toString())
    // if (this.recibidos?.toString() != "[]") {
    if (this.recibidos?.toString() == "[]") {
      // cambio el valor de la notificaicon para la campanita
      // this.service.setdatos('0')
      localStorage.removeItem('notificacion')

      // mando la señal de que no existen notificaciones ya 
      // this.service.setdatos('1')

      // console.log('no existen notificacioens')
    }

    this.selectedUserId = IdUsuario_o_Grupo;
    this.usuarioIdReceptor = Number(IdUsuario_o_Grupo);
    this.grupoChat = esGrupo;

    // console.log(IdUsuario_o_Grupo, esGrupo);
    this.service.getMensajes(IdUsuario_o_Grupo, esGrupo).subscribe(r => {
      var res = this.auth.desencriptar(r.data);
      this.ListaChats = JSON.parse(res);
      // console.log('primeros: ',this.ListaChats)
      // console.log('lista chats: ', this.ListaChats);

      setTimeout(() => {
        if (this.chatContainer && this.chatContainer.nativeElement) {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
      }, 0);

      // console.log('lista de chats: ', this.ListaChats)
      this.traerArchivos()


    });
  }


  traerArchivos() {
    this.ListaChats.forEach(chat => {
      if (this.esImagenValida(chat.TIPO_ARCHIVO)) {
        chat.imagenUrl = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${chat.ARCHIVO}`;
      }
    });
    // Llama a la función dentro del forEach para validar cada archivo
    this.ListaChats.forEach(chat => {
      if (this.esDocumentoValido(chat.TIPO_ARCHIVO)) {
        chat.documento = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${chat.ARCHIVO}`;
      }
    });

    // console.log(this.ListaChats)
  }


  // Define una función para validar la extensión de la imagen
  esImagenValida(archivo: string): boolean {
    // Extensiones de imágenes permitidas
    const extensionesPermitidas = ['png', 'jpg', 'jpeg'];

    // Obtiene la extensión del archivo
    const extension = archivo.split('.').pop()?.toLowerCase(); // Obtiene la última parte del nombre del archivo como extensión

    // Valida si la extensión está permitida
    if (extension && extensionesPermitidas.includes(extension)) {
      return true;
    } else {
      return false;
    }
  }



  // Define una función para validar la extensión del archivo
  esDocumentoValido(archivo: string): boolean {
    // Extensiones de documentos permitidas
    const extensionesPermitidas = ['docx', 'pdf', 'xls', 'xlsx', 'txt'];

    // Obtiene la extensión del archivo
    const extension = archivo.split('.').pop()?.toLowerCase(); // Obtiene la última parte del nombre del archivo como extensión

    // Valida si la extensión está permitida
    if (extension && extensionesPermitidas.includes(extension)) {
      return true;
    } else {
      return false;
    }
  }




  EnviarMensaje() {

    // this.mensajes.emit("Gaaaaaa Este es el mensaje");


    // if(this.selectedFile == null){
    //   this.service.notificacion("No ay archivo")
    // }

    // console.log(this.selectedFile)
    // return

    // console.log(this.usuarioIdEmisor)


    if (this.mensaje == "" && this.selectedFile == null) {
      return
    }

    if (this.usuarioIdReceptor == 0) {
      this.service.notificacion("Debe seleccionar una conversación para enviar el mensaje")
      return
    }

    if (this.mensaje.length > 1000) {
      this.service.notificacion("El mensaje no puede contener mas de 1000 caracteres.")
      return
    }
    // console.log(this.mensaje)
    if (this.mensaje == "" && this.selectedFile != undefined) {
      // this.mensaje = this.selectedFile?.name

      this.nombreArchivo = this.selectedFile?.name

      // this.nombreArchivo = this.mensaje.replace(' ','')
      // const ext = this.selectedFile.name.split('.').pop()
      // this.nombreArchivo = this.nombreArchivo + '.' +ext
    }


    if (this.selectedFile != null) {

      if (this.selectedFile) {
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'docx', 'pdf', 'xls', 'xlsx', 'txt'];
        const fileNameParts = this.selectedFile.name.split('.');
        const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          this.service.notificacion('El archivo seleccionado no es una imagen ni un documento válido.');
          this.mensaje = ""
          this.selectedFile = null
          this.nombreArchivo = ""
          this.extencion = ""
          return

          // Aquí puedes agregar código para manejar el caso en que el archivo no sea válido
        }
      }

      const extencion = this.selectedFile.name.split('.').pop()
      if (extencion) {
        this.extencion = extencion
        // console.log(this.extencion)
      }

      // se asigna un nombre al archivo apartir de la fecha actual
      this.archivo = Date.now().toString() + '.' + this.extencion

      // console.log('archivo: ', this.archivo)


    }

    this.isLoading = true
    // console.log("enviar mensaje")

    this.mensaje = this.mensaje.replace(/\n/g, '\r\n')
    // console.log(this.mensaje)
    this.service.enviarMensaje(this.usuarioIdEmisor, this.usuarioIdReceptor, this.mensaje, this.extencion, this.archivo, this.nombreArchivo).subscribe(r => {
      var respuesta = (r)
      // respuesta = JSON.parse(respuesta)
      // console.log("respuesta al enviar el mensaje: ", respuesta)
      // respuesta = respuesta[0]

      if (respuesta.success) {

        //guardar la imagen
        if (this.selectedFile != null) {
          const formData = new FormData();

          // formData.append('image', this.selectedFile, this.mensaje);

          const nombreArchivoSinEspacios = this.selectedFile.name.replace(/\s+/g, '');

          formData.append('image', this.selectedFile, this.archivo);


          this.http.post<any>(`http://10.8.8.115:3002/upload/${this.usuarioIdReceptor}`, formData).subscribe(
            (response) => {
              // console.log('Imagen subida con éxito');
            },
            (error) => {
              console.error('Error al subir la imagen:', error);
            }
          );
        }

        // console.log("lista chats: ", this.ListaChats)
        // // console.log("usuario Receptor: ",this.usuarioIdReceptor)
        // // console.log("Lista chats: ", this.ListaChats)
        // // this.traerArchivos()

        // this.ListaChats.forEach(chat => {
        //   console.log("Tipo Archivo: ", chat.TIPO_ARCHIVO)
        //   if (this.esImagenValida(chat.TIPO_ARCHIVO)) {
        //     chat.imagenUrl = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${chat.NOMBRE_ARCHIVO}`;
        //     console.log(`http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${chat.NOMBRE_ARCHIVO}`)
        //     // this.prueba = 'string'
        //   }else{
        //     console.log("no es una imagen")
        //   }
        // });

        // console.log("Lista chats con la url: ", this.ListaChats)
        // Llama a la función dentro del forEach para validar cada archivo
        // this.ListaChats.forEach(chat => {
        //   if (this.esDocumentoValido(chat.TIPO_ARCHIVO)) {
        //     chat.documento = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${chat.NOMBRE_ARCHIVO}`;
        //   }
        // });

        this.mensaje = ""
        this.selectedFile = null
        this.nombreArchivo = ""
        this.extencion = ""



        this.isLoading = false

        // this.VerChat(String(this.usuarioIdReceptor), this.grupoChat)
        // logica para guardar la imagen si existe

        // this.scrollChatContainerDown();
      } else {
        this.service.notificacion(respuesta.message)
      }
    })
  }

  traerArchivo(nombre: any) {
    // nombre = nombre.replace(/\s+/g, '');
    // console.log(nombre)
    this.previsualizacion = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${nombre}`
  }

  // traerArchivo(nombre: any) {
  //   const nombreSinEspacios = nombre.replace(' ','')
  //   console.log('nombre: ',nombreSinEspacios)
  //   // nombre = nombre.replace(' ','')
  //   this.previsualizacion = `http://10.8.8.115:3002/image/${this.usuarioIdReceptor}/${nombreSinEspacios}`
  // }


  // zoomImage(event: any) {
  //   this.isZoomed = !this.isZoomed;
  // }

  zoomImage(event: any, index: number) {
    this.isZoomed = !this.isZoomed;
    if (this.isZoomed) {
      this.imagenAmpliadaIndex = index;
    } else {
      this.imagenAmpliadaIndex = null;
    }
  }


  //   descargarImagen() {
  //     // Crear un enlace temporal
  //     const enlace = document.createElement('a');
  //     enlace.href = this.previsualizacion; // Asignar la URL de la imagen
  //     enlace.target = '_blank'; // Abrir el enlace en una nueva ventana
  //     enlace.download = 'imagen'; // Nombre de archivo para la descarga
  //     enlace.click(); // Hacer clic en el enlace para iniciar la descarga
  // }
  // descargarImagen() {
  //   setTimeout(() => {
  //       // Crear un enlace temporal
  //       const enlace = document.createElement('a');
  //       enlace.href = this.previsualizacion; // Asignar la URL de la imagen
  //       enlace.target = '_blank'; // Abrir el enlace en una nueva ventana
  //       enlace.download = 'imagen'; // Nombre de archivo para la descarga
  //       enlace.click(); // Hacer clic en el enlace para iniciar la descarga
  //   }, 100); // Retraso de 100 milisegundos
  // }

  descargarDocumento(nombreArchivo: string, nombre: string) {

    // console.log('nombre archivo: ', nombreArchivo, ' nombre: ', nombre)
    const url = nombreArchivo; // URL de la imagen
    // const nombreArchivo = 'imagen.jpg'; // Nombre del archivo de imagen

    // Realizar solicitud GET para obtener la imagen como un blob
    // console.log(url)
    this.http.get(url, { responseType: 'blob' }).subscribe((imagenBlob: Blob) => {
      // Crear un enlace temporal para la descarga
      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = URL.createObjectURL(imagenBlob); // Asignar la URL del blob
      enlaceDescarga.download = nombre; // Nombre del archivo para la descarga

      // Simular un clic en el enlace para iniciar la descarga
      enlaceDescarga.dispatchEvent(new MouseEvent('click'));

      // Limpiar el enlace
      URL.revokeObjectURL(enlaceDescarga.href);
    });
  }

  // descargarDocumento(nombreArchivo: string) {
  //   // const enlace = document.createElement('a')
  //   // enlace.download = nombreArchivo
  //   window.open(nombreArchivo, '_blank');
  // }

  buscarEnChat(){
    // console.log("Buscar en el chat con id: ", this.usuarioIdReceptor, ' la palabra: ', this.filtrar)

    if (this.filtrar == '') {
      return
    }

    if (this.filtrar.length < 4) {
      this.service.notificacion('Debe ingresar al menos 4 caracteres')
      return
    }
    
    this.service.filtrarEnChat(this.usuarioIdReceptor,this.filtrar).subscribe(r => {
      var respuesta = this.auth.desencriptar(r.data)
      const nuevosChats = JSON.parse(respuesta);
      // this.listaMensajesFiltrados = JSON.parse(respuesta)

      // console.log(nuevosChats)

      if (nuevosChats.length == 0) {
        this.service.notificacion('No ay resultados para la búsqueda')
      }else{
        this.ListaChats = this.ListaChats.concat(nuevosChats)
        setTimeout(() => {
          if (this.chatContainer && this.chatContainer.nativeElement) {
            const element = this.chatContainer.nativeElement;
            element.scrollTop = element.scrollHeight;
          }
        }, 1);
        this.traerArchivos()
      }


      // this.ListaChats = nuevosChats.concat(this.ListaChats);

      // this.ListaChats = nuevosChats.concat(this.ListaChats)
      

      // const nuevosChats = JSON.parse(res);
      //       // console.log('Nuevos chats: ', nuevosChats);

      //       // mover el scroll
      //       container.scrollTop += container.scrollHeight * 0.15;

      //       // Concatenar los nuevos chats al principio de la lista existente
      //       this.ListaChats = nuevosChats.concat(this.ListaChats);
    })
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];

    this.nombreArchivo = this.selectedFile?.name
    // this.previewSelectedImage();
  }

  //   onFileSelected(event:any) {

  //     const file:File = event.target.files[0];

  //     if (file) {

  //         this.fileName = file.name;

  //         const formData = new FormData();

  //         formData.append("thumbnail", file);

  //         const upload$ = this.http.post("/api/thumbnail-upload", formData);

  //         upload$.subscribe();
  //     }
  // }
  scrollChatContainerDown() {
    // if (this.chatContainer) {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    // }
  }

  public shouldShowDateSeparator(currentIndex: number): boolean {
    if (currentIndex === 0) {
      return true; // Si es el primer mensaje, siempre mostrar la fecha
    }

    const currentMessageDate = new Date(this.ListaChats[currentIndex].CREACION);
    const previousMessageDate = new Date(this.ListaChats[currentIndex - 1].CREACION);

    // Comparar las fechas sin incluir la hora
    return currentMessageDate.toDateString() !== previousMessageDate.toDateString();
  }

}
