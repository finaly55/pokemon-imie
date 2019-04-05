import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Pokemon} from '../class/pokemon/pokemon';
import {ToastController} from '@ionic/angular';
import {PartieService} from '../services/partie/partie.service';
import {ParticipantService} from '../services/participant/participant.service';

@Component({
    selector: 'app-combat',
    templateUrl: './combat.page.html',
    styleUrls: ['./combat.page.scss'],
})
export class CombatPage implements OnInit {

    fistPlayer: number;
    currentPlayer: any;

    listePokemon: Pokemon[] = [{
        id: 1,
        nom: 'pikachu',
        image: 'myimage',
        attaques: [
            {
                id: 1,
                name: 'test',
                power: 120
            },
            {
                id: 2,
                name: 'test2',
                power: 100
            },
            {
                id: 3,
                name: 'test3',
                power: 90
            },
        ]
    }];

    participants: any[] =
        [];

    constructor(private pokemonService: PokemonService,
                private participantService: ParticipantService,
                public toastController: ToastController,
                private partieService: PartieService) {
    }

    ngOnInit() {
        if (this.partieService.partie.proprietaire = this.participantService.moi) {
            this.participants.push(this.partieService.partie.joueur2);
            this.participants.push(this.partieService.partie.proprietaire);
        }
        else {
            this.participants.push(this.partieService.partie.proprietaire);
            this.participants.push(this.partieService.partie.joueur2);

        }

        this.onStart();
        this.startPopup();

        console.log(this.participants);

    }

    onStart() {
        //JOUEUR DU PREMIER TOUR
        this.fistPlayer = this.getRandomValue(0, this.participants.length);
        this.participants[this.fistPlayer].pret = true;
        //AFFICHIER LES INFOS DU JOUEUR CHOISI
        this.showInfo(this.fistPlayer);
        //PRENDRE LE PREMIER POKEMON
        let pokemon: Pokemon = this.listePokemon[0];
    }

    play() {

    }

    showInfo(id) {
        let info = this.participants[id];
        console.log(info);
    }

    getRandomValue(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async startPopup() {
        const toast = await this.toastController.create({
            message: 'Le premier joueur est ' + this.participants[this.fistPlayer].name,
            duration: 2000
        });
        toast.present();
    }

}
