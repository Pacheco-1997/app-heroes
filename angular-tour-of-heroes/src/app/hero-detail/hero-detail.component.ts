import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // provavelemte algo para lidar com a informação id que vem na URL 
import { Location } from '@angular/common'; // serviço para interagir com o Browser

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  heroes: Hero[] = []; 
  oldHero: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }


  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        console.log(this.oldHero);
      });
      this.oldHero = this.hero;
    }

  goBack(): void{
    this.location.back();
  }


  save(): void{
    this.heroService.updateHero(this.hero!)
    .subscribe(() => this.goBack());
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(() => this.goBack());
  }


}
