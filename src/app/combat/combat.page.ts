import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Pokemon} from '../class/pokemon/pokemon';
import {ToastController, BooleanValueAccessor} from '@ionic/angular';
import {PartieService} from '../services/partie/partie.service';
import {ParticipantService} from '../services/participant/participant.service';
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';
import {Participant} from '../class/participant/participant';
import * as firebase from 'firebase';
import {Partie} from '../class/partie/partie';

@Component({
    selector: 'app-combat',
    templateUrl: './combat.page.html',
    styleUrls: ['./combat.page.scss'],
})
export class CombatPage implements OnInit {

    fistPlayer: number;
    currentPlayer: any;
    teamCount: any;

    owner: boolean = false

    participants: Participant[] =
        [];

    constructor(private pokemonService: PokemonService,
                private participantService: ParticipantService,
                private pokemonApiService : PokemonApiService,
                public toastController: ToastController,
                private partieService: PartieService) {
    }

    ngOnInit() {
        if (this.partieService.partie.proprietaire == this.participantService.moi) {
            this.participants.push(this.partieService.partie.joueur2);
            this.participants.push(this.partieService.partie.proprietaire);
            this.owner = true
        }
        else {
            this.participants.push(this.partieService.partie.proprietaire);
            this.participants.push(this.partieService.partie.joueur2);
        }

        var self = this;
        firebase.database().ref('/parties/' + this.partieService.partie.id).on('value', function (snapshot) {
            self.partieService.partie = new Partie(snapshot.toJSON())

      });

    }

    onStart() {
        //JOUEUR DU PREMIER TOUR
        this.fistPlayer = this.getRandomValue(0, this.participants.length);
        this.participants[this.fistPlayer].pret = true;

    }

    play() {

    }

    showInfo(id) {
        let info = this.participants[id];
        console.log(info);
    }

    getTour() {
        console.log("test")
    }

    getRandomValue(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async startPopup() {
        const toast = await this.toastController.create({
            message: 'Le premier joueur est ' + this.participants[this.fistPlayer].pseudo,
            duration: 2000
        });
        toast.present();
    }

    randomPower() {
        this.getRandomValue(0, 100);
    }
}
