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

  constructor(private router: Router, private pokemonService: PokemonService, private pokemonApiService : PokemonApiService) {
    this.id = this.pokemonService.idPokemon;
  }

  backToHome() {
    this.router.navigate(['/home']);
  }


  ngOnInit() {
    this.pokemonApiService.getPokemonById(this.id).subscribe((res) => {
      console.log(res)
      
    }, error => {
      console.log(error)
    })
  }

}
