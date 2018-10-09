import { Component, OnInit,Input } from '@angular/core';
import { Mesa } from '../mesa';
@Component({
  selector: 'app-mesa-detalle',
  templateUrl: './mesa-detalle.component.html',
  styleUrls: ['./mesa-detalle.component.css']
})
export class MesaDetalleComponent implements OnInit {
  @Input() mesa: Mesa;
  constructor() { }

  ngOnInit() {
  }

}
