import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // provavelemte algo para lidar com a informação id que vem na URL 
import { Location } from '@angular/common'; // serviço para interagir com o Browser


import { HeroService } from '../hero.service';
import { Grupo } from '../grupo';

import { HeroGrupo } from '../herogrupo';
import { Hero } from '../hero';

@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.component.html',
  styleUrls: ['./grupo-detail.component.css']

})
export class GrupoDetailComponent implements OnInit {
  @Input() grupo?: Grupo;
  grupos: Grupo[] = []; 
  heroes: Hero[] = []; 
  heroGrupos: HeroGrupo[] = [];
  flag?: string;

  

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    
  ) { }

  ngOnInit(): void {
    this.getGrupo();
    this.getHerosByGrupoId();
  }


  getGrupo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getGrupo(id)
      .subscribe(resp => {
        this.grupo = resp;
        });
    }


    getHerosByGrupoId():  any{
      const id = Number(this.route.snapshot.paramMap.get('id'));
      return this.heroService.getHeroesByGrupoId(id).subscribe(
        resp => {
          this.heroGrupos = resp;
          
          
          console.log(this.heroGrupos.map(a => a.id))
  
  
          if(this.heroGrupos.length != 0){
            this.flag = "alguma coisa"
          }
        }
      )
    }


    save(): void{
      this.heroService.updateGrupo(this.grupo!)
      .subscribe(() => this.goBack());
    }
  

  goBack(): void{
    this.location.back();
  }


  delete(grupo: Grupo): void {
    this.grupos = this.grupos.filter(g => g !== grupo);
    this.heroService.deleteGrupo(grupo).subscribe(() => this.goBack());
  }

  deleteHeroGrupo(id:number): void{
    const id_grupo = Number(this.route.snapshot.paramMap.get('id'));
    const id_hero = id;

   this.heroService.deleteRelHeroGrupo(id_grupo, id_hero).subscribe(() => this.goBack());
  }

  




}
