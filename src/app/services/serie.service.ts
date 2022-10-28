import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { Series } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private _API_URL = 'https://api-tvshow.herokuapp.com/series';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })

  }

  // Obtem todos os carros
  getSerie(): Observable<Series[]> {
    return this.httpClient.get<Series[]>(this._API_URL)
      .pipe(
        delay(2000),
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getSerieById(id: number): Observable<Series> {
    return this.httpClient.get<Series>(this._API_URL + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveSerie(series: Series): Observable<Series> {
    return this.httpClient.post<Series>(this._API_URL, JSON.stringify(series), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um carro
  updateSerie(series: Series): Observable<Series> {
    return this.httpClient.put<Series>(this._API_URL + '/' + series.id, JSON.stringify(series), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteSerie(series: Series) {
    return this.httpClient.delete<Series>(this._API_URL + '/' + series.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
