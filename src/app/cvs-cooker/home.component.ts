import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RelayService } from '../cvs-cooker/services/relay.service';
import { Credits } from '../cvs-cooker/models/credits.model';
import { ReceipeCatalog } from './models/receipeCatalog.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddCategoryComponent } from './components/add-category/add-category.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  @ViewChild(AddCategoryComponent) cancelAddDialog: AddCategoryComponent;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  form = new FormGroup({
    item: new FormGroup({
      title: new FormControl(null),
      active: new FormControl(true),
      static: new FormControl(null),
      subtopic: new FormGroup({
          title: new FormControl(null),
          active: new FormControl(true),
          static: new FormControl(false),
            children: new FormGroup({
              title: new FormControl(null),
              description: new FormControl(null),
            })
        })
    }),
    catalog: new FormArray([])
  });
  credits: Credits[];
  catalogList: ReceipeCatalog[];
  catalogListSubTopic: ReceipeCatalog[];
  show = false;
  editing = false;
  selectedEdit: any;
  topicEditToggle = false;
  stepOne: any;
  // activeStepOne: any;
  selectedItems: any; // Select category item for Edit Dialog
  showStepTwoDialog: boolean = false;
  showAddDialog: boolean;
  showEditDialog: boolean;
  constructor( private relayService: RelayService ) {}

  ngOnInit() {

    // Navbar Get Credits button
    this.relayService.getCredits().subscribe((data: Credits[]) => this.credits = data);

    // SideNav Get Topics
    this.relayService.getReceipeCatalog().subscribe((data: ReceipeCatalog[]) => {
      this.catalogList = data;
    });
  }
    // Activate Add Category Dialog
    addDialog(event) {
      console.log('Activation for Step 1 Add Category passed: ', event);
      if (this.editing === true) {
        this.editing = false;
        this.showAddDialog = event;
      } else  {
        this.showAddDialog = event;
      }
      // this.showAddDialog = event;
      // this.stepOne = event.item;
      // console.log('adddialog2', this.stepOne);
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
    // Activate Edit Category Dialog
    activeEdit(event: ReceipeCatalog) {
      if (event) {
        if (this.showAddDialog === true) {
          this.showAddDialog = false;
          this.editing = !this.editing;
        } else {
          this.editing = !this.editing;
        }
        this.selectedItems = event;
        console.log('Activation for Step 1 Edit Category passed: ', event);
        // this.activeStepOne = event;
        // console.log('Step One: Contain step 1 data for step 2', this.activeStepOne);
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
    // Remove item from Edit Dialog
    handleRemove(event: ReceipeCatalog) {
      console.log('Handle remove this item from Edit Dialog', event);
        this.show = false;
        this.relayService.removeItem(event);
      // this.catalogList = this.catalogList.filter((catalogList: ReceipeCatalog) => {
      //   console.log(event.id);
      //  return catalogList.id !== event.id;
      // });
    }
    // Cancel Add Dialog
    handleAddCancel(e) {
      console.log('Handle Cancel Edit Dialog: ', e);
      this.selectedEdit = '';
      // this.topicEditToggle = false;
      if (this.editing === true) {
        this.editing = false;
        this.showAddDialog = !this.showAddDialog;
      } else  {
        this.showAddDialog = !this.showAddDialog;
      }
      // this.showAddDialog = !this.showAddDialog;
      // if (this.cancelAddDialog) {
      //   this.cancelAddDialog.cancel.subscribe((data: any) => {
      //     this.cancelAddDialog.editing = e;
      //   });
      // }
    }
    // Cancel Edit Dialog
    handleEditCancel(e) {
      console.log('Handle Cancel Edit Dialog: ', e);
      this.selectedEdit = '';
      if (this.showAddDialog === true) {
        this.showAddDialog = false;
        this.editing = !this.editing;
      } else {
        this.editing = !this.editing;
      }
    }
    onCancel(e) {
      console.log('myyyye', e);
      // this.topicEditToggle = e;
      this.editing = e;

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
