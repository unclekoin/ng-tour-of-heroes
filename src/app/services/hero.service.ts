import { MessageService } from './message.service';
import { HEROES } from './../data/mock-heroes';
import { Injectable } from '@angular/core';

import { IHero } from './../models/hero';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<IHero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched Heroes');
    return heroes;
  }

  getHero(id: number): Observable<IHero> {
    const hero = HEROES.find((hero) => hero.id === id)!;
    this.messageService.add(`HeroService: fetched Hero id: ${id}`);
    return of(hero);
  }
}
