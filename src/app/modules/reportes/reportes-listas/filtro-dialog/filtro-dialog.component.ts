import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro-dialog',
  templateUrl: './filtro-dialog.component.html',
  styleUrls: ['./filtro-dialog.component.css']
})
export class FiltroDialogComponent {


  fechaInicio!: Date | null
  fechaFin!: Date | null
}
