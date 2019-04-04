import {Injectable} from '@angular/core';
import {Pokemon} from "../../class/pokemon/pokemon";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    listePokemonTeam: Pokemon[] = [];

    constructor() {
    }
}
