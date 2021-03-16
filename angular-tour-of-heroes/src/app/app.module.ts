import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // importando para poder usar o [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HeroSearchComponent } from './hero-search/hero-search.component';
import { TopHeroMagicComponent } from './top-hero-magic/top-hero-magic.component';
import { GrupoHeroesComponent } from './grupo-heroes/grupo-heroes.component';
import { GrupoDetailComponent } from './grupo-detail/grupo-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    TopHeroMagicComponent,
    GrupoHeroesComponent,
    GrupoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
   // HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
