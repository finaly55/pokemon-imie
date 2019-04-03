import { Component } from '@angular/core';
import { PokemonApiService } from '../pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private pokemonApi : PokemonApiService){
    this.pokemonApi.getAllPokemons().subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    }
    );
  }

}
