import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { Credits } from '../cvs-cooker/models/credits.model';
import { RelayService } from '../cvs-cooker/services/relay.service';
import { ReceipeCatalog } from './models/receipeCatalog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  credits: Credits[];
  catalogList: ReceipeCatalog[];
  catalogListSubTopic: ReceipeCatalog[];
  subTopicItem: any;
  constructor(private relayService: RelayService, private e: ElementRef) {}

  ngOnInit() {
    // Navbar Credits button
    this.relayService
    .getCredits()
    .subscribe((data: Credits[]) => this.credits = data['credits']);

    // SideNav Topics
    this.relayService
    .getReceipeCatalog()
    .subscribe((data: ReceipeCatalog[]) => this.catalogList = data['receipeCatalog']);

    // SideNav SubTopics
    this.relayService
    .getReceipeCatalog()
    .subscribe((data: ReceipeCatalog[]) => this.catalogListSubTopic = data['receipeCatalog']['subtopic']);
  }

  handleRemove(event: ReceipeCatalog, subItemID) {
    this.subTopicItem = this.catalogList[subItemID]['subtopic'];
    this.catalogList[subItemID]['subtopic'] = this.subTopicItem.filter((subItems: ReceipeCatalog) => {
      return subItems.id !== event.id;
    });
  }
  handleEdit(event) {
    console.log(event);

  }
}
