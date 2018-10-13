import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-form-bowl',
  templateUrl: './form-bowl.component.html',
  styleUrls: ['./form-bowl.component.css']
})
export class FormBowlComponent implements OnInit {

  form: FormGroup;
  data: any[];
  solutionId = this.afs.createId();
  subtopicId = this.afs.createId();
  childrenId = this.afs.createId();
  codeId = this.afs.createId();
  mainId = this.afs.createId();
    // Add Dialog
    stepOne: any; // Pass data to Step 2 from Add Dialog (Step 1)
    showAddDialog: boolean = true; // Toggle Add Dialog (Step 1)
  // Edit Dialog
    editing = false; // Toggle Edit Dialog (Step 1)
    selectedItems: any; // Store selected category item for Edit Dialog (Step 1)
  // Code Dialog
    showStepTwoDialog = false; // Toggle Code Dialog (Step 1)

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, public afs: AngularFirestore) { }

  ngOnInit() {
    // this.loadData();
    this.form = this.fb.group({
      id: this.mainId,
      title: '',
      active: true,
      static: false,
      subtopic: this.fb.array([this.getSubtopic()])
  });
  this.cdr.detectChanges();
  }

  // getItems() {
  //   return this.data.map(item =>
  //     this.fb.group({
  //       id: item.id,
  //       title: item.title,
  //       active: item.active,
  //       static: item.static,
  //       subtopic: this.fb.array(this.getSubtopic(item.subtopic))
  //     })
  //   );
  // }
  // getSubtopic(subtopic: any[]) {
  //   return subtopic.map((subtopics) =>  { return this.fb.group({
  //     id: subtopics.id,
  //     title: subtopics.title,
  //     active: subtopics.active,
  //     static: subtopics.static,
  //     children: this.fb.array(this.getChildren(subtopics.children))
  //   });
  // });
  // }
  // Reactive Forms
  getSubtopic() {
    return this.fb.group({
      id: this.subtopicId,
      title: '',
      active: true,
      static: false,
      children: this.fb.array([this.getChildrens()])
    });
  }
  getChildrens() {
    return this.fb.group({
      id: this.childrenId,
      title: '',
      description: '',
      active: true,
      static: false,
      solution: this.fb.array([this.getSolution()])
    });
  }
  // getSubtopics() {
  //   return this.data.map(subtopic => this.fb.group({
  //     id: subtopic.id,
  //     title: subtopic.title,
  //     active: subtopic.active,
  //     static: subtopic.static,
  //     children: this.fb.array(this.getChildren(subtopic.children))
  //   }));
  // }
  // getChildren(childrens: any[]) {
  //   return childrens.map(children => this.fb.group({
  //     id: children.id,
  //     title: children.title,
  //     description: children.description,
  //     active: children.active,
  //     static: children.static,
  //     solution: this.fb.array(this.getSolution(children.solution))
  //   }));
  // }
  getSolution() {
    return this.fb.group({
        id: this.solutionId,
        title: '',
        description: '',
        active: true,
        static: false,
        code: this.fb.array([this.getCode()])
      });
  }
  getCode() {
    return this.fb.group({
        id: this.codeId,
        language: '',
        script: ''
      });
  }

  // loadData() {
  //   this.data = [{
  //         'id': '',
  //         'title': 'ahhh',
  //         'active': true,
  //         'static': false,
  //         'subtopic': [{
  //           'id': '',
  //           'title': 'uhhh',
  //           'active': true,
  //           'static': false,
  //           'children': [{
  //             'id': '',
  //             'title': 'ohhh',
  //             'active': true,
  //             'static': false,
  //             'description': '',
  //             'solution': [{
  //               'id': '',
  //               'title': 'ehhh',
  //               'active': true,
  //               'static': false,
  //               'description': '',
  //               'code': [{
  //                 'id': '',
  //                 'language': 'ahhh',
  //                 'script': ''
  //               }],
  //             }]
  //           }]
  //       }]
  //   }];
  //   }

  // CRUD
  handleAdd(event) {
    this.form.reset();
    console.log('Step 1: Contain Add Category Form Data and Pass to Step 2', event);
    this.showAddDialog = !this.showAddDialog;
    this.showStepTwoDialog = !this.showStepTwoDialog;
    const addedFormData = event;
    console.log('Passed event values', addedFormData);
    console.log('Passed form values', this.form.value);
    console.log('Create Formgroup from returned data in Add Category', addedFormData);
    // addedFormData.push(this.createCatalog(this.form.value));
    console.log('Catalog Home', this.form.get('catalog'));
    // this.stepOne = addedFormData;

  }
}
