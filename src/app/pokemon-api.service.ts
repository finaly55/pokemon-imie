import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  apiUrl : string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  //RECUPERER TOUS LES POKEMON
  getAllPokemons(){
    return this.http.get(this.apiUrl + "/?limit=964")
  }
}
