import { Component } from '@angular/core';
import {Pokemon} from "../class/pokemon/pokemon";
import {AlertController, ToastController} from "@ionic/angular";
import {PokemonApiService} from '../services/pokemon/pokemon-api.service';
import {PokemonService} from '../services/pokemon/pokemon.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    listePokemonTeam: Pokemon[] = [];


    unPokemon : Pokemon;
    id : number;
    image : any;
    range : number = 0
    increment : number = 20
    pokemonNumber : number

    //ARRAY POKEMON
    listePokemon: Pokemon[] = [{
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }, {
        id:25,
        nom: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }]

    constructor(private pokemonApiService: PokemonApiService,
                private pokemonService: PokemonService,
                public alertController: AlertController,
                public toastController: ToastController,
                public router: Router) {
    }
    ngOnInit(){
      this.loadPokemons()
    }

    loadPokemons(){
      this.pokemonApiService.getAllPokemons(this.range).subscribe((res) => {
        let result : any = res
        this.pokemonNumber = result.count
        for(var i = 0; i < result.results.length; i++){
            this.unPokemon = new Pokemon()

            this.pokemonApiService.getPokemonByUrl(result.results[i].url).subscribe((res) => {
                let pokemon : any = res
                this.id = pokemon.id
                this.image = pokemon.sprites.front_default

                if(this.image != null){
                    const unPokemon : Pokemon =
                        {
                            id: this.id,
                            nom : pokemon.forms[0].name,
                            image: this.image
                        }
                    this.listePokemon.push(unPokemon)
                }
            })
        }
        this.range += this.increment
        }, error => {
            console.log(error)
        }
      );
      console.log(this.listePokemon)
    }

    setTeam(pokemon: Pokemon) {
        let id = this.listePokemonTeam.indexOf(pokemon)

        // Ajout du pokemon à la team
        if (id == -1) {
            if (this.listePokemonTeam.length < 6) {
                this.listePokemonTeam.push(pokemon)
                this.setPokemonTeamToast(true);
            }
        }
        // Retrait du pokemon de la team
        else {
            this.listePokemonTeam.splice(id, 1)
            this.setPokemonTeamToast(false);
        }

    }

    isInTeam(pokemon: Pokemon) {
        return this.listePokemonTeam.some(p => p === pokemon)
    }

    async identification() {
        const alert = await this.alertController.create({
            message: "Entre ton pseudo :",
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
                        this.choixCombat()
                    }
                },
                {
                    text: 'Suivant',
                    handler: data => {
                        this.choixCombat()
                    }
                }
            ]
        });

        await alert.present();
    }

    async choixCombat() {
        const alert = await this.alertController.create({
            header: 'Radio',
            inputs: [
                {
                    name: 'radio1',
                    type: 'radio',
                    label: 'Radio 1',
                    value: 'value1',
                    checked: true
                },
                {
                    name: 'radio2',
                    type: 'radio',
                    label: 'Radio 2',
                    value: 'value2'
                },
                {
                    name: 'radio3',
                    type: 'radio',
                    label: 'Radio 3',
                    value: 'value3'
                },
                {
                    name: 'radio4',
                    type: 'radio',
                    label: 'Radio 4',
                    value: 'value4'
                },
                {
                    name: 'radio5',
                    type: 'radio',
                    label: 'Radio 5',
                    value: 'value5'
                },
                {
                    name: 'radio6',
                    type: 'radio',
                    label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
                    value: 'value6'
                }
            ],
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
                        this.lancerCombat()
                    }
                }
            ]
        });
        await alert.present();
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
        else{
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
          let result : any = res
          for(var i = 0; i < result.results.length; i++){
              this.unPokemon = new Pokemon()

              this.pokemonApiService.getPokemonByUrl(result.results[i].url).subscribe((res) => {
                  let pokemon : any = res
                  this.id = pokemon.id
                  this.image = pokemon.sprites.front_default

                  if(this.image != null){
                      const unPokemon : Pokemon =
                          {
                              id: this.id,
                              nom : pokemon.forms[0].name,
                              image: this.image
                          }
                      this.listePokemon.push(unPokemon)
                  }
              })
          }
          this.range += this.increment
      }, error => {
          console.log(error)
      }
      );
        event.target.complete();

        if (this.listePokemon.length == this.pokemonNumber) {
          event.target.disabled = true;
        }
      }, 800);
    }

    lancerCombat(){
        this.pokemonService.listePokemonTeam = this.listePokemonTeam
        this.router.navigate(['/combat']);
    }
}
