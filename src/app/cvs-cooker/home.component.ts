import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { RelayService } from '../cvs-cooker/services/relay.service';
import { Credits } from '../cvs-cooker/models/credits.model';
import { ReceipeCatalog } from './models/receipeCatalog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  @Output() edit: EventEmitter<any> = new EventEmitter();

  credits: Credits[];
  catalogList: ReceipeCatalog[];
  catalogListSubTopic: ReceipeCatalog[];
  show = false;
  editing = false;
  selectedEdit: any;
  topicEditToggle = false;
  stepOne: any;
  activeStepOne: any;
  selectedItems: any;
  constructor( private relayService: RelayService ) {}

  ngOnInit() {

    // Navbar Get Credits button
    this.relayService.getCredits().subscribe((data: Credits[]) => this.credits = data);

    // SideNav Get Topics
    this.relayService.getReceipeCatalog().subscribe((data: ReceipeCatalog[]) => {
      this.catalogList = data;
    });
  }
    // Add
    addDialog(event) {
      console.log('adddialog', 'test');
      this.stepOne = event;
      // console.log('adddialog', this.stepOne);
      // setTimeout(() => {
      //   console.log('adddialog', this.stepOne);
      // }, 2000);

      // console.log('adddialog', JSON.parse(JSON.stringify(event.currentTarget)));
    }
    handleAdd(event: ReceipeCatalog) {
      console.log('myvent', event);
      // this.relayService.addCategory(event);
    }
    // Edit
    activeEdit(event: ReceipeCatalog) {
      if (event) {
        this.activeStepOne = event;
        this.editing = !this.editing;
        this.selectedItems = event;
        console.log('Step One: Contain step 1 data for step 2', this.activeStepOne);
      }
      // this.relayService.updateReceipCatalog(event);
      this.selectedEdit = '';
    }
    handleEdit(event: ReceipeCatalog) {
      console.log('myvent2', event);
      this.relayService.updateReceipCatalog(event);
      this.selectedEdit = '';
      // this.catalogList[i].title = event;
      // this.relayService
      // .updateReceipCatalog(event)
      // .subscribe((data: ReceipeCatalog) => {
      //   this.catalogList = this.catalogList.map(((catalogList: ReceipeCatalog) => {
      //     if (catalogList.id === event.id) {
      //       // console.log('Value handle edit', catalogList);
      //       catalogList = Object.assign({}, catalogList, event);
      //     }
      //     console.log('Value handle edit', catalogList);
      //     return catalogList;
      //   }));
      // });
    }
    // Remove
    handleRemove(event: ReceipeCatalog) {
      console.log('remove', event);
        this.show = false;
        this.relayService.removeItem(event);
      // this.catalogList = this.catalogList.filter((catalogList: ReceipeCatalog) => {
      //   console.log(event.id);
      //  return catalogList.id !== event.id;
      // });
    }
    handleCancel() {
      console.log('woooo');
      this.selectedEdit = '';
      this.topicEditToggle = false;
    }
    onCancel(e) {
      console.log('myyyye', e);
    }
    onEdit(e) {
      console.log('homeedit', e);
    }

}



  // animations: [
  //   trigger('slideInOut', [
  //     state('visible',   style({
  //       transform: 'rotateY(180deg) rotateZ(90deg)',
  //     })),
  //   ])
  // ]

    // JSON
    // this.relayService
    // .getReceipeCatalog()
    // .subscribe((data: ReceipeCatalog[]) => this.catalogList = data);

    // SideNav SubTopics
    // this.relayService
    // .getReceipeCatalog()
    // .subscribe((data: ReceipeCatalog[]) => this.catalogListSubTopic = data);


    // JSON
    // this.relayService
    // .getCredits()
    // .subscribe((data: Credits[]) => this.credits = data);



  // subtopicClose() {
  //   this.closeSubtopic = false;
  // }

  // onEdit(event) {
  //   this.closeSubtopic = false;
  //   this.topicEditToggle = !this.topicEditToggle;
  //   // this.editing = true;
  //   // let y = this.el.nativeElement.querySelector('#editor');
  //   // y.className = 'show';
  //   // y.className.removeClass = 'hidden';
  //   // if (this.edit) {
  //   //   this.edit.emit(val);
  //   //   console.log(val);
  //   // }
  //   // console.log('val',y);
  //   // console.log('test', event, i);
  //   // this.handleEdit(val);
  // }


  // openSub(event) {
  //   this.visible = !this.visible;
  //   // this.visible = true;
  //   console.log('Select topic id', event);
  //   this.expandTopic = event;
  //   console.log(this.expandTopic);
  //   console.log(this.visible);
  //   // this.selectTopicIndex = i;
  // }
