import { Component } from '@angular/core';
import {Pokemon} from "../class/pokemon/pokemon";
import { PokemonApiService } from '../pokemon-api.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    listePokemon: Pokemon[] = [{
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }]


  constructor(private pokemonApi : PokemonApiService){
    this.pokemonApi.getAllPokemons().subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    }
    );
  }

}
