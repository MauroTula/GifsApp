import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '0gtKYQGdzJsX73qEpC4fZyzno0KnR4nQ';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    //imprime lo que se grabó en local storage. Si se borra el localstorage devuelve un arreglo vacio
    this._historial = JSON.parse(localStorage.getItem('historialLocal')) || [];
    this.resultados =
      JSON.parse(localStorage.getItem('historialLocalImagenes')) || [];
  }

  get historial() {
    // esta con corchetes y 3 puntos porque si se le hace una modificacion a historial() se puede modificar el arreglo original _historial, entonces con los corchetes y 3 puntitos rompe esa referencia y hace un arreglo nuevo
    return [...this._historial];
  }

  buscarGifs(val: string) {
    // esto hace que siempre se imprima en miuscula, el trim quita los espacios
    val = val.trim().toLowerCase();
    //este if no permite que se agreguen campos vacios, el trim quita los espacios
    if (val.trim().length === 0) {
      return;
    }
    // esta condicion indica que si NO ( ! ) incluye el valor de busqueda que lo inserte
    if (!this._historial.includes(val)) {
      // agrega un nuevo item al principio del array
      this._historial.unshift(val);
      //solo se permite tener 10 items, el splice lo corta en 10
      this._historial = this._historial.splice(0, 9);
      // Se graba en local storage JSON.stringify
      localStorage.setItem('historialLocal', JSON.stringify(this._historial));
    }
    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '100')
      .set('q', val);

    //console.log(params.toString());

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem(
          'historialLocalImagenes',
          JSON.stringify(this.resultados)
        );
      });

    //Fetch con function

    /* fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=0gtKYQGdzJsX73qEpC4fZyzno0KnR4nQ&q=transformers&limit=50'
    ).then(function (resp) {
      resp.json().then(function (data) {
        console.log(data);
      });
    }); */

    //Fetch con arrow function

    /* fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=0gtKYQGdzJsX73qEpC4fZyzno0KnR4nQ&q=transformers&limit=50'
      ).then((resp) => {
        resp.json().then((data) => {
          console.log(data);
        });
      }); */

    //Fetch con async await, se debe colocar la palabra async en el metodo o sea antes de buscarGifs (linea 15) ---> async buscarGifs()

    /* const respuesta = await fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=0gtKYQGdzJsX73qEpC4fZyzno0KnR4nQ&q=transformers&limit=50'
    );
    const datos = await respuesta.json();
    console.log(datos); */
  }
}
