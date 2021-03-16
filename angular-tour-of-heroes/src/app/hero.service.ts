import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Hero, GrupoHero } from './hero';
import { Grupo } from './grupo';
import { HeroGrupo } from './herogrupo';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroService {
private heroesUrl = 'https://localhost:44311/api/heroes'; //URL to web api
private grupoUrl = 'https://localhost:44311/api/grupo'; // url de grupos
private heroGrupoUrl = 'https://localhost:44311/api/grupoheroe'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }


getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}



getTopHeroes(): Observable<Hero[]>{
  return this.http.get<Hero[]>(this.heroesUrl + "/maiorpoder")
  .pipe(
    tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
  );
}

getMostMagicHero(): Observable<Hero[]>{
  return this.http.get<Hero[]>(this.heroesUrl + "/maiormagica")
  .pipe(
    tap(_ => this.log('fetched heroes')),
    catchError(this.handleError<Hero[]>('getHeroes', []))
  );
}

/** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}


getGrupo(id_grupo: number): Observable<Grupo>{
   const url = `${this.grupoUrl}/${id_grupo}`;
   return this.http.get<Grupo>(url).pipe(
     tap(_ => this.log(`fetched grupo id=${id_grupo}`)),
     catchError(this.handleError<Grupo>(`getGrupo id=${id_grupo}`))
   )
}

getGrupos(): Observable<Grupo[]> {
  return this.http.get<Grupo[]>(this.grupoUrl + "/mostratodos" )
    .pipe(
      tap(_ => this.log('fetched grupos')),
     
    );
}

getGruposByHeroId(id: number): Observable<HeroGrupo[]>{
  const url = `${this.heroGrupoUrl}/pega-grupo-id-heroe/${id}`;
  return this.http.get<HeroGrupo[]>(url).pipe(
    tap(_ => this.log('fetched grupos')),
    catchError(this.handleError<HeroGrupo[]>('getGrupos', []))
    );
  
} 


getHeroesByGrupoId(id: number): Observable<HeroGrupo[]>{
  const url = `${this.heroGrupoUrl}/pega-heroe-id-grupo/${id}`;
  return this.http.get<HeroGrupo[]>(url).pipe(
    tap(_ => this.log('fetched grupos')),
    catchError(this.handleError<HeroGrupo[]>('getGrupos', []))
    );
  
} 





updateHero(hero: Hero): Observable<any>{

  return this.http.put(this.heroesUrl + "/" + hero.id, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}  to ${hero.name}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

updateGrupo(grupo: Grupo): Observable<any>{
     
     return this.http.put(this.grupoUrl + "/" + grupo.id_grupo, grupo, this.httpOptions).pipe(
       tap(_ => this.log(`updated grupo id=${grupo.id_grupo} to ${grupo.nome_grupo}`)),
       catchError(this.handleError<any>('updateGrupo'))
     )
}

/** POST: add a new hero to the server */
 addHero(hero: Hero): Observable<Hero | HttpErrorResponse> {
  console.log(hero);
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    //catchError(this.handleError<Hero>('addHero'))
  );
}

addGrupo(grupo: Grupo): Observable<Grupo | HttpErrorResponse> {
  return this.http.post<Grupo>(this.grupoUrl, grupo, this.httpOptions)
         .pipe(
           tap((newGrupo: Grupo) => this.log(`novo grupo adicionado w/ id=${newGrupo.id_grupo}`))
         )
}

/** DELETE: delete the hero from the server */
deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

deleteGrupo(grupo: Grupo | number): Observable<Grupo>{
  const id = typeof grupo === 'number' ? grupo : grupo.id_grupo;
  const url = `${this.grupoUrl}/${id}`;

  return this.http.delete<Grupo>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted grupo id=${id}`)),
    catchError(this.handleError<Grupo>('deleteGrupo'))
  )
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}

deleteRelHeroGrupo(id_grupo: number ,id: number ): Observable<null>{
    const url = `${this.heroGrupoUrl}/deleta-hero-grupo`;
    return this.http.post<null>(url, {id_grupo: id_grupo, id: id}).pipe(
        tap(_ =>    this.log(`fetched hero id=${id} was removed`)),
        catchError(this.handleError<null>(`deleteRelHeroGrupo ${id}`))
    )
}

addRelHeroGrupo(id_grupo: number ,id: number ): Observable<null>{
  const url = `${this.heroGrupoUrl}/adiciona-hero-grupo`;
  return this.http.post<null>(url, {id_grupo: id_grupo, id: id}).pipe(
    tap(_ =>    this.log(`fetched hero id=${id} was added to id_grupo=${id_grupo}`)),
    catchError(this.handleError<null>(`addRelHeroGrupo ${id} to ${id_grupo}`))
  )
}




}