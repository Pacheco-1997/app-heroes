import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { TopHeroMagicComponent } from './top-hero-magic/top-hero-magic.component';
import { GrupoHeroesComponent } from './grupo-heroes/grupo-heroes.component';

const routes: Routes = [
  {path: 'detail/:id', component: HeroDetailComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent},
  {path: 'mostmagichero', component: TopHeroMagicComponent },
  {path: 'grupohero', component: GrupoHeroesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
