import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Pokemon} from '../class/pokemon/pokemon';
import {ToastController, BooleanValueAccessor, AlertController} from '@ionic/angular';
import {PartieService} from '../services/partie/partie.service';
import {ParticipantService} from '../services/participant/participant.service';
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';
import {Participant} from '../class/participant/participant';
import * as firebase from 'firebase';
import {Partie} from '../class/partie/partie';
import {Router} from '@angular/router';

@Component({
    selector: 'app-combat',
    templateUrl: './combat.page.html',
    styleUrls: ['./combat.page.scss'],
})
export class CombatPage implements OnInit {

    fistPlayer: number;
    currentPlayer: any;
    teamCount: any;

    mesPokemon: number = 0
    pokemonAdversaire: number = 0
    owner: boolean = false

    participants: Participant[] =
        [new Participant(), new Participant()];

    constructor(private pokemonService: PokemonService,
                private participantService: ParticipantService,
                private pokemonApiService : PokemonApiService,
                public toastController: ToastController,
                private partieService: PartieService,
                public alertController: AlertController,
                public router: Router) {
    }

    ngOnInit() {

        if(!this.partieService.partie){
            this.router.navigate(['/home']);
        }
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
            if (self.owner) {
                self.participants[0] = self.partieService.partie.proprietaire
                self.participants[1] = self.partieService.partie.joueur2
            }
            else {
                self.participants[0] = self.partieService.partie.joueur2
                self.participants[1] = self.partieService.partie.proprietaire
            }
            if (self.participants[0].team[self.mesPokemon].pv <= 0) {
                if(self.mesPokemon == 0){
                    self.homeLoose()
                }
                else{
                    self.mesPokemon++
                }
            }

            if (self.participants[1].team[self.pokemonAdversaire].pv <= 0) {
                if(self.pokemonAdversaire == 0){
                    self.homeWin()
                }
                else{
                    self.pokemonAdversaire++
                }
            }
        });

    }

    onStart() {
        //JOUEUR DU PREMIER TOUR
        this.fistPlayer = CombatPage.getRandomValue(0, this.participants.length);
        this.participants[this.fistPlayer].pret = true;

    }

    async homeWin() {
        var alert = await this.alertController.create({
            header: 'Partie terminé !',
            message: "Vous avez gagné !",
            buttons: [{
                text: 'Retour accueil',
                handler: () => {
                    this.router.navigate(['/home']);

                    console.log('Confirm Okay');
                }
            }
            ]
        });
        alert.present();
    }
    async homeLoose() {
        var alert = await this.alertController.create({
            header: 'Partie terminé !',
            message: "Vous avez perdu ! :'(",
            buttons: [{
                text: 'Retour accueil',
                handler: () => {
                    this.router.navigate(['/home']);

                    console.log('Confirm Okay');
                }
            }
            ]
        });
        alert.present();
    }

    showInfo(id) {
        let info = this.participants[id];
        console.log(info);
    }

    async setTour() {
        console.log(this.participants[1].team[this.pokemonAdversaire].pv)

        this.participants[1].team[this.pokemonAdversaire].pv -= CombatPage.randomPower()
        console.log(this.participants[1].team[this.pokemonAdversaire].pv)
        console.log(this.pokemonAdversaire)
        console.log(this.mesPokemon)
        var pvAdversaire = this.participants[1].team[this.pokemonAdversaire].pv
        if (this.owner) {
            //envoie partie en bdd
            firebase.database().ref('parties/' + this.partieService.partie.id + "/proprietaire/tour").set(!this.participants[0].tour, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });
            //envoie partie en bdd
            firebase.database().ref('parties/' + this.partieService.partie.id + "/joueur2/tour").set(!this.participants[1].tour, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });

            firebase.database().ref('parties/' + this.partieService.partie.id + "/joueur2/team/" + this.mesPokemon +"/pv").set(pvAdversaire, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });
        }
        else {
            firebase.database().ref('parties/' + this.partieService.partie.id + "/joueur2/tour").set(!this.participants[0].tour, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });
            firebase.database().ref('parties/' + this.partieService.partie.id + "/proprietaire/tour").set(!this.participants[1].tour, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });

            firebase.database().ref('parties/' + this.partieService.partie.id + "/proprietaire/team/" + this.pokemonAdversaire + "/pv").set(pvAdversaire, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('succès');
                }
            });

        }
    }

    static getRandomValue(min, max) {
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

    static randomPower() {
        return CombatPage.getRandomValue(0, 100);
    }
}
