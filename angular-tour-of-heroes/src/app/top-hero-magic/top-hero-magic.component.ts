import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-top-hero-magic',
  templateUrl: './top-hero-magic.component.html',
  styleUrls: ['./top-hero-magic.component.css']
})
export class TopHeroMagicComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void{
    this.heroService.getMostMagicHero()
        .subscribe(resp => this.heroes = resp);
}

}
