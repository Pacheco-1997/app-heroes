import { HttpErrorResponse } from '@angular/common/http';
import { Component,  OnInit ,ViewEncapsulation } from '@angular/core';
import { Grupo } from '../grupo';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {Hero} from '../hero'; // importando hero.ts da interface hero
import { HeroService } from '../hero.service';
import { HeroGrupo } from '../herogrupo';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = []; 
  grupos: Grupo[] = [];
  heroGrupos: HeroGrupo[] = [];
  closeResult!: string;
  hero: any;
  grupo: any;

  constructor(
    private heroService: HeroService, 
    private messageService: MessageService, 
   private modalService: NgbModal,
   private location: Location
    ) { }
  
  ngOnInit(): void {
    this.getHeroes();
    this.getGrupos();
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

 openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  getGrupos(): void{
    this.heroService.getGrupos()
        .subscribe(resp => this.grupos = resp ); // subscribe é tipo um then pra uma promise
  }

  saveHero(hero: any): void{
    this.hero = hero;
    console.log(this.hero);
  }

  saveGrupo(grupo: any): void{
    this.grupo = grupo;
    console.log(this.grupo);
  }

  goBack(): void{
    this.location.back();
  }

  addRelHeroGrupo(): void{
    this.heroService.addRelHeroGrupo(this.grupo, this.hero).subscribe( () => alert("Heroi adicionado com sucesso"))
  }


 /* pegaID(id_hero:number): void{
   let teste =  document.getElementById('testeteste')?.innerText

     console.log(id_hero)
  }*/

 // getGruposByHeroId(id: )





// rxjs

}
