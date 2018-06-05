import { Component, OnInit } from '@angular/core';
import {Credits} from '../cvs-cooker/models/credits.model';
import { RelayService} from '../cvs-cooker/services/relay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  credits: Credits[];

  constructor(private relayService: RelayService){}

  ngOnInit() {
    this.relayService
    .getCredits()
    .subscribe((data: Credits[]) => this.credits = data['credits']);
  }

}
