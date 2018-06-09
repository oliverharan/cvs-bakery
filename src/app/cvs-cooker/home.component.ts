import { Component, OnInit } from '@angular/core';
import {Credits} from '../cvs-cooker/models/credits.model';
import { RelayService} from '../cvs-cooker/services/relay.service';
import { ReceipeCatalog } from './models/receipeCatalog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  credits: Credits[];
  catalogList: ReceipeCatalog[];

  constructor(private relayService: RelayService){}

  ngOnInit() {
    this.relayService
    .getCredits()
    .subscribe((data: Credits[]) => this.credits = data['credits']);
    this.relayService
    .getReceipeCatalog()
    .subscribe((data: ReceipeCatalog[]) => this.catalogList = data['receipeCatalog'])
  }

}
