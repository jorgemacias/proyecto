import { Injectable } from '@angular/core';
import { Mesa } from './mesa';
import { Mesas } from './mesas';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private messageService:MessageService) { }

  getMesas(): Observable<Mesa[]> {
    this.messageService.add('Lista de mesas actualizada');
    return of(Mesas);
  }
}
