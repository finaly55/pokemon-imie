import {Component} from '@angular/core';
import {Pokemon} from '../class/pokemon/pokemon';
import {AlertController, ToastController} from '@ionic/angular';
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Participant} from '../class/participant/participant';
import {forEach} from '@angular-devkit/schematics';
import {Alert} from 'selenium-webdriver';

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
    range: number = 0;
    increment: number = 20;
    pokemonNumber: number;

    //ARRAY POKEMON
    listePokemon: Pokemon[] = [];
    private alert ;
    private inputs = [];


    constructor(private pokemonApiService: PokemonApiService,
                private pokemonService: PokemonService,
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
                    text: 'Annuler',

                    handler: data => {

                    }
                },
                {
                    text: 'Suivant',
                    handler: data => {
                        this.participant.pret = true
                        this.participant.pseudo = data.pseudo;

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
                }
            ]
        });

        await alert.present();
    }

    async choixCombat() {
        var listeParticipants = [];
        var p = this.participant

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
                    handler: () => {
                        this.lancerCombat();
                    }
                }
            ]
        });
        var self = this; // save object reference

        //récuperation des participants
        firebase.database().ref('/participants/').on('value', function (snapshot) {

            console.log('lkvdfngkr')
            snapshot.forEach(function (childSnapshot) {
                var unParticipant: Participant = new Participant(childSnapshot.toJSON())
                listeParticipants.push(unParticipant);
                self.inputs.push({
                        name: unParticipant.pseudo,
                        type: 'radio',
                        label: unParticipant.pseudo,
                        value: unParticipant.pseudo,
                    });

            });
            self.alert.inputs = self.inputs

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

    getDataPokemon(data) {
        console.log(data.name);
        this.router.navigate(['/detail-pokemon']);
    }

    getIdHasard() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}
