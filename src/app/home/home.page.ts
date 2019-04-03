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

    unPokemon : Pokemon;
    id : number;
    image : any;
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
      console.log(result)
      
      for(var i = 0; i < result.count; i++){
        this.unPokemon = new Pokemon()
        this.pokemonApi.getPokemonByUrl(result.results[i].url).subscribe((res) => {
          let pokemon : any = res
          this.id = pokemon.id
          this.image = pokemon.sprites.front_default

          if(this.image != null){
            const unPokemon : Pokemon = 
            {
              nom : pokemon.forms[0].name,
              image: this.image
            } 
          this.listePokemon.push(unPokemon)
          }
        })   
      }

      

    }, error => {
      console.log(error)
    }
    );
    console.log(this.listePokemon.length)
  }

}
