import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { Credits } from '../cvs-cooker/models/credits.model';
import { RelayService } from '../cvs-cooker/services/relay.service';
import { ReceipeCatalog } from './models/receipeCatalog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInOut', [
      state('visible',   style({
        transform: 'rotateY(180deg) rotateZ(90deg)',
      })),
    ])
  ]
})

export class HomeComponent implements OnInit {
  @Output() edit: EventEmitter<any> = new EventEmitter();
  credits: Credits[];
  catalogList: ReceipeCatalog[];
  catalogListSubTopic: ReceipeCatalog[];
  items: any;
  editing: boolean = false;
  show: boolean = false;
  selectedEdit: any;
  expandTopic: any;
  visible = false;
  constructor(private relayService: RelayService, private el: ElementRef){}

  toggleSubTopics() {
    this.visible = !this.visible;
  }
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
  onEdit(event, i) {
    // this.editing = true;
    // let y = this.el.nativeElement.querySelector('#editor');
    // y.className = 'show';
    // y.className.removeClass = 'hidden';
    // if (this.edit) {
    //   this.edit.emit(val);
    //   console.log(val);
    // }
    // console.log('val',y);
    console.log(event, i);
    // this.handleEdit(val);
  }
  handleEdit(val, i) {
    this.selectedEdit = '';
    console.log('Value handle edit', val, i);

    this.catalogList[i].title = val;
    // this.items = val;
    // this.show = false;
  }
  handleRemove(event, i) {
    // console.log(event, i);
        this.show = false;
    this.catalogList = this.catalogList.filter((catalogList: ReceipeCatalog) => {
      console.log(event.id);
     return catalogList.id !== event.id;
    });
  }
  handleCancel() {
    this.selectedEdit = '';
  }
}
