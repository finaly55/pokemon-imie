import { Attaques } from '../attaques/attaques';

export class Pokemon {
    id : number
    nom: string
    image: string
    pv?: number
    imageBack? : string
    attaques? : Attaques[]
}
