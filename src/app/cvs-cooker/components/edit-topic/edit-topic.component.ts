import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {ReceipeCatalog} from '../../models/receipeCatalog.model';
import { FormGroup, FormControl, FormArray} from '@angular/forms';
@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
  @Input() items: ReceipeCatalog;
  @Input() subtopics: ReceipeCatalog;
  @Input() parent: FormGroup;
  @Input() editing: boolean;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  tabTitle: string = 'Edit Tab'; // Default title for Tab
  editedForm: any;
  // cancelling: boolean = false;
  // editing = false;
  // showList = null;
  // expandTopic: any = null;
  // editableCategory: boolean;

  // form = new FormGroup({
  //   item: new FormGroup({
  //     title: new FormControl(null),
  //     active: new FormControl(true),
  //     static: new FormControl(false),
  //     subtopic: new FormGroup({
  //         title: new FormControl(null),
  //         active: new FormControl(true),
  //         static: new FormControl(false),
  //           children: new FormGroup({
  //             title: new FormControl(null),
  //             description: new FormControl(null),
  //           })
  //       })
  //   }),
  //   catalog: new FormArray([])
  // });
  constructor() { }

  ngOnInit() {
    this.parent.get('item.title').setValue(this.items.title);
    this.parent.get('item.static').setValue(this.items.static);
  }
  onAdd(){
    console.log('Formgroup', this.parent.get('item').value);
  }
  onEdit(event, item) {
    // this.cancel.emit();
    this.editedForm = this.parent.get('item').value;
    console.log('Formgroup', this.editedForm);
    if (this.parent.valid) {
      this.edit.emit(this.editedForm);
    }

    // this.cancel.emit();

    // if (this.edit) {
    //   // this.edit.emit(this.items);
    //   console.log('edit',this.items);
    // }
    // this.editing = !this.editing;
  }
  onNameChange(value: string) {
    this.items.title = value;
  }
  // onRemove(event) {
  //   // console.log('child item remove', this.items);
  //   this.remove.emit(this.items);
  //   // this.remove.emit(this.subtopics);
  // }
  onCancel() {
    this.editing = false;
    // this.formReset();
    this.cancel.emit(this.editing);
  }
  formReset() {
    this.items = {
      title: '',
      active: true,
      static: false,
      subtopic: [{
        title: '',
        active: null,
        static: null,
        children: [{
          title: '',
          description: ''
        }]
      }]
    };
  }
}
