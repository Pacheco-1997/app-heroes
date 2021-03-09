/*import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', power: null, magic: null },
      { id: 12, name: 'Narco' , power: null, magic: null},
      { id: 13, name: 'Bombasto' , power: null, magic: null},
      { id: 14, name: 'Celeritas' , power: null, magic: null},
      { id: 15, name: 'Magneta' , power: null, magic: null},
      { id: 16, name: 'RubberMan' , power: null, magic: null},
      { id: 17, name: 'Dynama' , power: null, magic: null},
      { id: 18, name: 'Dr IQ' , power: null, magic: null},
      { id: 19, name: 'Magma' , power: null, magic: null},
      { id: 20, name: 'Tornado' , power: null, magic: null}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
//  genId(heroes: Hero[]): number {
 //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
 // }



}
*/
