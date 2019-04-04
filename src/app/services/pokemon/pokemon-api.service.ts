import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  apiUrl : string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private http: HttpClient) { }

  //RECUPERER TOUS LES POKEMON
  getAllPokemons(offset){
    return this.http.get(this.apiUrl + "?offset="+offset+"&limit=20")
  }

  getPokemonByUrl(url){
    return this.http.get(url)
  }
}
