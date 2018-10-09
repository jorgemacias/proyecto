import { Component, OnInit } from '@angular/core';
import { Mesa } from '../mesa';
import { MesaService } from '../mesa.service';


@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})

export class MesaComponent implements OnInit {
  mesas: Mesa[];

  selectedMesa: Mesa;
  onSelect(mesa: Mesa): void {
    this.selectedMesa = mesa;
  }

  getMesas(): void {
    //this.mesas = this.mesaService.getMesas();
    this.mesaService.getMesas().subscribe(mesas => this.mesas = mesas);
  }
  constructor(private mesaService: MesaService) { }

  ngOnInit() {
    this.getMesas();
  }

}
