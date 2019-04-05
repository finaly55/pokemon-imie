import {Participant} from '../participant/participant';

export class Partie {
    id: string
    proprietaire: Participant
    joueur2: Participant
    enCours: boolean = false
    estTermine: boolean = false
    tourProprietaire: boolean = true
    tourJoueur2: boolean = false

    constructor(json?:any) {
        if (json) {

            this.id = json.id;
            this.proprietaire = json.proprietaire;
            this.joueur2 = json.joueur2;
            this.enCours = json.enCours;
            this.estTermine = json.estTermine;
            this.tourProprietaire = json.tourProprietaire
            this.tourJoueur2 = json.tourJoueur2
        }
    }
}
