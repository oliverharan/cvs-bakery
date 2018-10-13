import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RelayService } from '../cvs-cooker/services/relay.service';
import { Credits } from '../cvs-cooker/models/credits.model';
import { ReceipeCatalog } from './models/receipeCatalog.model';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  @ViewChild(AddCategoryComponent) cancelAddDialog: AddCategoryComponent;
  solutionId = this.afs.createId();
  subtopicId = this.afs.createId();
  childrenId = this.afs.createId();
  codeId = this.afs.createId();
  id = this.afs.createId();
  data: any[];
  form: FormGroup;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  get items() {
    return (<FormArray>this.form.get('items')).controls;
  }
  //       [{
  //         id: this.fb.control(this.subtopicId),
  //         title: this.fb.control('11'),
  //         active: this.fb.control(true),
  //         static: this.fb.control(false),
  //         children: this.fb.array([{
  //           id: this.fb.control(this.childrenId),
  //           title: this.fb.control(null),
  //           description: this.fb.control('1'),
  //           active: this.fb.control(true),
  //           static: this.fb.control(false),
  //           solution: this.fb.array([{
  //             id: this.fb.control(this.childrenId),
  //           title: this.fb.control(null),
  //           description: this.fb.control('1'),
  //           active: this.fb.control(true),
  //           static: this.fb.control(false),
  //           code: this.fb.array([{
  //               id: this.fb.control(this.codeId),
  //               language: this.fb.control([
  //                 'html',
  //                 'css',
  //                 'js',
  //                 'json',
  //                 'angular 2+',
  //                 'angularJS 1.x',
  //                 'other'
  //               ]),
  //               script: this.fb.control(null)
  //             }])
  //           }])
  //         }])
  //     }])
  //   }),
  //   catalog: new FormArray([])
  // });
  // form = this.fb.group({
  //   item: this.fb.group({
  //     id: this.fb.control(this.id),
  //     title: this.fb.control(null),
  //     active: this.fb.control(true),
  //     static: this.fb.control(false),
  //     subtopic: this.fb.array([{
  //         id: this.fb.control(this.subtopicId),
  //         title: this.fb.control('11'),
  //         active: this.fb.control(true),
  //         static: this.fb.control(false),
  //         children: this.fb.array([{
  //           id: this.fb.control(this.childrenId),
  //           title: this.fb.control(null),
  //           description: this.fb.control('1'),
  //           active: this.fb.control(true),
  //           static: this.fb.control(false),
  //           solution: this.fb.array([{
  //             id: this.fb.control(this.solutionId),
  //             title: this.fb.control(null),
  //             description: this.fb.control('2'),
  //             active: this.fb.control(true),
  //             static: this.fb.control(false),
  //             code: this.fb.array([{
  //               id: this.fb.control(this.codeId),
  //               language: this.fb.control([
  //                 'html',
  //                 'css',
  //                 'js',
  //                 'json',
  //                 'angular 2+',
  //                 'angularJS 1.x',
  //                 'other'
  //               ]),
  //               script: this.fb.control(null)
  //             }])
  //           }])
  //         }])
  //     }])
  //   }),
  //   catalog: new FormArray([])
  // });

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
    showStepTwoDialog = false; // Toggle Code Dialog (Step 1)

  constructor(public fb: FormBuilder, private relayService: RelayService, public afs: AngularFirestore) {}

  ngOnInit() {
    // this.loadData();

    // this.form = this.fb.group({
    //   items: this.fb.array([{
    //     id: this.fb.control(this.id),
    //     title: this.fb.control(null),
    //     active: this.fb.control(true),
    //     static: this.fb.control(false),
    //     subtopic: this.fb.array(this.getSubtopics()),
    //     catalog: new FormArray([])
    //   }])
    // });
    // this.form = this.fb.group({
    //   items: this.fb.array(this.getItems())
    // });
    // const test = (<FormArray>this.form.get('items')).controls;
    // console.log('INIT FORM', this.form.value);

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
    handleSubmit(event: ReceipeCatalog) {
      console.log('Step 2: Handle code before submit', event);
      this.relayService.addCategory(event);
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
      console.log('item group', item);
      return this.fb.group({
        items: this.fb.array([{
          id: this.fb.control (item.id),
          title: this.fb.control (item.title),
          active: this.fb.control (item.active),
          static: this.fb.control (item.static),
          subtopic: this.fb.array([{
            id: this.fb.control (item.subtopic[0].id),
            title: this.fb.control (item.subtopic[0].title),
            active: this.fb.control (item.subtopic[0].active),
            static: this.fb.control (item.subtopic[0].static),
                children: this.fb.array ([{
                  id: this.fb.control (item.subtopic[0].children.id),
                  title: this.fb.control (item.subtopic[0].children[0].title),
                  description: this.fb.control (item.subtopic[0].children[0].description),
                  active: this.fb.control (item.subtopic[0].children[0].active),
                  static: this.fb.control (item.subtopic[0].children[0].static),
                  solution: this.fb.array ([{
                    id: this.fb.control (item.subtopic[0].children[0].solution[0].id),
                    title: this.fb.control (item.subtopic[0].children[0].solution[0].title),
                    description: this.fb.control (item.subtopic[0].children[0].solution[0].description),
                    code: this.fb.array ([{
                      id: this.fb.control (item.subtopic[0].children[0].solution[0].code[0].id),
                      language: this.fb.control (item.subtopic[0].children[0].solution[0].code[0].language),
                      script: this.fb.control (item.subtopic[0].children[0].solution[0].code[0].script)
                    }]),
                    active: this.fb.control (item.subtopic[0].children[0].solution.active),
                    static: this.fb.control (item.subtopic[0].children[0].solution.static),
                  }])
                }])
            }])
          }])
      });
    }
    // Handle Add Dialog for Step 2
    handleAdd(event) {

      console.log('Step 1: Contain Add Category Form Data and Pass to Step 2', event);
      this.showAddDialog = !this.showAddDialog;
      this.showStepTwoDialog = !this.showStepTwoDialog;
      const addedFormData = (<FormArray>this.form.get('catalog')).controls;
      console.log('Create Formgroup from returned data in Add Category', addedFormData);
      addedFormData.push(this.createCatalog(this.form.value));
      console.log('Catalog Home', this.form.get('catalog'));

      // this.stepOne = addedFormData;

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


      getItems() {
        return this.data.map(item =>
          this.fb.group({
            id: item.id,
            title: item.title,
            active: item.active,
            static: item.static,
            subtopic: this.fb.array(this.getSubtopic(item.subtopic))
          })
        );
      }
      getSubtopic(subtopic: any[]) {
        return subtopic.map((subtopics) =>  { return this.fb.group({
          id: subtopics.id,
          title: subtopics.title,
          active: subtopics.active,
          static: subtopics.static,
          children: this.fb.array(this.getChildren(subtopics.children))
        });
      });
      }
      getSubtopics() {
        return this.data.map(subtopic => this.fb.group({
          id: subtopic.id,
          title: subtopic.title,
          active: subtopic.active,
          static: subtopic.static,
          children: this.fb.array(this.getChildren(subtopic.children))
        }));
      }
      getChildren(children: any[]) {
        return children.map(c => this.fb.group({
          id: c.id,
          title: c.title,
          description: c.description,
          active: c.active,
          static: c.static,
          solution: this.fb.array(this.getSolution(c.solution))
        }));
      }
      getSolution(solution: any[]) {
        return solution.map((s) => {
          return this.fb.group({
            id: s.id,
            title: s.title,
            description: s.description,
            active: s.active,
            static: s.static,
            code: this.fb.array(this.getCode(s.code))
          });
        });
      }
      getCode(code: any[]) {
        return code.map((c) => {
          return this.fb.group({
            id: c.id,
            language: c.language,
            script: c.script
          });
        });
      }

      loadData() {
        this.data = [{
            'items': [{
              'id': '',
              'title': 'uhhh',
              'active': true,
              'static': false,
              'subtopic': [{
                'id': '',
                'title': 'uhhh',
                'active': true,
                'static': false,
                'children': [{
                  'id': '',
                  'title': 'ohhh',
                  'active': true,
                  'static': false,
                  'description': '',
                  'solution': [{
                    'id': '',
                    'title': 'ehhh',
                    'active': true,
                    'static': false,
                    'description': '',
                    'code': [{
                      'id': '',
                      'language': 'ahhh',
                      'script': ''
                    }],
                  }]
                }]
            }]
          }]
        }];
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

