import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  @ViewChild('textoBuscado') textoBuscado!: ElementRef<HTMLInputElement>;
  constructor(private _gifsService: GifsService) {}
  // De esta forma muestro el valor del input en el HTML
  /* valor = '';
  buscar() {
    this.valor = this.textoBuscado.nativeElement.value;
    console.log(this.valor);
    this.textoBuscado.nativeElement.value = '';
  } */

  buscar() {
    const valor = this.textoBuscado.nativeElement.value;
    console.log(valor);
    this._gifsService.buscarGifs(valor);
    this.textoBuscado.nativeElement.value = '';
  }
}
