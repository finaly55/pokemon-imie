import {Component} from '@angular/core';
import {Pokemon} from '../class/pokemon/pokemon';
import {AlertController, ToastController} from '@ionic/angular';
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Participant} from '../class/participant/participant';
import {Partie} from '../class/partie/partie';
import {PartieService} from '../services/partie/partie.service';
import {ParticipantService} from '../services/participant/participant.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    //Participant
    listePokemonTeam: Pokemon[] = [];
    private participant: Participant = new Participant();

    unPokemon: Pokemon;
    id: number;
    image: any;
    imageBack : any;
    range: number = 0;
    increment: number = 20;
    pokemonNumber: number;
    searchPokemon: string;

    //ARRAY POKEMON
    listePokemon: Pokemon[] = [];
    private alert;
    private inputs = [];


    constructor(private pokemonApiService: PokemonApiService,
                private pokemonService: PokemonService,
                private partieService: PartieService,
                private participantService: ParticipantService,
                public alertController: AlertController,
                public toastController: ToastController,
                public router: Router) {
    }

    ngOnInit() {
        this.participant.team = this.listePokemonTeam;
        this.participant.id = this.getIdHasard();
        this.loadPokemons();
    }

    loadPokemons() {
        this.pokemonApiService.getAllPokemons(this.range).subscribe((res) => {
                let result: any = res;
                this.pokemonNumber = result.count;
                for (var i = 0; i < result.results.length; i++) {
                    this.unPokemon = new Pokemon();

                    this.pokemonApiService.getPokemonByUrl(result.results[i].url).subscribe((res) => {
                        let pokemon: any = res;
                        this.id = pokemon.id;
                        this.image = pokemon.sprites.front_default;
                        this.imageBack = pokemon.sprites.back_default;

                        if (this.image != null) {
                            const unPokemon: Pokemon =
                                {
                                    id: this.id,
                                    nom: pokemon.forms[0].name,
                                    image: this.image,
                                    imageBack : this.imageBack,
                                    pv: this.randomPv()
                                };
                            this.listePokemon.push(unPokemon);
                        }
                    });
                }
                this.range += this.increment;
            }, error => {
                console.log(error);
            }
        );
    }

    setTeam(pokemon: Pokemon) {
        let id = this.participant.team.indexOf(pokemon);

        // Ajout du pokemon à la team
        if (id == -1) {
            if (this.participant.team.length < 6) {
                this.participant.team.push(pokemon);
                this.setPokemonTeamToast(true);
            }
        }
        // Retrait du pokemon de la team
        else {
            this.participant.team.splice(id, 1);
            this.setPokemonTeamToast(false);
        }

    }


    randomPv() {
      return this.getRandomValue(70, 120)
    }
    
    getRandomValue(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }


    isInTeam(pokemon: Pokemon) {
        return this.participant.team.some(p => p === pokemon);
    }

    async identification() {
        const alert = await this.alertController.create({
            message: 'Entre ton pseudo :',
            inputs: [
                {
                    name: 'pseudo',
                    placeholder: 'Pseudo'
                },
            ],
            buttons: [
                {
                    text: 'Rejoindre une room',
                    handler: data => {
                        this.participant.pseudo = data.pseudo;
                        this.participant.room = false;

                        this.participantService.moi = this.participant
                        //envoie participant actuel en bdd
                        firebase.database().ref('participants/' + this.participant.id).set(this.participant, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('succès');
                            }
                        });
                        this.choixCombat();
                    }

                },
                {
                    text: 'Ouvrir une room',
                    handler: data => {
                        this.participant.pseudo = data.pseudo;
                        this.participant.room = true;

                        this.participantService.moi = this.participant

                        //envoie participant actuel en bdd
                        firebase.database().ref('participants/' + this.participant.id).set(this.participant, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('succès');
                            }
                        });
                        this.attenteRoom();

                        var maPartie: Partie = new Partie();
                        maPartie.id = this.getIdHasard();
                        maPartie.proprietaire = this.participant;
                        console.log(maPartie)

                        //envoie partie en bdd
                        firebase.database().ref('parties/' + maPartie.id).set(maPartie, function (error) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('succès');
                            }
                        });
                        var self1 = this;

                        //récuperation des participants
                        firebase.database().ref('/parties/' + maPartie.id).on('value', function (snapshot) {
                            var self = self1;
                            var partie = new Partie(snapshot.toJSON())
                            if (partie.joueur2) {
                                maPartie.joueur2 = partie.joueur2;
                                self.partieService.partie = maPartie
                                self.alert.dismiss()
                                self.lancerCombat();

                            }
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    async attenteRoom() {
        this.alert = await this.alertController.create({
            header: 'En attente',
            message: 'Vous êtes visible, attendez qu\'un autre joueur',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Okay',
                    handler: () => {
                        console.log('Confirm Okay');
                    }
                }
            ]
        });
        this.alert.present();
    }

    async choixCombat() {
        var listeParticipants = [];
        var p = this.participant;

        this.alert = await this.alertController.create({
            header: 'Adversaires disponibles',
            inputs: [],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'Annuler',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Lancer la partie',
                    handler: (value) => {
                        var self = this
                        firebase.database().ref('parties/' + value).child('joueur2').set(this.participant);
                        firebase.database().ref('parties/' + value).child('enCours').set(true);
                        firebase.database().ref('parties/' + value).once('value', function (snapshot) {
                            self.partieService.partie = new Partie(snapshot.toJSON())
                            self.lancerCombat();
                        })
                    }
                }
            ]
        });
        var self = this; // save object reference

        //récuperation des participants
        firebase.database().ref('/parties/').on('value', function (snapshot) {
            self.inputs = [];

            snapshot.forEach(function (childSnapshot) {
                var partie = new Partie(childSnapshot.toJSON())
                var unParticipant: Participant = new Participant(partie.proprietaire);
                listeParticipants.push(unParticipant);
                if (unParticipant.id != self.participant.id && partie.enCours == false && partie.estTermine == false) {
                    self.inputs.push({
                        name: unParticipant.pseudo,
                        type: 'radio',
                        label: unParticipant.pseudo,
                        value: partie.id,
                    });
                }
            });
            self.alert.inputs = [];
            self.alert.inputs = self.inputs;

        });
        await this.alert.present();

    }

    async setPokemonTeamToast(add: Boolean) {
        if (add) {
            const toast = await this.toastController.create({
                message: 'Pokemon ajouté à votre team',
                duration: 1000,
                position: 'top',
                showCloseButton: false,
                color: 'success'
            });
            toast.present();

        }
        else {
            const toast = await this.toastController.create({
                message: 'Pokemon retiré à votre team',
                duration: 1000,
                position: 'top',
                showCloseButton: false,
                color: 'danger'

            });
            toast.present();
        }
    }

    //Scroll asynchrone
    loadData(event) {
        setTimeout(() => {
            this.pokemonApiService.getAllPokemons(this.range).subscribe((res) => {
                    let result: any = res;
                    for (var i = 0; i < result.results.length; i++) {
                        this.unPokemon = new Pokemon();

                        this.pokemonApiService.getPokemonByUrl(result.results[i].url).subscribe((res) => {
                            let pokemon: any = res;
                            this.id = pokemon.id;
                            this.image = pokemon.sprites.front_default;

                            if (this.image != null) {
                                const unPokemon: Pokemon =
                                    {
                                        id: this.id,
                                        nom: pokemon.forms[0].name,
                                        image: this.image
                                    };
                                this.listePokemon.push(unPokemon);
                            }
                        });
                    }
                    this.range += this.increment;
                }, error => {
                    console.log(error);
                }
            );
            event.target.complete();

            if (this.listePokemon.length == this.pokemonNumber) {
                event.target.disabled = true;
            }
        }, 800);
    }

    lancerCombat() {
        this.pokemonService.listePokemonTeam = this.participant.team;
        this.router.navigate(['/combat']);
    }

    getIdHasard() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    getDataPokemon(id) {
        this.pokemonService.idPokemon = id;
        this.router.navigate(['/detail-pokemon']);
    }
}
