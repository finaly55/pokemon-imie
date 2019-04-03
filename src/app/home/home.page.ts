import { Component } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { removeSummaryDuplicates } from '@angular/compiler';
import {Pokemon} from "../class/pokemon/pokemon";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    //ARRAY POKEMON
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
      let result : any = res

      for(var i = 0; i < result.results.length; i++){
        console.log('1')
      }

    }, error => {
      console.log(error)
    }
    );
  }

}
