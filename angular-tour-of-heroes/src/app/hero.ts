import { Grupo } from './grupo';

export interface Hero{  // objeto do tipo Hero
    id: number;
    name: string;
    power: number;
    magic: number;
}

export interface GrupoHero{
    hero: Hero;
    grupo: Grupo;
}