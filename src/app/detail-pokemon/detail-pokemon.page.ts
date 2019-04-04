import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../class/pokemon/pokemon';
import {Router} from '@angular/router';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
})
export class DetailPokemonPage implements OnInit {

  id: number;
  name: string;
  imgUrl: string;
  listTypes: Array<object>;
  height: number;
  weight: number;
  abilities: Array<object>;


  constructor(private router: Router, private pokemonService: PokemonService, private pokemonApiService : PokemonApiService) {
    this.id = this.pokemonService.idPokemon;
  }

  backToHome() {
    this.router.navigate(['/home']);
  }


  ngOnInit() {
    this.pokemonApiService.getPokemonById(this.id).subscribe((res) => {
      let pokemon : any = res;
      this.name = pokemon.name;
      this.imgUrl = pokemon.sprites.front_default;
      this.listTypes = pokemon.types;
      this.height = pokemon.height/10;
      this.weight = pokemon.weight/10;
      this.abilities = pokemon.abilities;


      console.log(this.listTypes)


      console.log(res)

    }, error => {
      console.log(error)
    })
  }

}
