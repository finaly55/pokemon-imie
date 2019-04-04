import {Pokemon} from '../pokemon/pokemon';

export class Participant {
    constructor(json?:any) {
        if (json){
            this.id = json.id;
            this.pseudo = json.pseudo;
            this.team = json.team;
            this.room = json.room;
        }
    }

    id: string
    pseudo: string;
    team:Pokemon[];
    room: boolean = false;
}
