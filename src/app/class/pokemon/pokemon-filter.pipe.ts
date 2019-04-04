import {Pipe, PipeTransform} from '@angular/core';
import {Pokemon} from './pokemon';

@Pipe({
    name: 'pokemonFilter'
})

export class PokemonFilterPipe implements PipeTransform {
    transform(listePokemon: Pokemon[], searchPokemon: string): Pokemon[] {
        if (!listePokemon || !searchPokemon) {
            return listePokemon;
        }

        return listePokemon.filter(pokemon =>
            pokemon.nom.toLowerCase().indexOf(searchPokemon.toLowerCase()) !== -1);
    }
}
