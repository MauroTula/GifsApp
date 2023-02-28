import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private _gifsService: GifsService) {}

  ngOnInit(): void {}

  get itemHistorial() {
    return this._gifsService.historial;
  }

  buscar(termino: string) {
    //console.log(termino);
    this._gifsService.buscarGifs(termino);
  }
}
