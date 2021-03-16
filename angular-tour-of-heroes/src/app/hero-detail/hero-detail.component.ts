import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // provavelemte algo para lidar com a informação id que vem na URL 
import { Location } from '@angular/common'; // serviço para interagir com o Browser

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroGrupo } from '../herogrupo';

import { Grupo } from '../grupo';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  heroes: Hero[] = []; 
  heroGrupos: HeroGrupo[] = [];
  grupos: Grupo[] = [];
  flag?: string;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.getGruposByHeroId();
   
  }



  getGruposByHeroId():  any{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getGruposByHeroId(id).subscribe(
      resp => {
        this.heroGrupos = resp;
        
        
        console.log(this.heroGrupos.map(a => a.id_grupo))


        if(this.heroGrupos.length != 0){
          this.flag = "alguma coisa"
        }
      }
    )
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        
      });
    
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
