import { Component, OnInit, Input } from '@angular/core';
import { Credits } from '../../models/credits.model';

@Component({
  selector: 'credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  @Input() details: Credits[];

  constructor() { }

  ngOnInit() {
    console.log(this.details);
  }

}
