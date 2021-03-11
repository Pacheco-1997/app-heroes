import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';

import {Hero} from '../hero'; // importando hero.ts da interface hero
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = []; 

   
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getHeroes();
  }

   add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push((hero as Hero));  
        },
        (error:HttpErrorResponse) => {
          if(error.status === 409) {
            alert('Este heroi já existe');
          }
      });
      
  }

  getHeroes(): void{
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes ); // subscribe é tipo um then pra uma promise
  }


// rxjs

}
