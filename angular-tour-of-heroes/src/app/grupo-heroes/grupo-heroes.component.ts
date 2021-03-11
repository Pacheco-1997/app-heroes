import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Grupo } from '../grupo';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-grupo-heroes',
  templateUrl: './grupo-heroes.component.html',
  styleUrls: ['./grupo-heroes.component.css']
})
export class GrupoHeroesComponent implements OnInit {
  grupos: Grupo[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getGrupos();
  }

  getGrupos(): void{
    this.heroService.getGrupos()
        .subscribe(resp => this.grupos = resp ); // subscribe é tipo um then pra uma promise
  }


  addGrupo(nome_grupo: string): void{
    nome_grupo = nome_grupo.trim();
    if(!nome_grupo) {return;}
    this.heroService.addGrupo({ nome_grupo } as Grupo)
      .subscribe(grupo => {
        this.grupos.push((grupo as Grupo));
      },
      (error:HttpErrorResponse) => {
        if(error.status === 409) {
          alert('Este nome de grupo já existe');
        }
    })
  }



    
}



