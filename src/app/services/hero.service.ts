import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, pipe, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { IHero } from './../models/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl).pipe(
      tap(() => this.log('fetched Heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap((_) => this.log(`fetched Hero id: ${id}`)),
      catchError(this.handleError<IHero>(`getHero id: ${id}`))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated Hero id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
