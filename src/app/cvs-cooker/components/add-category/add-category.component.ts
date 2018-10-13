import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RelayService } from '../../services/relay.service';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  // form = this.fb.group({
  //   item: this.fb.group({
  //     title: this.fb.control(null),
  //     active: this.fb.control(true),
  //     static: this.fb.control(null),
  //     subtopic: this.fb.array([{
  //         title: this.fb.control(null),
  //         active: this.fb.control(true),
  //         static: this.fb.control(false),
  //           children: this.fb.array([{
  //             title: this.fb.control(null),
  //             description: this.fb.control(null),
  //           }])
  //       }])
  //   }),
  //   catalog: new FormArray([])
  // });
  // item: ReceipeCatalog = {
  //   items: [{
  //     id: '',
  //     title: '',
  //     active: true,
  //     static: false,
  //     subtopic: [{
  //       id: '',
  //       title: '',
  //       active: true,
  //       static: false,
  //       children: [{
  //         id: '',
  //         title: '',
  //         active: true,
  //         static: false,
  //         description: '',
  //         solution: [{
  //           id: '',
  //           title: '',
  //           active: true,
  //           static: false,
  //           description: '',
  //           code: [{
  //             id: '',
  //             language: '',
  //             script: ''
  //           }],
  //         }]
  //       }]
  //     }]
  //   }]
  // };

  // @Input() items: ReceipeCatalog;
  @Input() editing: boolean;
  @Input() parent: FormGroup;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() active: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @ViewChild('topicName') topicTitle: any;
  @ViewChild('topicNameEditable') topicNameEditable: any;
  @ViewChild('subTopicName') subTopicName: any;
  @ViewChild('subTopicNameEditable') subTopicNameEditable: any;

  tabTitle = 'Add Tab';
  addCategoryForm: any; // Form data for output to side-nav
  initTitle: string;
  editableCategory = false;
  editableSubCategory = false;

  get subtopics() {
    return (this.parent.get('subtopic') as FormArray).controls;
  }
  // getChildrenFor(index) {
  //   return (<FormArray>(<FormArray>this.parent.get('subtopic')).controls[index].get('children')).controls;
  // }
  // get childrens() {
  //   return (this.parent.get('children') as FormArray).controls;
  // }
  constructor( public fb: FormBuilder, private relayService: RelayService) { }

  ngOnInit() {
    console.log('items', this.parent.value);

    console.log('items', (this.parent.get('subtopic') as FormArray).controls);
    // this.initTitle = this.items.title;

  }
  onEdit() {
    this.cancel.emit();
    // if (this.edit) {
    //   this.edit.emit(this.items);
    // }
  }
  // onNameChange(value: string) {
  //   this.items.items[0].title = value;
  // }
  onRemove() {
    // this.remove.emit(this.items);
    // this.remove.emit(this.subtopics);
  }
  onCancel() {
    // console.log('ngmodel', this.item.items[0].title);
    // this.formReset();
    this.editing = false;
    // this.item.title = '';
    // this.item.subtopic[0].title = '';
    // this.item.static = false;
    // this.item.subtopic[0].static = false;
    // console.log('eveve2', this.item);
    // console.log('trigger cancel', this.initTitle, this.items.title);
    // this.items.title = this.initTitle;
    this.cancel.emit(this.editing);

  }
  // formReset() {
  //   this.topicTitle.nativeElement.value = '';
  //   this.topicNameEditable.nativeElement.checked = false;
  //   this.subTopicName.nativeElement.value = '';
  //   this.subTopicNameEditable.nativeElement.checked = false;
  //   this.item = {
  //     title: '',
  //     active: true,
  //     static: false,
  //     subtopic: [{
  //       title: '',
  //       active: null,
  //       static: null,
  //       children: [{
  //         title: '',
  //         description: ''
  //       }]
  //     }]
  //   };
  // }
  // Form submit event
  onSubmit(event: any) {
    event.preventDefault();
    console.log('Step 1: Topic/Subtopic Submit Event', event);
    // console.log('Step 1: Topic/Subtopic Submit Form data',
    // (<FormArray>this.parent
    //     .get('item').get('subtopic')));
    console.log('Parent Form Add', this.parent.value);
    this.addCategoryForm = this.parent.value;
    this.active.emit(this.addCategoryForm);

    // console.log('Step 1: Form Submit Values', this.form.value);
    // console.log(JSON.parse(JSON.stringify(test.currentTarget, null, 2)));
    // this.adder.emit(event);
    console.log('Event log', event);
    // this.adder.emit(this.form.value);

    // console.log('items', event.currentTarget);

    // this.editableSubCategory = false;
    // this.editableCategory = false;
    // this.item.title = '';
    // this.item.subtopic[0].title = '';
    // this.formReset();
  }
}
