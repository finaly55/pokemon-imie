import {Pokemon} from '../pokemon/pokemon';

export class Participant {
    constructor(json?:any) {
        if (json){
            this.id = json.id;
            this.pseudo = json.pseudo;
            this.pret = json.pret;
            this.team = json.team;
            this.tour = json.tour;
        }
    }

    id: string
    pseudo: string = "";
    pret: boolean = false;
    team:Pokemon[];
    tour: boolean = false;
}
