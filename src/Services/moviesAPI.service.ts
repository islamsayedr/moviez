import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { env } from '../Environment/environment';
import { movieList } from '../Models/iMovies';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_READ_ACCESS_TOKEN}`,
      }),
    };
  }
  private handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(() => new Error('somthing wrong happens '));
  }
  getPopularMovies(): Observable<movieList> {
    return this.http
      .get<movieList>(`${env.API_URL}/movie/popular`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getMovies(pageNum = 1): Observable<movieList> {
    return this.http
      .get<movieList>(
        `${env.API_URL}/discover/movie?page=${pageNum}`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
// http interceptor: layer between req and res
