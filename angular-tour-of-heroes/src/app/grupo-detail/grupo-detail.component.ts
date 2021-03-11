import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // provavelemte algo para lidar com a informação id que vem na URL 
import { Location } from '@angular/common'; // serviço para interagir com o Browser

import { HeroService } from '../hero.service';
import { Grupo } from '../grupo';

@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.component.html',
  styleUrls: ['./grupo-detail.component.css']
})
export class GrupoDetailComponent implements OnInit {
  @Input() grupo?: Grupo;
  grupos: Grupo[] = []; 

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getGrupo();
  }


  getGrupo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getGrupo(id)
      .subscribe(resp => {
        this.grupo = resp;
        });
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

}
