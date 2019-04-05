import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon/pokemon.service';
import * as firebase from 'firebase';
import { Pokemon } from '../class/pokemon/pokemon';
import { Participant } from '../class/participant/participant';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.page.html',
  styleUrls: ['./wait.page.scss'],
})
export class WaitPage implements OnInit {

  id : number
  participants : Participant[]

  constructor(private pokemonService : PokemonService) { 

  }

  ngOnInit() {
    this.id = this.pokemonService.idPokemon
    console.log(this.id)
    //obtenir le resultat du proprietaire
    firebase.database().ref('/parties/' + this.id).once('value', function (snapshot){
      console.log(snapshot.val())
      let nomRoom : any = snapshot.val().name

      var participant:Participant = new Participant()
        participant.id = snapshot.val().owner.id,
        participant.pseudo = snapshot.val().owner.pseudo,
        participant.pret = snapshot.val().owner.pret,
        participant.team = [snapshot.val().owner.team]
      
      console.log(participant)
      this.participants.push(participant)
    }
    )
    console.log(this.participants)

  }

}
