import { Injectable } from '@angular/core';
import {Partie} from '../../class/partie/partie';

@Injectable({
  providedIn: 'root'
})
export class PartieService {

  partie: Partie
  constructor() { }
}
