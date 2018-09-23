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
      static: new FormControl(false),
      subtopic: new FormGroup({
          title: new FormControl('11'),
          active: new FormControl(true),
          static: new FormControl(false),
          children: new FormGroup({
            title: new FormControl(null),
            description: new FormControl('1'),
            active: new FormControl(true),
            static: new FormControl(false),
            solution: new FormGroup({
              title: new FormControl(null),
              description: new FormControl('2'),
              active: new FormControl(true),
              static: new FormControl(false),
              code: new FormGroup({
                language: new FormControl([
                  'html',
                  'css',
                  'js',
                  'json',
                  'angular 2+',
                  'angularJS 1.x',
                  'other']),
                script: new FormControl(null)
              })
            })
          })
        })
    }),
    catalog: new FormArray([])
  });
  // catalogListSubTopic: ReceipeCatalog[];
  // show = false;
  // selectedEdit: any;
  // topicEditToggle = false;
  // activeStepOne: any;
  // showEditDialog: boolean;

  // Storage
    credits: Credits[]; // Store Credits data from service
    catalogList: ReceipeCatalog[]; // Store Category Catalog data from service
  // Add Dialog
    stepOne: any; // Pass data to Step 2 from Add Dialog (Step 1)
    showAddDialog: boolean; // Toggle Add Dialog (Step 1)
  // Edit Dialog
    editing = false; // Toggle Edit Dialog (Step 1)
    selectedItems: any; // Store selected category item for Edit Dialog (Step 1)
  // Code Dialog
    showStepTwoDialog: boolean = false; // Toggle Code Dialog (Step 1)

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
        this.showAddDialog = null;
      if (this.editing === true) {
        this.editing = false;
        this.showAddDialog = event;
      } else  {
        this.showAddDialog = event;
      }
      // this.showAddDialog = event;
      this.stepOne = event;
      console.log('adddialog2', this.stepOne);
      // console.log('adddialog', this.stepOne);
      // setTimeout(() => {
      //   console.log('adddialog', this.stepOne);
      // }, 2000);
      // console.log('adddialog', JSON.parse(JSON.stringify(event.currentTarget)));
    }
    // handleAdd(event: ReceipeCatalog) {
    //   console.log('myvent', event);
    //   // this.relayService.addCategory(event);
    // }
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
        // this.stepOne = event;
        console.log('Step One: Contain step 1 data for step 2', this.selectedItems);
      }
      // this.relayService.updateReceipCatalog(event);
      // this.selectedEdit = '';
    }
    // handleEdit(event: ReceipeCatalog) {
    //   console.log('myvent2', event);
    //   this.relayService.updateReceipCatalog(event);
    //   this.selectedEdit = '';
    //   // this.catalogList[i].title = event;
    //   // this.relayService
    //   // .updateReceipCatalog(event)
    //   // .subscribe((data: ReceipeCatalog) => {
    //   //   this.catalogList = this.catalogList.map(((catalogList: ReceipeCatalog) => {
    //   //     if (catalogList.id === event.id) {
    //   //       // console.log('Value handle edit', catalogList);
    //   //       catalogList = Object.assign({}, catalogList, event);
    //   //     }
    //   //     console.log('Value handle edit', catalogList);
    //   //     return catalogList;
    //   //   }));
    //   // });
    // }
    // Add catelog into Form array
    createCatalog(item) {
      return new FormGroup({
        title: new FormControl(item.title),
        active: new FormControl(item.active),
        static: new FormControl(item.static),
        subtopic: new FormGroup({
            title: new FormControl(item.subtopic.title),
            active: new FormControl(item.subtopic.active),
            static: new FormControl(item.subtopic.static),
              children: new FormGroup({
                title: new FormControl(item.subtopic.children.title),
                description: new FormControl(item.subtopic.children.description),
                active: new FormControl(item.subtopic.children.active),
                static: new FormControl(item.subtopic.children.static),
                solution: new FormGroup({
                  title: new FormControl(item.subtopic.children.title),
                  description: new FormControl(item.subtopic.children.solution.description),
                  code: new FormGroup({
                    language: new FormControl(item.subtopic.children.solution.code.language),
                    script: new FormControl(item.subtopic.children.solution.code.script)
                  }),
                  active: new FormControl(item.subtopic.children.solution.active),
                  static: new FormControl(item.subtopic.children.solution.static),
                }),

              })
          })
      });
    }
    // Handle Add Dialog for Step 2
    handleAdd(event) {
      console.log('Step 1: Contain Add Category Form Data and Pass to Step 2', event);
      this.showAddDialog = !this.showAddDialog;
      this.showStepTwoDialog = !this.showStepTwoDialog;
      const addedFormData = this.form.get('catalog') as FormArray;
      addedFormData.push(this.createCatalog(event));
      // this.stepOne = addedFormData;
      console.log('Create Formgroup from returned data in Add Category', addedFormData);
    }
    // Remove item from Edit Dialog
    handleRemove(event: ReceipeCatalog) {
      console.log('Handle remove this item from Edit Dialog', event);
      this.editing = false;
      // NEEDS ITEMS
      // this.relayService.removeItem(event);
        // this.show = false;
      // this.catalogList = this.catalogList.filter((catalogList: ReceipeCatalog) => {
      //   console.log(event.id);
      //  return catalogList.id !== event.id;
      // });
    }
    // Cancel Add Dialog
    handleAddCancel() {
      // this.selectedEdit = '';
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
      // this.selectedEdit = '';
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
    onSubmit(event: any) {
      event.preventDefault();

      console.log('Step 1: Topic/Subtopic Injection', event);
      console.log('Step 1: Form Submit Values', this.form.value);
      // console.log(JSON.parse(JSON.stringify(test.currentTarget, null, 2)));
      // this.adder.emit(event);
      console.log('Event log', event);
      // this.adder.emit(this.form.value);
      this.addDialog(this.form.value);
      // console.log('items', event.currentTarget);
      // if (this.item.title !== '') {
      //   // if (this.editableCategory) {
      //   //   this.item.static = this.editableCategory;
      //   // }
      //   // if (this.editableSubCategory) {
      //   //   this.item.subtopic[0].static = this.editableSubCategory;
      //   // }
      //   this.adder.emit(event);
      // //   console.log('eveve', this.item);
      // }
      // this.editableSubCategory = false;
      // this.editableCategory = false;
      // this.item.title = '';
      // this.item.subtopic[0].title = '';
      // this.formReset();
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
