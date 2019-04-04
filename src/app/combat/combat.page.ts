import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../services/pokemon/pokemon.service";

@Component({
  selector: 'app-combat',
  templateUrl: './combat.page.html',
  styleUrls: ['./combat.page.scss'],
})
export class CombatPage implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    console.log(this.pokemonService.listePokemonTeam)
  }

}
