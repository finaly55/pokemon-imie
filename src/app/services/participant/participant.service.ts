import { Injectable } from '@angular/core';
import {Participant} from '../../class/participant/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  moi: Participant
  constructor() { }
}
